"use strict";

module.exports = function (app) {
    app.directive("flickrPickr", ["$http", "$window", "$interval", "$cookies", flickrPickrService]);
    app.directive("whenScrolled", function () {
        return {
    
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var raw = elem[0];
                    elem.bind("scroll", function () {
                    if (raw.scrollTop + raw.offsetHeight + 5 >= raw.scrollHeight) {
                        scope.loading = true;
                        scope.$apply(attrs.whenScrolled);
                    }
                });

            }
        }
    });
};

function flickrPickrService($http, $window, $interval, $cookies) {

    function controller(scope, element, attributes) {
        var imageField = '';
        scope.FLICKR_STATUS = ['Loading', 'LoggedIn', 'LoggedOut'];
        scope.isFlickr = true;
        scope.flickrState = scope.FLICKR_STATUS[0];
        scope.flickrImages = [];
        scope.selectedId = "";
        scope.page = 1;
        scope.loadingScroll = false;
        scope.loadedAll = false;
        scope.closePickr = function () {
            scope.isFpOpen = false;
        };
        scope.authenticate = function () {
            authenticateWindow(scope, $window, $interval, $http);
        }
        scope.showImages = function (fbPage) {
            
            if (!scope.loadedAll) {
                $http({ method: 'GET', url: 'https://flickr.fourcorners.io/images', params: { page: fbPage }, withCredentials: true }).then(function (result) {
                    console.log(scope.page);
                    console.log(result);
                    if (result.data.photos.pages < fbPage) {
                        scope.loadedAll = true;
                    } else {
                        if (fbPage == 1){
                            scope.flickrImages = [];
                        }
                        scope.flickrImages.push.apply(scope.flickrImages, result.data.photos.photo);
                        scope.page++;
                    }

                    scope.loadingScroll = false;
                }, function (result) {
                    scope.loadingScroll = false;
                });
            }
        }
        scope.pickImage = function (image) {
            scope.selectedImage = image.target.attributes.fpsrc.value + "_b.jpg";
            scope.selectedId = image.target.attributes.fpid.value;
        }
        scope.select = function () {
            if (scope.fpType == "context")
                scope.model.source = scope.selectedImage;
            else
                scope.$parent.src = scope.selectedImage;
            scope.closePickr();
            imageField = '';
        }

        scope.$watch("isFpOpen", function () {
            toggleBody(scope);
            flickerConnect(scope, $http);
        });

        scope.logout = function () {
            $cookies.remove("4cc");
            scope.flickrState = scope.FLICKR_STATUS[2];
        }

        scope.loadMore = function () {
            if (scope.flickrState == scope.FLICKR_STATUS[1] && !scope.loadingScroll) {
                scope.loadingScroll = true;
                scope.showImages(scope.page);
            }
        }
    }

    return {
        restrict: "E",
        link: controller,
        scope: {
            isFpOpen: "=?",
            fpType: "=?",
            model: "=?"
        },
        templateUrl: "ng-templates/flickr-pickr.html"
    };
}

function authenticateWindow(scope, window, interval, http) {
    console.log('auth');
    var child = window.open('https://flickr.fourcorners.io/login', { replace: true });
    console.log('auth2');
    
    var promise = interval(function () {
        try {
            if (child.closed) {
                interval.cancel(promise);
                flickerConnect(scope, http);
                return;
            }
        } catch (err) {
            interval.cancel(promise);
            flickerConnect(scope, http);
            return;
        }
    }
        , 500);
}

function flickerConnect(scope, http) {
    scope.page = 1;
    scope.loadingScroll = false;
    scope.loadedAll = false;
    scope.flickrImages = [];
    scope.selectedId = "";    

    if (scope.isFpOpen && scope.isFlickr) {
        http({ method: 'GET', url: 'https://flickr.fourcorners.io/', withCredentials: true }).then(function (result) {
            scope.flickrState = scope.FLICKR_STATUS[1];
            scope.showImages(1);
        }, function (err) {
            scope.flickrState = scope.FLICKR_STATUS[2];
        });
    }
}

function toggleBody(scope) {
    if (scope.isFpOpen) {
        scope.page = 1;
        scope.loadingScroll = false;
        scope.loadedAll = false;
        scope.flickrImages = [];
        scope.selectedId = "";        
        scope.selectedImage = "";
        document.body.classList.add("modal-open");
    } else {
        document.body.classList.remove("modal-open");
    }
}


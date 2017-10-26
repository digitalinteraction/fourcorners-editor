/**
 * Created by Tim Osadchiy on 05/09/2016.
 */

'use strict';

var Fc = require('fourcorners');

module.exports = function (app) {
    app.directive('ngImagePreview', ['$timeout', serviceFun]);

    function serviceFun($timeout) {

        function controller(scope, element, attributes) {

            var fileInput = element.find('input')[0],
                imgPlaceholder = angular.element(document.querySelectorAll("[img-placeholder]")),
                FcObj, timeout;
            scope.isImgSmall = false;


            // Display the directive only if the file api is supported
            scope.visible = window.File && window.FileReader && window.FileList && window.Blob;

            scope.dropSrc = function () {
                fileInput.value = "";
                scope.src = null;
                scope.$parent.src = null;
                scope.$parent.srcFromFile = false;
                scope.isImgSmall = false;
            };

            scope.$watch('src', setImg);

            scope.$watch('externalSrc', function () {
                // console.log("external:" + scope.externalSrc);
                if (scope.externalSrc) {
                    scope.src = scope.externalSrc;
                }
            });

            scope.$watch('fcData', function () {
                $timeout.cancel(timeout);
                timeout = $timeout(setImg, 500);
            });

            scope.$watch('[topLeftVisible, topRightVisible, bottomLeftVisible, bottomRightVisible]', setVisibility);

            fileInput.addEventListener('change', handleFileSelect, false);

            function handleFileSelect(evt) {
                if (fileInput.files && fileInput.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        scope.src = e.target.result;
                        scope.$parent.src = null;
                        scope.$parent.srcFromFile = true;
                        scope.$apply();
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                }
            }

            function setImg() {
                if (FcObj != null) {
                    FcObj.destroy();
                }

                imgPlaceholder.empty();


                if (scope.src) {
                    var img = document.createElement('img');
                    img.className = 'img-responsive';
                    img.setAttribute('data-4c', '');
                    imgPlaceholder.append(img);
                    img.src = scope.src;
                    if (img.complete) {
                        setFc(img);
                        scope.isImgSmall = isImageSmall(img.naturalWidth, img.naturalHeight);
                    } else {
                        img.onload = function () {
                            setFc(img);
                            scope.isImgSmall = isImageSmall(img.naturalWidth, img.naturalHeight);
                        };
                    }
                }
            }

            function setFc(img) {
                /**
                 * Timeout is to let Internet Explorer to render the image first and calculate its' height
                 */
                setTimeout(function () {
                    FcObj = Fc.wrapImgElementWithJson(img, scope.fcData);
                    setVisibility();
                });
            }

            function setVisibility() {
                if (FcObj == null) {
                    return;
                }
                FcObj.topLeft.pin(scope.topLeftVisible);
                FcObj.topRight.pin(scope.topRightVisible);
                FcObj.bottomLeft.pin(scope.bottomLeftVisible);
                FcObj.bottomRight.pin(scope.bottomRightVisible);
            }

            function isImageSmall(width, height){
                //var largestDim = width > height ?  width : height;
                return ((width < 800) || (height < 400));
            }

        }

        return {
            restrict: 'A',
            link: controller,
            scope: {
                externalSrc: '=',
                fcData: '=',
                topLeftVisible: '=',
                topRightVisible: '=',
                bottomLeftVisible: '=',
                bottomRightVisible: '='
            },
            templateUrl: 'ng-templates/ng-image-preview.html'
        };
    }

};

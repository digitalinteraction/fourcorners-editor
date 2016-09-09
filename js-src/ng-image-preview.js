/**
 * Created by Tim Osadchiy on 05/09/2016.
 */

'use strict';

module.exports = function (app) {
    app.directive('ngImagePreview', ['$timeout', serviceFun]);

    function serviceFun($timeout) {

        function controller(scope, element, attributes) {

            var fileInput = element.find('input')[0],
                imgPlaceholder = angular.element(document.querySelectorAll("[img-placeholder]")),
                timeout;

            scope.src = undefined;
            // Display the directive only if the file api is supported
            scope.visible = window.File && window.FileReader && window.FileList && window.Blob;

            scope.dropSrc = function () {
                fileInput.value = "";
                scope.src = undefined;
            };

            scope.$watch('src', setImg);

            scope.$watch('fcData', function () {
                $timeout.cancel(timeout);
                timeout = $timeout(function () {
                    setImg();
                }, 1000);
            });

            fileInput.addEventListener('change', handleFileSelect, false);

            function handleFileSelect(evt) {
                if (fileInput.files && fileInput.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        scope.src = e.target.result;
                        scope.$apply();
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                }
            }

            function setImg() {
                imgPlaceholder.empty();
                if (scope.src) {
                    var img = document.createElement('img');
                    img.className = 'img-responsive';
                    img.setAttribute('data-4c', '');
                    imgPlaceholder.append(img);
                    img.src = scope.src;
                    window.buildFourcorners(img, scope.fcData);
                }
            }
        }

        return {
            restrict: 'A',
            link: controller,
            scope: {
                fcData: '='
            },
            templateUrl: 'ng-templates/ng-image-preview.html'
        };
    }

};

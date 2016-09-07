/**
 * Created by Tim Osadchiy on 05/09/2016.
 */

'use strict';

module.exports = function (app) {
    app.directive('ngImagePreview', [serviceFun]);

    function serviceFun() {

        function controller(scope, element, attributes) {

            var fileInput = element.find('input')[0];
            scope.src = undefined;

            // Display the directive only if the file api is supported
            scope.visible = window.File && window.FileReader && window.FileList && window.Blob;

            scope.dropSrc = function() {
                scope.src = undefined;
            };

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
        }

        return {
            restrict: 'A',
            link: controller,
            scope: {
                onRead: '='
            },
            templateUrl: 'ng-templates/ng-image-preview.html'
        };
    }

};

/**
 * Created by Tim Osadchiy on 05/09/2016.
 */

'use strict';

var yaml = require('js-yaml');

module.exports = function (app) {
    app.directive('ngYamlReader', [serviceFun]);

    function serviceFun() {

        function controller(scope, element, attributes) {

            if (!yaml.safeLoad) {
                throw 'Callback onRead is not defined';
            }

            var fileInput = element.find('input')[0];

            // Display the directive only if the file api is supported
            scope.visible = window.File && window.FileReader && window.FileList && window.Blob;

            fileInput.addEventListener('change', handleFileSelect, false);
            function handleFileSelect(evt) {
                var file = fileInput.files[0];
                if (!file) {
                    return;
                }
                var reader = new FileReader();
                reader.onload = function (e) {
                    var data;
                    try {
                        data = yaml.safeLoad(reader.result);
                    } catch (e) {
                        alert('The file has incorrect structure!');
                        return;
                    }
                    scope.onRead(data);
                };
                reader.readAsText(file);
            }
        }

        return {
            restrict: 'A',
            link: controller,
            scope: {
                onRead: '='
            },
            templateUrl: 'ng-templates/ng-yaml-reader.html'
        };
    }

};

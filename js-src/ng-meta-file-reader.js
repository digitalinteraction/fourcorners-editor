/**
 * Created by Tim Osadchiy on 05/09/2016.
 */

"use strict";

var dataIsValid = require("./image-data-is-valid");

var COULD_NOT_READ_FILE_ERROR = "Please check the file format";

module.exports = function (app) {
    app.directive("ngMetaFileReader", [serviceFun]);
};

function serviceFun() {

    function controller(scope, element, attributes) {

        if (!scope.onRead) {
            throw "Callback onRead is not defined";
        }

        var fileInput = element.find("input")[0];

        // Display the directive only if the file api is supported
        scope.visible = window.File && window.FileReader && window.FileList && window.Blob;
        scope.errorList = [];

        fileInput.addEventListener("change", handleFileSelect, false);

        function handleFileSelect(evt) {
            var file = fileInput.files[0];
            if (!file) {
                return;
            }
            var reader = new FileReader();

            if (file.type == "application/json") {
                reader.onload = function (e) {
                    readJson(reader.result);
                    fileInput.value = "";
                };
                reader.readAsText(file);
            } else {
                scope.errorList.push(COULD_NOT_READ_FILE_ERROR);
                scope.$apply();
            }
        }

        function readJson(jsonStr) {
            var data;
            scope.errorList.length = 0;
            try {
                data = JSON.parse(jsonStr);
                var errors = dataIsValid(data);
                scope.errorList.push.apply(scope.errorList, errors);
            } catch (e) {
                scope.errorList.push(COULD_NOT_READ_FILE_ERROR + ": " + e.message);
            }
            if (scope.errorList.length) {
                scope.$apply();
            } else {
                scope.onRead(data);
            }
        }

    }

    return {
        restrict: "A",
        link: controller,
        scope: {
            onRead: "="
        },
        templateUrl: "ng-templates/ng-meta-file-reader.html"
    };
}

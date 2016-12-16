/**
 * Created by Tim Osadchiy on 05/09/2016.
 */

"use strict";

var dataIsValid = require("./image-data-is-valid");

module.exports = function (app) {
    app.directive("ngMetaFileReader", ["IframeService", serviceFun]);
};

function serviceFun(IframeService) {

    function controller(scope, element, attributes) {

        if (!scope.onRead) {
            throw "Callback onRead is not defined";
        }

        var fileInput = element.find("input")[0];

        // Display the directive only if the file api is supported
        scope.visible = window.File && window.FileReader && window.FileList && window.Blob;
        scope.errorList = [];

        fileInput.addEventListener("change", handleFileSelect, false);

        IframeService.onMessage(function (data) {
            readJson(data);
        });

        function handleFileSelect(evt) {
            var file = fileInput.files[0];
            if (!file) {
                return;
            }
            var reader = new FileReader();
            if (!file.type.match(/image.*/)) {
                reader.onload = function (e) {
                    readJson(reader.result);
                    fileInput.value = "";
                };
                reader.readAsText(file);
            } else {
                reader.onload = function (e) {
                    readFromImage(e, file);
                    fileInput.value = "";
                };
                reader.readAsDataURL(file);
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
                scope.errorList.push("File has incorrect structure: " + e.message);
            }
            if (scope.errorList.length) {
                scope.$apply();
            } else {
                scope.onRead(data);
            }
        }

        function readFromImage(e, file) {
            //    Potentially read EXIF data in future
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

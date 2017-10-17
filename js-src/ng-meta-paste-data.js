/**
 * Created by Tim Osadchiy on 05/09/2016.
 */

"use strict";

var dataIsValid = require("./image-data-is-valid");

var COULD_NOT_PARSE_DATA_ERROR = "Could not read metadata.";

module.exports = function (app) {
    app.directive("ngMetaPasteData", [serviceFun]);
};

function serviceFun() {

    function controller(scope, element, attributes) {

        if (!scope.onDataLoad) {
            throw "Callback onDataLoad is not defined";
        }

        scope.errorList = [];

        scope.loadPastedData = function() {
            var data;
            console.log(scope.$parent.pastedData);   
            var pastedData = scope.pastedData;         
            scope.errorList = [];
            scope.errorList.length = 0;
            try {
                var errors;
                console.log(pastedData);
                data = JSON.parse(pastedData);
                errors = dataIsValid(data);
                scope.errorList.push.apply(scope.errorList, errors);
            } catch (err) {
                var scriptRegexp = /<script.*>\s?(.*)\s?<\/script>/;
                var match = scriptRegexp.exec(pastedData);
                if (match == null) {
                    scope.errorList.push(COULD_NOT_PARSE_DATA_ERROR);
                } else {
                    try {
                        data = JSON.parse(match[1]);
                        errors = dataIsValid(data);
                        scope.errorList.push.apply(scope.errorList, errors);
                    } catch (e) {
                        scope.errorList.push(COULD_NOT_PARSE_DATA_ERROR + ": " + e.message);
                    }
                }
            }
            if (scope.errorList.length) {
                //scope.$apply();
            } else {
                scope.onDataLoad(data);
                //scope.$apply();
            }
        }
    }

    return {
        restrict: "A",
        link: controller,
        scope: {
            onDataLoad: "="
        },
        templateUrl: "ng-templates/ng-meta-paste-data.html"
    };
}

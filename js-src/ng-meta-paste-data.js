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

        scope.loadPastedData = function () {
            var data;
            var pastedData = scope.pastedData;
            scope.errorList = [];
            scope.errorList.length = 0;

            try {
                var errors;
                data = JSON.parse(pastedData);
                errors = dataIsValid(data);
                scope.errorList.push.apply(scope.errorList, errors);
            } catch (err) {
                try {
                    var els = angular.element(pastedData);
                    for (var i = 0, len = els.length; i < len; i++) {
                        var el = els[i];
                        if (el.tagName && el.tagName.toLowerCase() == 'img') {
                            if (el.attributes["data-4c-metadata"]) {
                                data = JSON.parse(decodeURI(el.attributes['data-4c-metadata'].value));
                                break;
                            }
                        } else if (el.tagName && el.tagName.toLowerCase() == 'script') {
                            if (el.attributes['data-4c-meta']) {
                                data = JSON.parse(el.innerHTML);
                                break;
                            }
                        }
                    }

                    if (!data) {
                        scope.errorList.push(COULD_NOT_PARSE_DATA_ERROR);
                    } else {
                        errors = dataIsValid(data);
                        scope.errorList.push.apply(scope.errorList, errors);
                    }
                } catch (e) {
                    scope.errorList.push(COULD_NOT_PARSE_DATA_ERROR);
                }
            }
            if (scope.errorList.length) {
                scope.$parent.errorList = scope.errorList[scope.errorList.length-1];
                scope.errorList=[];
            } else {
                scope.onDataLoad(data);
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

/**
 * Created by Tim Osadchiy on 13/12/2016.
 */

"use strict";

var yaml = require("js-yaml"),
    jsonToXml = require("./json-to-xml"),
    scopeToJSON = require("./scope-to-json"),
    Blob = require("blob"),
    saveAs = require("browser-filesaver").saveAs,
    addMessageForSafari = require("./add-message-for-safari");

var FILE_NAME = "4c",
    FILE_ENCODING = "text/plain;charset=utf-8"; 

module.exports = function () {
    return [
        {
            id: "downloadYaml",
            text: "Download as YAML",
            fn: function ($scope, $filter) {
                var j = scopeToJSON.call($scope, $filter),
                    y = addMessageForSafari(yaml.safeDump(j), "yaml"),
                    b = new Blob([y], {type: FILE_ENCODING});
                saveAs(b, FILE_NAME + ".yaml");
            }
        },
        {
            id: "copyYaml",
            text: "Copy as YAML inline script",
            fn: function ($scope, $filter) {
                $scope.copyText();
            }
        },
        {
            id: "downloadXml",
            text: "Download as XML",
            fn: function ($scope, $filter) {
                var j = scopeToJSON.call($scope, $filter),
                    y = addMessageForSafari(jsonToXml(j), "xml"),
                    b = new Blob([y], {type: FILE_ENCODING});
                saveAs(b, FILE_NAME + ".xml");
            }
        },
        {
            id: "copyXml",
            text: "Copy as XML inline script",
            fn: function ($scope, $filter) {
                $scope.copyText();
            }
        }
    ];
};

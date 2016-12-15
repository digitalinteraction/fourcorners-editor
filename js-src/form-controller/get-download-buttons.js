/**
 * Created by Tim Osadchiy on 13/12/2016.
 */

"use strict";

var yaml = require("js-yaml"),
    jsonToXml = require("./json-to-xml"),
    scopeToJSON = require("./scope-to-json"),
    Blob = require("blob"),
    saveAs = require("browser-filesaver").saveAs,
    addMessageForSafari = require("./add-message-for-safari"),
    guid = require("./guid");

var FILE_NAME = "4c",
    // Must be consistent with 4 corners plugin base attribute
    SCRIPT_DATA_ATTRIBUTE = "data-4c-meta",
    FILE_ENCODING = "text/plain;charset=utf-8";

module.exports = function () {
    return [
        {
            id: "downloadYaml",
            text: "Download as YAML",
            fn: function ($scope, $filter) {
                var j = scopeToJSON.call($scope, $filter);
                download(yaml.safeDump(j), "yaml");
            }
        },
        {
            id: "copyYaml",
            text: "Copy as YAML inline script",
            fn: function ($scope, $filter) {
                var j = scopeToJSON.call($scope, $filter),
                    y = yaml.safeDump(j);
                copyText($scope, y, "yaml");
            }
        },
        {
            id: "downloadXml",
            text: "Download as XML",
            fn: function ($scope, $filter) {
                var j = scopeToJSON.call($scope, $filter);
                download(jsonToXml(j), "xml");
            }
        },
        {
            id: "copyXml",
            text: "Copy as XML inline script",
            fn: function ($scope, $filter) {
                var j = scopeToJSON.call($scope, $filter),
                    x = jsonToXml(j);
                copyText($scope, x, "xml");
            }
        }
    ];
};

function download(text, format) {
    var t = addMessageForSafari(text, format),
        b = new Blob([t], {type: FILE_ENCODING});
    saveAs(b, FILE_NAME + "." + format);
}

function copyText($scope, text, format) {
    var s = document.createElement("script"),
        d = document.createElement("div");
    s.type = "text/" + format;
    s.setAttribute(SCRIPT_DATA_ATTRIBUTE, guid());
    s.innerHTML = "\n" + text + "\n";
    d.appendChild(s);
    $scope.copyText(d.innerHTML);
}

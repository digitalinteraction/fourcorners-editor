/**
 * Created by Tim Osadchiy on 13/12/2016.
 */

"use strict";

// jsonToXml will potentially be used in future to support XMP format
var jsonToXml = require("./json-to-xml"),
    scopeToJSON = require("./scope-to-json"),
    Blob = require("blob"),
    saveAs = require("browser-filesaver").saveAs,
    // Json does not support comments, so we don't use for now.
    // In future we add stripping comments into 4c plugin.
    addMessageForSafari = require("./add-message-for-safari"),
    guid = require("../guid");

var FILE_NAME = "4c",
    // Must be consistent with 4 corners plugin base attribute
    IMG_LINK_ATTRIBUTE = "data-4c",
    SCRIPT_DATA_ATTRIBUTE = "data-4c-meta",
    IMG_DATA_ATTRIBUTE = "data-4c-metadata",
    FILE_ENCODING = "text/plain;charset=utf-8";

module.exports = function () {
    return [
        {
            id: "downloadJson",
            text: "Download metadata as JSON",
            fn: function ($scope, $filter) {
                var j = scopeToJSON.call($scope, $filter);
                download(JSON.stringify(j), "json");
            }
        },
        {
            id: "copyJson",
            text: "Copy metadata as a script tag",
            fn: function ($scope, $filter) {
                var j = scopeToJSON.call($scope, $filter);
                copyText($scope, JSON.stringify(j), "json");
            }
        }
    ];
};

function download(text, format) {
    var b = new Blob([text], { type: FILE_ENCODING });
    saveAs(b, FILE_NAME + "." + format);
}

function copyText($scope, text, format) {
    var s = document.createElement("script"),
        img = document.createElement("img"),
        d = document.createElement("div"),
        id = guid();
    var imageSrc = "{{replace-with-path-to-your-image}}";
    if ($scope.src && $scope.src != "") imageSrc = $scope.src;
    var sampleImg = '<img src="' + imageSrc + '" ' + IMG_LINK_ATTRIBUTE + '="' + id + '" ';
    sampleImg += IMG_DATA_ATTRIBUTE + '="' + encodeURI(text) + '">\n';
    //s.type = "text/" + format;
    //s.setAttribute(SCRIPT_DATA_ATTRIBUTE, id);
    //s.innerHTML = "\n" + text + "\n";
    //d.appendChild(s);
    $scope.copyText(sampleImg + d.innerHTML);
}

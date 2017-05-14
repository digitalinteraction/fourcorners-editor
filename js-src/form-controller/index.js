/**
 * Created by Tim Osadchiy on 28/08/2016.
 */

"use strict";

var dataIsValid = require("../image-data-is-valid"),
    loadDataToController = require("./load-data-to-controller"),
    scopeToJSON = require("./scope-to-json"),
    ContextSourceModel = require("./context-source-model"),
    LinkModel = require("./link-model"),
    downloadButtons = require("./get-download-buttons")();

module.exports = function (app) {
    app.controller("FormController", ["$scope", "$filter", "appConstants", "IframeService", controllerFn]);
};

function controllerFn($scope, $filter, appConstants, IframeService) {

    $scope.iframeMode = IframeService.getIframeMode();
    $scope.loaded = !$scope.iframeMode;
    $scope.downloadButtons = downloadButtons;

    $scope.sourceTypes = appConstants.SOURCE_TYPES;
    $scope.copyrightTypes = appConstants.COPYRIGHT_TYPES;
    $scope.dateFormat = appConstants.DATE_FORMAT;
    $scope.codesOfEthics = appConstants.CODES_OF_ETHICS;

    $scope.loadFileView = !$scope.iframeMode;
    $scope.pageIsJustOpened = true;
    $scope.dropdownIsVisible = false;

    $scope.contextSources = [];
    $scope.links = [];
    // $scope.contextSources = [new ContextSourceModel(appConstants)];
    // $scope.links = [new LinkModel()];
    $scope.backStory = {
        text: "",
        author: "",
        magazine: "",
        date: "",
        url: ""
    };
    $scope.creativeCommons = {
        copyrightType: appConstants.COPYRIGHT_TYPES[0],
        ccOwnerName: "",
        ccYear: "",
        codeOfEthics: "",
        description: "",
        codesOfEthicsSelect: appConstants.CODES_OF_ETHICS[0]
    };

    $scope.copyTextModal = {
        isOpen: false,
        text: ""
    };

    $scope.preview = {
        json: scopeToJSON.call($scope, $filter),
        topLeftVisible: false,
        topRightVisible: false,
        bottomLeftVisible: false,
        bottomRightVisible: false
    };

    $scope.copyText = function (text) {
        $scope.copyTextModal.isOpen = true;
        $scope.copyTextModal.text = text;
    };

    $scope.toggleDropdown = function () {
        $scope.dropdownIsVisible = !$scope.dropdownIsVisible;
    };
    $scope.toggleView = function () {
        $scope.pageIsJustOpened = false;
        $scope.loadFileView = !$scope.loadFileView;
    };
    $scope.addContext = function () {
        $scope.contextSources.push(new ContextSourceModel(appConstants));
    };
    $scope.removeContext = function (item) {
        var i = $scope.contextSources.indexOf(item);
        $scope.contextSources.splice(i, 1);
    };
    $scope.addLink = function () {
        $scope.links.push(new LinkModel());
    };
    $scope.removeLink = function (item) {
        var i = $scope.links.indexOf(item);
        $scope.links.splice(i, 1);
    };

    $scope.generate = function (button) {
        $scope.selectedDownloadButton = button;
        $scope.dropdownIsVisible = false;
        button.fn($scope, $filter);
    };

    $scope.loadDataFromReader = function (data) {
        loadDataToController.call($scope, data, appConstants);
        $scope.toggleView();
    };

    $scope.sendToIframe = function () {
        var j = scopeToJSON.call($scope, $filter);
        IframeService.post(JSON.stringify(j));
    };

    $scope.resetPreviewVisibility = function () {
        $scope.preview.topLeftVisible = false;
        $scope.preview.topRightVisible = false;
        $scope.preview.bottomLeftVisible = false;
        $scope.preview.bottomRightVisible = false;
    };

    $scope.previewTopLeftFocus = function () {
        $scope.resetPreviewVisibility();
        $scope.preview.topLeftVisible = true;
    };

    $scope.previewTopRightFocus = function () {
        $scope.resetPreviewVisibility();
        $scope.preview.topRightVisible = true;
    };

    $scope.previewBottomLeftFocus = function () {
        $scope.resetPreviewVisibility();
        $scope.preview.bottomLeftVisible = true;
    };

    $scope.previewBottomRightFocus = function () {
        $scope.resetPreviewVisibility();
        $scope.preview.bottomRightVisible = true;
    };

    $scope.$watch('creativeCommons.codesOfEthicsSelect', function (newVal) {
        $scope.creativeCommons.codeOfEthics = newVal;
    });

    $scope.$watch(function () {
        return JSON.stringify(scopeToJSON.call($scope, $filter));
    }, function () {
        $scope.preview.json = scopeToJSON.call($scope, $filter);
    });

    IframeService.onMessage(function (jsonStr) {
        try {
            var data = JSON.parse(jsonStr),
                errors = dataIsValid(data);
            if (errors.length) {
                errors.forEach(function (e) {
                    console.error(e);
                });
                return;
            } else {
                loadDataToController.call($scope, data, appConstants);
            }
        } catch (e) {
            console.error(e);
        }
        $scope.loaded = true;
    });

}
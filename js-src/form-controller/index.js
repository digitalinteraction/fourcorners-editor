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

var DOWNLOAD_BUTTON_STORAGE_ITEM_NAME = "downloadFn";

module.exports = function (app) {
    app.controller("FormController", ["$scope", "$filter", "appConstants", "IframeService", controllerFn]);
};

function controllerFn($scope, $filter, appConstants, IframeService) {

    $scope.iframeMode = IframeService.getIframeMode();
    $scope.loaded = !$scope.iframeMode;
    $scope.downloadButtons = downloadButtons;
    $scope.selectedDownloadButton = downloadButtons.filter(function (item) {
            return item.id == localStorage.getItem(DOWNLOAD_BUTTON_STORAGE_ITEM_NAME);
        })[0] || downloadButtons[0];

    $scope.sourceTypes = appConstants.SOURCE_TYPES;
    $scope.dateFormat = appConstants.DATE_FORMAT;
    $scope.loadYamlFileView = !$scope.iframeMode;
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
        ccOwnerName: "",
        ccYear: "",
        codeOfEthics: "",
        description: ""
    };

    $scope.copyTextModal = {
        isOpen: false,
        text: ""
    };

    $scope.json = scopeToJSON.call($scope, $filter);

    $scope.copyText = function (text) {
        $scope.copyTextModal.isOpen = true;
        $scope.copyTextModal.text = text;
    };

    $scope.toggleDropdown = function () {
        $scope.dropdownIsVisible = !$scope.dropdownIsVisible;
    };
    $scope.toggleView = function () {
        $scope.pageIsJustOpened = false;
        $scope.loadYamlFileView = !$scope.loadYamlFileView;
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
        localStorage.setItem(DOWNLOAD_BUTTON_STORAGE_ITEM_NAME, button.id);
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

    $scope.$watch(function () {
        return JSON.stringify(scopeToJSON.call($scope, $filter));
    }, function () {
        $scope.json = scopeToJSON.call($scope, $filter);
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
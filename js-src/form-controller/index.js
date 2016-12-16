/**
 * Created by Tim Osadchiy on 28/08/2016.
 */

'use strict';

var loadDataToController = require("./load-data-to-controller"),
    scopeToJSON = require("./scope-to-json"),
    ContextSourceModel = require("./context-source-model"),
    LinkModel = require("./link-model"),
    downloadButtons = require("./get-download-buttons")();

var DOWNLOAD_BUTTON_STORAGE_ITEM_NAME = "downloadFn";

module.exports = function (app) {
    app.controller('FormController', ['$scope', '$filter', 'appConstants', controllerFn]);
};

function controllerFn($scope, $filter, appConstants) {

    $scope.downloadButtons = downloadButtons;
    $scope.selectedDownloadButton = downloadButtons.filter(function (item) {
        return item.id == localStorage.getItem(DOWNLOAD_BUTTON_STORAGE_ITEM_NAME);
    })[0] || downloadButtons[0];

    $scope.sourceTypes = appConstants.SOURCE_TYPES;
    $scope.dateFormat = appConstants.DATE_FORMAT;

    $scope.loadYamlFileView = true;
    $scope.pageIsJustOpened = true;
    $scope.dropdownIsVisible = false;

    $scope.contextSources = [];
    $scope.links = [];
    // $scope.contextSources = [new ContextSourceModel(appConstants)];
    // $scope.links = [new LinkModel()];
    $scope.backStory = {
        text: '',
        author: '',
        magazine: '',
        date: '',
        url: ''
    };
    $scope.creativeCommons = {
        ccOwnerName: '',
        ccYear: '',
        codeOfEthics: '',
        description: ''
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
    };

    $scope.$watch(function () {
        return JSON.stringify(scopeToJSON.call($scope, $filter));
    }, function () {
        $scope.json = scopeToJSON.call($scope, $filter);
    });
}
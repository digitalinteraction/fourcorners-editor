/**
 * Created by Tim Osadchiy on 28/08/2016.
 */

'use strict';

var Blob = require('blob'),
    yaml = require('js-yaml'),
    saveAs = require('browser-filesaver').saveAs,
    addMessageForSafari = require("./add-message-for-safari"),
    jsonToXml = require("./json-to-xml"),
    loadDataToController = require("./load-data-to-controller"),
    scopeToJSON = require("./scope-to-json"),
    ContextSourceModel = require("./context-source-model"),
    LinkModel = require("./link-model");

module.exports = function (app) {
    app.controller('FormController', ['$scope', '$filter', 'appConstants', controllerFn]);
};

function controllerFn($scope, $filter, appConstants) {
    $scope.sourceTypes = appConstants.SOURCE_TYPES;
    $scope.dateFormat = appConstants.DATE_FORMAT;

    $scope.loadYamlFileView = false;
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

    $scope.json = scopeToJSON.call($scope, $filter);

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

    $scope.downloadYaml = function () {
        var j = scopeToJSON.call($scope, $filter),
            y = addMessageForSafari(yaml.safeDump(j), "yaml"),
            b = new Blob([y], {type: "text/plain;charset=utf-8"});
        saveAs(b, "4c.yaml");
    };

    $scope.downloadXml = function () {
        var j = scopeToJSON.call($scope, $filter),
            y = addMessageForSafari(jsonToXml(j), "xml"),
            b = new Blob([y], {type: "text/plain;charset=utf-8"});
        saveAs(b, "4c.xml");
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
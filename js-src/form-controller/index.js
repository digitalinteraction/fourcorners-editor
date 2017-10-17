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
    app.controller("FormController", ["$scope", "$filter", "appConstants", "IframeService", "StorageService",
        controllerFn]);
};

function controllerFn($scope, $filter, appConstants, IframeService, StorageService) {

    var metaId = null;

    $scope.iframeMode = IframeService.getIframeMode();
    $scope.loaded = !$scope.iframeMode;
    $scope.downloadButtons = downloadButtons;

    $scope.sourceTypes = appConstants.SOURCE_TYPES;
    $scope.copyrightTypes = appConstants.COPYRIGHT_TYPES;
    $scope.dateFormat = appConstants.DATE_FORMAT;
    $scope.codesOfEthics = appConstants.CODES_OF_ETHICS;

    $scope.welcomeView = !$scope.iframeMode;
    $scope.dropdownIsVisible = false;

    $scope.contextSources = [];
    $scope.links = [];

    $scope.backStory = {
        text: "",
        author: "",
        publication: "",
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

    $scope.flickrPickr = {
        isFpOpen: false
    };

    $scope.preview = {
        json: convertToJson(),
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
    $scope.createNew = function () {
        var newMeta = StorageService.create(convertToJson());
        metaId = newMeta.id;
        $scope.welcomeView = false;
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

    $scope.loadDataFromStorage = function (meta) {
        loadDataToController.call($scope, meta.data, appConstants);
        metaId = meta.id;
        $scope.welcomeView = false;
    };

    $scope.loadDataFromReader = function (data) {
        loadDataToController.call($scope, data, appConstants);
        $scope.createNew();
    };

    $scope.sendToIframe = function () {
        var j = convertToJson();
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
        if (newVal) {
            $scope.creativeCommons.codeOfEthics = newVal;
        }
    });

    $scope.$watch(function () {
        return JSON.stringify(convertToJson());
    }, function () {
        $scope.preview.json = convertToJson();
        if (metaId != null) {
            StorageService.patch(metaId, convertToJson());
        }
    });

    $scope.steps = [

        {
            step: 0,
            name: "Backstory",
            template: "ng-templates/backstory.html",
            corner: $scope.previewBottomLeftFocus,
            image: 'img/blp.png'
        },
        {
            step: 1,
            name: "Copyrights",
            template: "ng-templates/creative-commons.html",
            corner: $scope.previewBottomRightFocus,
            image: 'img/brp.png'
        },
        {
            step: 2,
            name: "Related Media",
            template: "ng-templates/context.html",
            corner: $scope.previewTopLeftFocus,
            image: 'img/tlp.png'
        },
        {
            step: 3,
            name: "Related Links",
            template: "ng-templates/links.html",
            corner: $scope.previewTopRightFocus,
            image: 'img/trp.png'
        },
        {
            step: 4,
            name: "Export",
            template: "",
            corner: $scope.resetPreviewVisibility,
            image: 'img/allp.png'
        }
    ];
    $scope.currentStep = 0;
    $scope.srcFromFile = false;

    $scope.stepTo = function (newStep) {
        if (newStep >= 0 && newStep < $scope.steps.length) {
            $scope.currentStep = newStep;
            $scope.steps[$scope.currentStep].corner();
        }
    };

    $scope.getStepTemplate = function () {
        if ($scope.currentStep >= 0 && $scope.currentStep < $scope.steps.length)
            return $scope.steps[$scope.currentStep].template;
    };

    $scope.openPickr = function (type, index) {
        console.log("open");
        $scope.flickrPickr.isFpOpen = true;
        $scope.flickrPickr.type = type;
        if (type == 'context')
            $scope.flickrPickr.model = $scope.contextSources[index];
        else
            $scope.flickrPickr.model = {};
    };

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
                if (data.url)
                    console.info('Loading image from ' + data.url);
                $scope.src = data.url;
                console.log($scope);
                loadDataToController.call($scope, data, appConstants);
            }
        } catch (e) {
            console.error(e);
        }
        $scope.loaded = true;
    });

    function convertToJson() {
        return scopeToJSON.call($scope, $filter);
    }

}
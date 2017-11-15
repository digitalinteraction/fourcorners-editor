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
    $scope.welcomeStep = 0;
    $scope.dropdownIsVisible = false;

    $scope.contextSources = [];
    $scope.links = [];

    $scope.errorList = '';

    $scope.WordpressPluginVersion = 0;
    $scope.isChromeExtension = false;

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
        IframeService.post(j, "data");
    };

    $scope.requestWordpressImage = function(index){
        var j = {index: index};
        IframeService.post(j, "imageRequest");
    }

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
            image: 'img/blp.png',
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAaCAYAAACO5M0mAAABX0lEQVQ4jW2TIUgEQRSGv1sNYvBAsJxR0CQGBRHEw6rigRg0GexiFkYGXtRksQhiUsQDwyXBsuEQxOO0icFgVTxBOUWfGm73mJudHyb8b7799+3bmZy1Fl/GmDywBHwDZRFp5nzQGNMH1IChpHQDTEWZOCg5EMA4MBMCPwK1zxBYAWLHl4FqpsekzwiYBL5EpAYQBEPq9pJGgDlgALgHTkWkCYC1FlUtqOqxqv55605Ve6y1pB+zBawE3jgKLAJt8AAYBnYCcKENikhdRB6A3QD45iamCs21HtqY8PwLcBsC5z1fFpHfDtAY0wuseuBhqKc1IO/4axG56gCTf7vppe25Jk1coDXHVE/ASQjc8NKOROSnAzTG9AOzHnjheSJgjOyY3n0wp6ol4NyrnwH7QCM9uBGtc+drGbgE1tNCVxRFz8VicZDWbXNVAbbjOH4F5yoYY6aTfhtAVUQe3af+AUxhek5UaB5PAAAAAElFTkSuQmCC'
        },
        {
            step: 1,
            name: "Copyrights",
            template: "ng-templates/creative-commons.html",
            corner: $scope.previewBottomRightFocus,
            image: 'img/brp.png',
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAACwklEQVRIicXWP2ifRRjA8U+CIgZKFSKdCtG6qEEbAiIoFHQQAhFrQEqlg7jromS6QZ9JcbAOHR2sWixErJHfKATsGNpCBocUf+Ci4GCJpoWSXx3ujhxv39RfMtQHXu7P+9zzvbvn7nluYmdnxwFkEiOIiLEHTYwBO4QlLGAeMw1siHUMsBIRWweFTWEZ7+HwGBO/gbP4OCK29wObw0U8WdobOI81XMefmMYxnMAZzBbdTbwZEVfGgb2M1bKyId4t7V6pPkspLeJzeZu3sRgRP7W6kz0rqqABjt8L1IGuFv1BGb+aUprbCzYlb10FvS77YWyJiBtlXAVeTClN9cGWZR8NcRq3O7am8aF8+m7iDv5IKV1IKR1vgLfL+GGxt1z/VZ8dwm/yqXvN3Vv3Ki7g0T0WNcLbEfFl7Sg+/EHenaMRsVVXtlRAGz2g53GpAf2DH/Etfi99v+ByO6j4cKPYXWJ3GxdKeb5n1ufwUKn/jCewiFN4HB/ghYi43jO22luAB0pjvpRrHeVnm39bOCnfsSq3IuLTHkiVam+e3ZXNlLI7uxeb+ncd0DhS7c1UWP30GHusqW/uEyQiqr3JlNJkDaij0jnd0W9j3CP7haWUqr1RRIzqioalPNbR32jqC5jYJ6/aG7K7feulPNFRXsNfpf4U3u9aSym9lVI6sges2ltvYYNSnuko38RHTfsT+XKflC//1/gK11JKr/TAqr1BC1uRb/qsfIda+QxfNO1T8sm8JIclOKKz6hJBZovdlRa2JSc+cppok+UdvFO+X3tmf6uMeaMBHS59cLZm8DafTeGaHDxr1O8G4wk8g6fxsByuLkfE3w3oQXwvH6hNPFczdzd5zskhqaaZ0/4jzbQPnrKibwpoGy+1GbubPK/IPtsuA66624e9Unx0tQEtdp8G//sbpMp9e121cl/ejfeSA72I/wXjngPoEujyNAAAAABJRU5ErkJggg=='
        },
        {
            step: 2,
            name: "Related Media",
            template: "ng-templates/context.html",
            corner: $scope.previewTopLeftFocus,
            image: 'img/tlp.png',
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAAZCAYAAACLtIazAAACL0lEQVRYhcXYT4hNURzA8c+MayajEE2zsiE1I2pYajSlFDKMJFkhRUiiLJQ7FndhJzulDClmo4YssJspWauRLIkFIdmoKROL+x5vXte799133sy3Tr3z6/f3nHt+97zbMTc3p0lO41qzRgG5jJvVSZIkuQZRiSDdWFnCLhTdzRqUKbKWL/jZoo8i9KC3rHGEE9hcQHcak3Wyk3hUNngTjGbEPoDhOI7zbGcijGB/wWD1gRaTYZwvoPe49nH9jLcZSoMW9wzm8Q2vM+T96GP+mXyGYxnKU9JVy2MJxnAIn3AFLwunWp4XSZKM1gvjOL6Lo7TeeGq5IC0SBvAU66Qrvah0BvS1u26+AtsK2JwJmEMmIXfyfYbsXQP9XtzBUkzge8Bc5hFyJ6/617h+S29FM//R7cC4tDGsrtjC2sA5IexOfpC+bzfhKz420D2FvTXzs9iKocoI2rBCr9ovvNK4wAFcr5NF2C7d4X2Bcwr/aOTQhftY1kBnJHTQdha5HMfNPxIJtuTYbcT6kIm0q8gu6RVwHG9wEDtwqaB90N1sR5GduIedlfkGPMRz6ZkrQtG7dOGEQnMDhzPkzXTyIawKk074IsdwLoCfCHsC+PnrrMou6WW8nsGCvo7gIn60mFOVYTwooDcUx/FUhry/+qO2yL7KKMtEZSw0a+T8S4rwROM7ZpXpAAmFpGg+MxFutxDolrTRtJueDNkkJtv1ta6W0h+XFpIyRc4K11zKMNuswR8wqlaIUO7yHwAAAABJRU5ErkJggg=='
        },
        {
            step: 3,
            name: "Related Links",
            template: "ng-templates/links.html",
            corner: $scope.previewTopRightFocus,
            image: 'img/trp.png',
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAACP0lEQVRIia2Wz2sTQRTHP5FE7MWD0PqjkJOeXRQNnoSUpodK0RyC/4PePG9ZeHfBg+CfoII/iLaixd5TUXKxh0YQPFRb8RBBBekjHuatmWx2t2nSB8vOvHkzH2be9w1TUFUmtCKwAARAD/gArInI/4ULE0IC4DFwLuH/CDREZHNSSAV4Axy3/legAJyy/k9gXkQ2UNVxvoqqdlW1p6q/VbUeRRFRFKGqDfP1VPWbqp4ZZyf+Dv4A10Rk3Q8Iw3AOeAWUgAdHDhsAICJvgfvWvXEQyBAAGAJ49s7+J0eFpAE+ATM5cy7a//sokDTAZ4N0wjCsJCeEYVgFblu3uZ+KgoSKquafVdVf5u+qauCpq+qp64eqlvMARVXdSgHEn7/YlsVf9nxdVa1EUUTecS3Sr+SbDCd53fxY3CJwHZjCFWJNRFrg7p0sixP3BWhmxDRtvGzx94A94KmItOOgJCQA6vQ1fiATkR1gOen3Ib6KikDL/GVgifTdLNk4wPsseJyTpEyfAytAx8YfAtXE3Kr5sbiVPEgZWGWwDjZwZ9vAJXEKeAHMeoCX9JPcEJG9PMgycAL4y/BV0QZqtlAJOJoCqPlJTrOCqu4C08Bd4E5G3AxwDDibAmhlzBnYybS1MxMH7KYB6ItjX8iOtS/lxA0d0aiAGPLM2reAucMGxBDB7aaEU1DDG69PCogh27iiiqX6CPco2AaeTAqIIeDq4gruKQPuxXHa2h3g6rgAGLxWNoHzwDxwAfe8aQOvcYU5tv0DFPeMH2lHBjQAAAAASUVORK5CYII='
        },
        {
            step: 4,
            name: "Export",
            template: "",
            corner: $scope.resetPreviewVisibility,
            image: 'img/allp.png',
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABm0lEQVRoge2aPU7DMBSAvyDEX3sIBEtnRgQXAMHGzsiEgAUGdiZahnAJDgALGxMbExuCKyDKBnoMjUSU2g1OnPhR+ZOsSM+O8z7lWUmsJCKCAjrADdDLxeayuIkFYDEfmG0mLyc6wB2wWWeSGT+5VKaLBwkIK9IFbvEgAZAEXCO7wHoh9gF8WcYfAMuWvs+QIi4MgKMJ/e+h18hfKJMARmtEGmgXDUu8mES0YpO4Aq6LQa0ikySOgflih0aRMgkTQ9OT/Rx4rJnMW8Xz+rhLAHybRJ6A+4qJ1KGPOdkyCUBPadWSAB0iVSTGKim0SNU7UXy9fw4pUrucMh6AvVAiPiW2gGEIEe8SAMg42yJCQ61vuJ6IyMBxnh0R6eZjbYpcepIwtjZL65XRm3Ee13Ky0qZIChzyK+NNAtrfRUmz4wpw4nPiENtBafkQd0I/2b0RRbShYcvURg/YL8TObIM1i6wCp4WYVWRqSiuKaCOKaCOKaCOKaCOKaCOKaCOKaMP0PbIBLLWdiIE1l8GJyP/4YyAjsXVMTWlFEW38AGp0m3qCpYA4AAAAAElFTkSuQmCC'
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
        $scope.flickrPickr.isFpOpen = true;
        $scope.flickrPickr.type = type;
        if (type == 'context')
            $scope.flickrPickr.model = $scope.contextSources[index];
        else
            $scope.flickrPickr.model = {};
    };


    IframeService.onMessage(function (jsonStr) {
        try {
            var data = JSON.parse(jsonStr);
            if (data.type == "imageResponse") {
                $scope.contextSources[data.index].source = data.url;
            } else {
                $scope.WordpressPluginVersion = data.version || 0;
                $scope.isChromeExtension = data.extension || false;                
                var errors = dataIsValid(data);
                if (errors.length) {
                    errors.forEach(function (e) {
                        console.error(e);
                    });
                    return;
                } else {
                    if (data.url)
                        console.info('Loading image from ' + data.url);
                    $scope.src = data.url;
                    loadDataToController.call($scope, data, appConstants);
                }
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
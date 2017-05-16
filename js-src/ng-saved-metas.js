/**
 * Created by Tim Osadchiy on 16/05/2017.
 */

"use strict";

module.exports = function (app) {
    app.directive("ngSavedMetas", ["StorageService", serviceFun]);
};

function serviceFun(StorageService) {

    function controller(scope, element, attributes) {

        scope.select = function (meta) {
            scope.onSelected(meta);
        };

        scope.duplicate = function (meta) {
            StorageService.create(meta.data);
            loadMetas();
        };

        scope.remove = function (meta) {
            StorageService.delete(meta.id);
            loadMetas();
        };

        scope.getMetaTitle = getMetaTitle;

        loadMetas();

        function loadMetas() {
            scope.metas = StorageService.list();
        }

    }

    return {
        restrict: "E",
        link: controller,
        scope: {
            onSelected: "=?"
        },
        templateUrl: "ng-templates/ng-saved-metas.html"
    };
}

function getMetaTitle(meta) {
    var parts = [];
    if (meta.data.backStory.text) {
        parts.push(shortenText(meta.data.backStory.text));
    } else if (meta.data.creativeCommons.description) {
        parts.push(shortenText(meta.data.creativeCommons.description));
    }
    parts.push("Last modified on " + meta.lastModified.toLocaleString());
    return parts.join(", ");
}

function shortenText(str) {
    var maxStringLength = 100;
    return str.length <= maxStringLength ? str : str.slice(0, maxStringLength - 3) + "...";
}
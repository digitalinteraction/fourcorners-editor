/**
 * Created by Tim Osadchiy on 15/12/2016.
 */

"use strict";

module.exports = function (app) {
    app.directive("ngCopyTextModal", ["$timeout", serviceFun]);
};

function serviceFun($timeout) {

    function controller(scope, element, attributes) {

        scope.copyToClipboardIsAvailable = document.execCommand != undefined;

        scope.toggle = function () {
            scope.isOpen = !scope.isOpen;
        };

        scope.copy = function () {
            if (!scope.copyToClipboardIsAvailable) {
                return;
            }
            var textarea = element.find('textarea')[0].select();
            document.execCommand('copy');
        };

        scope.$watch("isOpen", function () {
            toggleBody(scope);
            copyIfOpen(scope, $timeout);
        })

    }

    return {
        restrict: "E",
        link: controller,
        scope: {
            isOpen: "=?",
            text: "=?"
        },
        templateUrl: "ng-templates/ng-copy-text-modal.html"
    };
}

function toggleBody(scope) {
    if (scope.isOpen) {
        document.body.classList.add("modal-open");
    } else {
        document.body.classList.remove("modal-open");
    }
}

function copyIfOpen(scope, $timeout) {
    $timeout(function () {
        if (scope.isOpen) {
            scope.copy();
        }
    });
}
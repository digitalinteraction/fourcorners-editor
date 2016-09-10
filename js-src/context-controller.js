/**
 * Created by Tim Osadchiy on 10/09/2016.
 */

'use strict';

module.exports = function (app) {
    app.controller('ContextController', ['$scope', '$timeout', 'appConstants', controllerFn]);
};

function controllerFn($scope, $timeout, appConstants) {
    var testImg = new Image(),
        testImgTimeout;

    $scope.imageIsLoaded = true;
    $scope.getPlaceholder = function () {
        if ($scope.context.sourceType == appConstants.SOURCE_TYPES[0]) {
            return 'http://example.com/images/example.png';
        } else if ($scope.context.sourceType == appConstants.SOURCE_TYPES[1]) {
            return 'jNQXAC9IVRw';
        }
    };

    $scope.getError = function () {
        var error;
        if ($scope.context.sourceType == appConstants.SOURCE_TYPES[0] && !$scope.imageIsLoaded) {
            error = 'Image with the specified url was not found';
        }
        if (!$scope.context.source) {
            error = 'Context without a valid source will be ignored';
        }
        return error;
    };

    testImg.onload = function () {
        $scope.imageIsLoaded = true;
    };
    testImg.onerror = function () {
        $scope.imageIsLoaded = false;
    };

    $scope.$watch('context.sourceType + context.source', function () {
        $timeout.cancel(testImgTimeout);
        if ($scope.context.sourceType == appConstants.SOURCE_TYPES[0] && $scope.context.source) {
            $timeout(function() {
                testImg.src = $scope.context.source;
            }, 500);
        }
    });
}

/**
 * Created by Tim Osadchiy on 15/05/2017.
 */

"use strict";

var STORAGE_KEY = "storageKey";

module.exports = function (app) {
    app.service("StorageService", ["$window", serviceFn]);
};

function serviceFn($window) {
    return {

    }
}
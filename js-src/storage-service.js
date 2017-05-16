/**
 * Created by Tim Osadchiy on 15/05/2017.
 */

"use strict";

var guid = require("./guid");

var STORAGE_KEY = "savedMetas";

module.exports = function (app) {
    app.service("StorageService", ["$window", serviceFn]);
};

function serviceFn($window) {

    var storage;

    function initStorage() {
        storage = JSON.parse($window.localStorage.getItem(STORAGE_KEY)).map(function (item) {
            item.created = new Date(item.created);
            item.lastModified = new Date(item.lastModified);
            return item;
        });
        if (storage == null) {
            storage = [];
            saveStorage();
        }
    }

    function saveStorage() {
        $window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
    }

    function create(data) {
        var item = {id: guid(), created: new Date(), lastModified: new Date(), data: JSON.parse(JSON.stringify(data))};
        storage.push(item);
        saveStorage();
        return item;
    }

    function patch(id, data) {
        var item = get(id);
        if (item != null) {
            item.data = data;
            item.lastModified = new Date();
            saveStorage();
            return item;
        }
    }

    function get(id) {
        return storage.filter(function (i) {
            return i.id == id;
        })[0];
    }

    function remove(id) {
        var item = get(id),
            i = storage.indexOf(item);
        storage.splice(i, 1);
        saveStorage();
    }

    initStorage();

    return {
        create: create,
        get: get,
        patch: patch,
        delete: remove,
        list: function () {
            return storage.slice();
        }
    }
}
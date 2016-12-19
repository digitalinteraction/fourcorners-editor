/**
 * Created by Tim Osadchiy on 16/12/2016.
 */

"use strict";

module.exports = function (app) {
    app.service("IframeService", ["$window", serviceFn]);
};

function serviceFn($window) {
    var listeners = [];

    var targetWindow,
        api = {
            onMessage: function (fn) {
                listeners.push(fn);
            },
            offMessage: function (fn) {
                var i = list.indexOf(fn);
                listeners.splice(i, 1);
            },
            post: function (data) {
                targetWindow.postMessage(data, "*");
            },
            getIframeMode: function () {
                return $window.self !== $window.top;
            }
        };

    var execute = function (data) {
        listeners.forEach(function (l) {
            l(data);
        });
    };

    $window.addEventListener("message", function (event) {
        targetWindow = event.source;
        execute(event.data);
    }, false);

    return api;
}

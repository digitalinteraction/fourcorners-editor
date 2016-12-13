/**
 * Created by Tim Osadchiy on 13/12/2016.
 */

"use strict";

module.exports = LinkModel;

function LinkModel(obj) {
    obj = obj || {};
    this.title = obj.title ? obj.title : '';
    this.url = obj.url ? obj.url : '';
    this.toJSON = function () {
        return {
            title: this.title,
            url: this.url
        }
    };
    this.toString = function () {
        return this.title + ', ' + this.url;
    };
}
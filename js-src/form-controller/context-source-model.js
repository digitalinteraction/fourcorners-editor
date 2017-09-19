/**
 * Created by Tim Osadchiy on 13/12/2016.
 */

"use strict";

module.exports = ContextSourceModel;

function ContextSourceModel(appConstants, obj) {
    obj = obj || {};
    this.sourceType = obj.sourceType ? obj.sourceType : appConstants.SOURCE_TYPES[0];
    this.source = obj.source ? obj.source : '';
    this.credit = obj.credit ? obj.credit : '';
    this.toJSON = function () {
        var obj = {credit: this.credit};
        if (this.sourceType == appConstants.SOURCE_TYPES[0]) {
            obj.src = this.source;
        } else if (this.sourceType == appConstants.SOURCE_TYPES[1]) {
            obj.youtube_id = this.source;
        } else if (this.sourceType == appConstants.SOURCE_TYPES[2]) {
            obj.vimeo_id = this.source;
        }
        return obj;
    };
    this.toString = function () {
        return this.sourceType + ', ' + this.source + ', ' + this.credit;
    };
}

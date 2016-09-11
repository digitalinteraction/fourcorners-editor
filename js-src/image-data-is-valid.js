/**
 * Created by Tim Osadchiy on 08/09/2016.
 */

'use strict';

module.exports = function (data) {
    var errors = [];
    errors.push.apply(errors, contextIsValid(data));
    errors.push.apply(errors, linksAreValid(data));
    errors.push.apply(errors, backStoryIsValid(data));
    errors.push.apply(errors, creativeCommonsAreValid(data));
    return errors;
};

function contextIsValid(data) {
    if (!data.context) {
        return [];
    }
    if (data.context && Object.prototype.toString.call(data.context) != '[object Array]') {
        return ['Context must be a list'];
    } else if (data.context) {
        var errors = [];
        data.context.forEach(function (el, i) {
            if (Object.prototype.toString.call(el) != '[object Object]') {
                errors.push('Element ' + (i + 1) + ' of Context has a wrong format');
            }
        });
        return errors;
    }
}

function linksAreValid(data) {
    if (!data.links) {
        return [];
    }
    if (data.links && Object.prototype.toString.call(data.links) != '[object Array]') {
        return ['Links must be a list'];
    } else if (data.links) {
        var errors = [];
        data.links.forEach(function (el, i) {
            if (Object.prototype.toString.call(el) != '[object Object]') {
                errors.push('Element ' + (i + 1) + ' of Links has a wrong format');
            }
        });
        return errors;
    }
}

function backStoryIsValid(data) {
    if (!data.backStory) {
        return [];
    }
    if (Object.prototype.toString.call(data.backStory) != '[object Object]') {
        return ['Backstory has a wrong format'];
    }
    return [];
}

function creativeCommonsAreValid(data) {
    if (!data.creativeCommons) {
        return [];
    }
    if (Object.prototype.toString.call(data.creativeCommons) != '[object Object]') {
        return ['Creative commons have a wrong format'];
    }
    return [];
}

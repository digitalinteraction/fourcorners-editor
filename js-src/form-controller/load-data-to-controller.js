/**
 * Created by Tim Osadchiy on 13/12/2016.
 */

"use strict";

var ContextSourceModel = require("./context-source-model"),
    LinkModel = require("./link-model");

module.exports = function (data, appConstants) {

    completeData(data);

    this.contextSources = data.context.map(function (c) {
        return new ContextSourceModel(appConstants, {
            sourceType: c.src ? appConstants.SOURCE_TYPES[0] : appConstants.SOURCE_TYPES[1],
            source: c.src || c.youtube_id,
            credit: c.credit
        });
    });

    this.links = data.links.map(function (l) {
        return new LinkModel({
            title: l.title,
            url: l.url
        });
    });

    this.backStory = {
        text: data.backStory.text,
        author: data.backStory.author,
        magazine: data.backStory.magazine,
        date: data.backStory.date,
        url: data.backStory.magazineUrl
    };

    var copyright = data.creativeCommons.copyright ?
        data.creativeCommons.copyright
            .split(/(©|\.)/)
            .map(function (s) {
                return s.trim();
            })
            .filter(function (s) {
                return ["©", "."].indexOf(s) < 0 && s;
            }) : ["", ""];
    this.creativeCommons = {
        ccOwnerName: copyright[0] ? copyright[0] : "",
        ccYear: copyright[1] ? copyright[1] : "",
        copyrightType: copyright[2] ? copyright[2] : appConstants.COPYRIGHT_TYPES[0],
        codeOfEthics: data.creativeCommons.codeOfEthics,
        description: data.creativeCommons.description
    };
    this.$apply();
};

function completeData(data) {
    data.context = data.context || [];
    data.links = data.links || [];
    data.context = data.context || [];
    data.links = data.links || [];
    data.backStory = data.backStory || {};
    data.backStory = data.backStory || {};
    data.creativeCommons = data.creativeCommons || {};
    if (data.creativeCommons.copyright) {
        data.creativeCommons.copyright = data.creativeCommons.copyright.replace("(c)", "©")
    }
}

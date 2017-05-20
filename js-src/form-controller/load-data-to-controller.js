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
        publication: data.backStory.publication,
        date: data.backStory.date,
        url: data.backStory.publicationUrl
    };

    this.creativeCommons = {
        ccOwnerName: data.creativeCommons.credit,
        ccYear: data.creativeCommons.year,
        copyrightType: appConstants.COPYRIGHT_TYPES.indexOf(data.creativeCommons.copyright) > -1 ?
            data.creativeCommons.copyright : appConstants.COPYRIGHT_TYPES[0],
        codeOfEthics: data.creativeCommons.codeOfEthics,
        codesOfEthicsSelect: appConstants.CODES_OF_ETHICS.indexOf(data.creativeCommons.codeOfEthics) > -1 ?
            data.creativeCommons.codeOfEthics : "",
        description: data.creativeCommons.description
    };

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

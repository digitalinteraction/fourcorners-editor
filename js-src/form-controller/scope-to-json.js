/**
 * Created by Tim Osadchiy on 13/12/2016.
 */

"use strict";

module.exports = function ($filter) {
    var obj = {};
    obj.context = [];
    for (var i = 0, l = this.contextSources.length; i < l; i++) {
        obj.context.push(this.contextSources[i].toJSON());
    }
    obj.links = [];
    for (var i = 0, l = this.links.length; i < l; i++) {
        obj.links.push(this.links[i].toJSON());
    }
    obj.backStory = {
        text: this.backStory.text,
        author: this.backStory.author,
        publication: this.backStory.publication,
        publicationUrl: this.backStory.url,
        date: $filter('date')(this.backStory.date, this.backStory.dateFormat)
    };
    obj.creativeCommons = {
        credit: this.creativeCommons.ccOwnerName,
        year: this.creativeCommons.ccYear,
        copyright: this.creativeCommons.copyrightType,
        codeOfEthics: this.creativeCommons.codeOfEthics,
        description: this.creativeCommons.description
    };
    return obj;
};

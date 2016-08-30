/**
 * Created by Tim Osadchiy on 28/08/2016.
 */

'use strict';

var Blob = require('blob'),
    yaml = require('js-yaml'),
    saveAs = require('browser-filesaver').saveAs;

var SOURCE_TYPES = ['Image', 'YouTube'],
    DATE_FORMAT = 'MMMM d, yyyy';

module.exports = function (app) {
    app.controller('FormController', ['$scope', '$filter', controllerFn]);
};

function controllerFn($scope, $filter) {

    $scope.sourceTypes = SOURCE_TYPES;
    $scope.dateFormat = DATE_FORMAT;

    $scope.contextSources = [new ContextSourceModel()];
    $scope.links = [new LinkModel()];
    $scope.backStory = {
        text: '',
        author: '',
        magazine: '',
        date: '',
        url: ''
    };
    $scope.creativeCommons = {
        ccOwnerName: '',
        ccYear: '',
        codeOfEthics: '',
        description: ''
    };

    $scope.addContext = function () {
        $scope.contextSources.push(new ContextSourceModel());
    };
    $scope.removeContext = function (item) {
        var i = $scope.contextSources.indexOf(item);
        $scope.contextSources.splice(i, 1);
    };
    $scope.addLink = function () {
        $scope.links.push(new LinkModel());
    };
    $scope.removeLink = function (item) {
        var i = $scope.links.indexOf(item);
        $scope.links.splice(i, 1);
    };
    $scope.generate = function () {
        var j = scopeToJSON.call($scope, $filter),
            y = yaml.safeDump(j),
            b = new Blob([y], {type: "text/plain;charset=utf-8"});
        saveAs(b, "4c.yaml");
    };

    loadTesDataToController($scope);
}

function ContextSourceModel(obj) {
    obj = obj || {};
    this.sourceType = obj.sourceType ? obj.sourceType : SOURCE_TYPES[0];
    this.source = obj.source ? obj.source : '';
    this.credit = obj.credit ? obj.credit : '';
    this.getPlaceholder = function () {
        if (this.sourceType == SOURCE_TYPES[0]) {
            return 'images/example.jpg or http://example.com/images/example.png';
        } else if (this.sourceType == SOURCE_TYPES[1]) {
            return '123456';
        }
    };
    this.toJSON = function () {
        var obj = {credit: this.credit};
        if (this.sourceType == SOURCE_TYPES[0]) {
            obj.src = this.source;
        } else if (this.sourceType == SOURCE_TYPES[1]) {
            obj.youtube_id = this.source;
        }
        return obj;
    };
}

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
}

function scopeToJSON($filter) {
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
        magazine: this.backStory.magazine,
        magazineUrl: this.backStory.url,
        date: $filter('date')(this.backStory.date, this.backStory.dateFormat)
    };
    obj.creativeCommons = {
        copyright: this.creativeCommons.ccOwnerName + ' © ' + this.creativeCommons.ccYear,
        codeOfEthics: this.creativeCommons.codeOfEthics,
        description: this.creativeCommons.description
    };
    return obj;
}

function loadTesDataToController($scope) {
    $scope.contextSources = [
        new ContextSourceModel({
            sourceType: 'Image',
            source: 'img/1-0.jpg',
            credit: 'Eddie Adams/AP'
        }),
        new ContextSourceModel({
            sourceType: 'Image',
            source: 'img/1-0.jpg',
            credit: 'Eddie Adams/AP'
        }),
        new ContextSourceModel({
            sourceType: 'YouTube',
            source: 'S9Jy3cLmqrE'
        })
    ];

    $scope.links = [
        new LinkModel({
            title: 'Alan Kurdi: Why one picture cut through',
            url: 'http://www.bbc.co.uk/news/world-europe-34150419'
        }),
        new LinkModel({
            title: 'Dispatches: Why I Shared a Horrific Photo of a Drowned Syrian Child',
            url: 'https://www.hrw.org/news/2015/09/02/dispatches-why-i-shared-horrific-photo-drowned-syrian-child'
        }),
        new LinkModel({
            title: 'Death of Alan Kurdi',
            url: 'https://en.wikipedia.org/wiki/Death_of_Alan_Kurdi'
        })
    ];

    $scope.backStory = {
        text: '“On the one hand, I wish I hadn’t had to take that picture. I would have much preferred to have taken one of Alan playing on the beach than photographing his corpse. What I saw has left a terrible impression that keeps me awake at night. “Then again, I am happy that the word finally cares and is mourning the dead children. I hope that my picture can contribute to changing the way we look at immigration in Europe, and that no more people have to die on their way out of a war."',
        author: 'Nilüfer Demir',
        magazine: 'Vice',
        date: 'September 4, 2015',
        url: 'https://www.vice.com/en_uk/read/nilfer-demir-interview-876'
    };

    $scope.creativeCommons = {
        ccOwnerName: 'Nilüfer Demir/DHA2015',
        ccYear: '2015',
        codeOfEthics: 'While all photography is interpretive, as a photojournalist I consider my photographs are meant to respect the visible facts of the situations I depict. I do not add or subtract elements to or from my photographs.',
        description: 'A Turkish officer near the body of Alan Kurdi, a 3-year-old Syrian refugee who drowned off Turkey’s Bodrum Peninsula. The body of his brother, Ghalib, washed up nearby. September 1, 2015.'
    };
}
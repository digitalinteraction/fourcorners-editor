/**
 * Created by Tim Osadchiy on 27/08/2016.
 */

'use strict';

var angular = require('angular');
require('angular-sanitize');
require('angular-animate');
require('angular-touch');
require('angularjs-datepicker');
require('angular-cookies');
require('ng-infinite-scroll');


var moduleRequirements = ['ngSanitize', 'ngAnimate', 'ngTouch', '720kb.datepicker', 'ngCookies', 'infinite-scroll'],
    app = angular.module('FourCornersEditor', moduleRequirements);

require('./constants')(app);
require('./form-controller')(app);
require('./context-controller')(app);
require('./ng-meta-file-reader')(app);
require('./ng-meta-paste-data')(app);
require('./ng-image-preview')(app);
require('./ng-affix')(app);
require('./ng-copy-text-modal')(app);
require('./ng-saved-metas')(app);
require('./iframe-service')(app);
require('./storage-service')(app);
require('./flickr-pickr')(app);

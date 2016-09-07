/**
 * Created by Tim Osadchiy on 27/08/2016.
 */

'use strict';

var angular = require('angular');
require('angular-sanitize');
require('angular-animate');
require('angular-touch');
require('angularjs-datepicker');

var moduleRequirements = ['ngSanitize', 'ngAnimate', 'ngTouch', '720kb.datepicker'],
    app = angular.module('FourCornersEditor', moduleRequirements);

require('./form-controller')(app);
require('./ng-yaml-reader')(app);
require('./ng-image-preview')(app);

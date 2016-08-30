/**
 * Created by Tim Osadchiy on 15/08/2016.
 */

'use strict';

module.exports = function (grunt) {

    var config = grunt.config.get('environment'),
        cssMinFileOptions = {};

    cssMinFileOptions[config.minifyCssTo] = config.minifyCssFrom;

    grunt.config.set('cssmin', {
        options: {
            sourceMap: config.includeCssMaps,
            shorthandCompacting: false,
            roundingPrecision: -1
        },
        target: {
            files: cssMinFileOptions
        }
    });
};
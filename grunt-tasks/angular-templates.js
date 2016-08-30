/**
 * Created by Tim Osadchiy on 15/08/2016.
 */

'use strict';

module.exports = function (grunt) {
    var config = grunt.config.get('environment');

    grunt.config.set('ngtemplates', {
        classroom: {
            options: {
                module: "FourCornersEditor"
            },
            src: config.ngTemplatesFrom,
            dest: config.ngTemplatesTo
        },
    });
};
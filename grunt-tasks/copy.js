/**
 * Created by Tim Osadchiy on 15/08/2016.
 */

'use strict';

module.exports = function (grunt) {

    var config = grunt.config.get('environment');

    grunt.config.set('copy', {
        scripts: {
            src: config.concatJsTo,
            dest: config.buildJsTo
        },
        fonts: {
            expand: true,
            flatten: true,
            src: config.copyFontsFrom,
            dest: config.copyFontsTo
        }
    });
};
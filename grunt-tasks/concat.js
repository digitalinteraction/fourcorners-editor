/**
 * Created by Tim Osadchiy on 29/08/2016.
 */

'use strict';

module.exports = function (grunt) {
    var config = grunt.config.get('environment');

    grunt.config.set('concat', {
        options: {
            separator: ';'
        },
        js: {
            src: [config.browserifyTo, config.ngTemplatesTo],
            dest: config.concatJsTo
        }
    });
};



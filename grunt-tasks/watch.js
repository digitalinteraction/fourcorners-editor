/**
 * Created by Tim Osadchiy on 15/08/2016.
 */

'use strict';

module.exports = function (grunt) {

    var config = grunt.config.get('environment'),
        jsTask = (config.uglifyJs ? 'uglify' : 'copy:scripts');

    grunt.config.set('watch', {
        sass: {
            files: [config.sassWatch],
            tasks: ['sass', 'cssmin'],
            options: {
                debounceDelay: config.watchDebounceDelay
            }
        },
        scripts: {
            files: [config.browserifyTo, config.ngTemplatesTo],
            tasks: ['concat', jsTask],
            options: {
                debounceDelay: config.watchDebounceDelay
            }
        },
        templates: {
            files: [config.ngTemplatesFrom],
            tasks: ['ngtemplates'],
            options: {
                debounceDelay: config.watchDebounceDelay
            }
        }
    });

};
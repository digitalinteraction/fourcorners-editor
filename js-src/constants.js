/**
 * Created by Tim Osadchiy on 10/09/2016.
 */

'use strict';

module.exports = function(app) {
    app.constant('appConstants', {
        SOURCE_TYPES: ['Image', 'YouTube'],
        DATE_FORMAT: 'MMMM d, yyyy'
    });
};

/**
 * Created by Tim Osadchiy on 10/09/2016.
 */

'use strict';

module.exports = function (app) {
    app.constant('appConstants', {
        SOURCE_TYPES: ['Image', 'YouTube','Vimeo'],
        DATE_FORMAT: 'MMMM d, yyyy',
        COPYRIGHT_TYPES: [
            'All rights reserved',
            'Attribution CC BY',
            'Attribution - ShareAlike CC BY - SA',
            'Attribution - NoDerivs CC BY - ND',
            'Attribution - NonCommercial  CC BY - NC',
            'Attribution - NonCommercial - ShareAlike  CC BY - NC - SA',
            'Attribution - NonCommercial - NoDerivs  CC BY - NC - ND'
        ],
        CODES_OF_ETHICS: [
            'Photojournalist',
            'Fine Art Photographer',
            'Fine Art / Journalism',
            'Associated Press',
            'UNICEF',
            'Wildlife Photographer',
            'Fashion Photographer',
            'Sports Photographer'
        ]
    });
};

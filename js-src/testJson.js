/**
 * Created by Tim Osadchiy on 08/09/2016.
 */

'use strict';

module.exports = function() {
    window.testJson = testJson;
};

var testJson = {
    context: [{credit: 'Eddie Adams/AP', src: 'img/1-0.jpg'}, {youtube_id: 'S9Jy3cLmqrE'}],
    links: [{title: 'Alan Kurdi: Why one picture cut through', url: 'http://www.bbc.co.uk/news/world-europe-34150419'}],
    backStory: {
        text: '“On the one hand, I wish I hadn’t had to take that picture. I would have',
        author: 'Nilüfer Demir',
        magazine: 'Vice',
        magazineUrl: 'https://www.vice.com/en_uk/read/nilfer-demir-interview-876',
        date: 'September 4, 2015'
    },
    creativeCommons: {
        copyright: 'Nilüfer Demir/DHA © 2015',
        codeOfEthics: 'While all photography is interpretive, as a photojournalist I consider my',
        description: 'A Turkish officer near the body of Alan Kurdi, a 3-year-old Syrian refugee'
    }
};

var cheerio = require('cheerio');
var modules = {
    quotes: require('./quotes'),
    hyphenate: require('./hyphenate'),
    smallCaps: require('./smallCaps'),
    punctuation: require('./punctuation'),
    hangingPunctuation: require('./hangingPunctuation'),
    spaces: require('./spaces')

};

module.exports = function typeset (html, options) {

    // Create a backup
    var _html = html;

    // Pass the HTML to each module
    for (var i in modules)
        html = modules[i](html, options);

    return html;
}

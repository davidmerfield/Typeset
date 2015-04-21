var cheerio = require('cheerio');
var modules = {
    smartQuotes: require('./smartQuotes'),
    hangingPunctuation: require('./hangingPunctuation')
};

module.exports = function typeset (html, options) {
    
    // Create a backup
    var _html = html;
    
    // Pass the HTML to each module
    for (var i in modules)
        html = modules[i](html, options);

    return html;
}

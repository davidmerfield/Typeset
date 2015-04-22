var eachTextNode = require('./eachTextNode');
var cheerio = require('cheerio');

module.exports = function smallCaps (html, options) {

    html = eachTextNode(html, function(text, node){ 

      return text;
    });

    return html;
}

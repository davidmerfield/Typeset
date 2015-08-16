var eachTextNode = require('./eachTextNode');
var cheerio = require('cheerio');

module.exports = function smallCaps (html, options) {

    html = eachTextNode(html, function(text, node){

      text = text.split(' × ').join('&hairsp;×&hairsp;');

      text = text.split(' / ').join('&hairsp;/&hairsp;');

      return text;
    });

    return html;
}

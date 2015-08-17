var eachTextNode = require('./eachTextNode');
var cheerio = require('cheerio');

module.exports = function smallCaps (html, options) {

    html = eachTextNode(html, function(text, node){

      text = text.split('fi').join('ﬁ');
      text = text.split('fl').join('ﬂ');

      return text;
    });

    return html;
}



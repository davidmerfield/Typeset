var eachTextNode = require('./eachTextNode');
var cheerio = require('cheerio');

module.exports = function smallCaps (html, options) {

    html = eachTextNode(html, function(text, node){ 

      // Smart dashes
      text = text.split('--').join('–');
      text = text.split(' – ').join('&thinsp;&mdash;&thinsp;');
      
      // Smart elipses
      text = text.split('...').join("&hellip;");

      // Smart nbsp for punc with spaces
      var NBSP = '&nbsp;';
      var NBSP_PUNCTUATION_START = /([«¿¡]) /g;
      var NBSP_PUNCTUATION_END = / ([\!\?:;\.,‽»])/g;

      text = text.replace(NBSP_PUNCTUATION_START, '$1' + NBSP)
                 .replace(NBSP_PUNCTUATION_END, NBSP + '$1');

      return text;
    });

    return html;
}

var eachTextNode = require('./eachTextNode');

module.exports = function smallCaps (html, options) {

    html = eachTextNode(html, function(text){

      // Dashes
      text = text.split('--').join('–');
      text = text.split(' – ').join('&thinsp;&mdash;&thinsp;');

      // Elipses
      text = text.split('...').join('…');

      // Nbsp for punc with spaces
      var NBSP = '&nbsp;';
      var NBSP_PUNCTUATION_START = /([«¿¡]) /g;
      var NBSP_PUNCTUATION_END = / ([\!\?:;\.,‽»])/g;

      text = text.replace(NBSP_PUNCTUATION_START, '$1' + NBSP)
                 .replace(NBSP_PUNCTUATION_END, NBSP + '$1');

      return text;
    }, options);

    return html;
};
var eachTextNode = require('./eachTextNode');
var cheerio = require('cheerio');

module.exports = function smallCaps (html, options) {


    var hangMe = ['&quot;', '"', "“", "„", "”", "&ldquo;", "&OpenCurlyDoubleQuote;", "&#8220;", "&#x0201C;", "&rdquor;", "&rdquo;", '&CloseCurlyDoubleQuote;', '&#8221;', '&ldquor;', '&bdquo;', '&#8222;'];

    var alignMe = "CcOoYTAVvWwY".split('');

    html = eachTextNode(html, function(text, node){

      // Remove consecutive double spaces then create
      // array of distinct words.
      var words = text.split(' ').join(' ').split(' ');

      for (var i in words) {

        for (var j in alignMe) {

          var align = alignMe[j];

          if (words[i].slice(0,align.length) === align) {
            words[i] = '<aria class="hang-' + align +'">' + align + '</aria>' + words[i].slice(align.length);

            if (words[(i-1)]) {
                words[(i-1)] = words[(i-1)] + '<span class="space-' + align +'"></span>';
            }
          }
        }

        for (var j in hangMe) {

          var punctuation = hangMe[j];

          if (words[i].slice(0,punctuation.length) === punctuation) {

              words[i] = '<aria class="hang-me">' + punctuation + '</aria>' + words[i].slice(punctuation.length);

              if (words[(i-1)]) {
                  words[(i-1)] = words[(i-1)] + '<span class="space-me"></span>';
              }
          }
        }
      }

      text = words.join(' ');

      return text;
    });

    return html;
}

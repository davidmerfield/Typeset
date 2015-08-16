var eachTextNode = require('./eachTextNode');
var cheerio = require('cheerio');

module.exports = function smallCaps (html, options) {


    var doubleWidth = ['&quot;', '"', "“", "„", "”", "&ldquo;", "&OpenCurlyDoubleQuote;", "&#8220;", "&#x0201C;", "&rdquor;", "&rdquo;", '&CloseCurlyDoubleQuote;', '&#8221;', '&ldquor;', '&bdquo;', '&#8222;'];
    var singleWidth = ["'", '&prime;', '&apos;', '&lsquo;', '&rsquo;', '‘', '’'];

    var alignMe = "CcOoYTAVvWwY".split('');

    html = eachTextNode(html, function(text, node){

      // Remove consecutive double spaces then create
      // array of distinct words.
      var words = text.split(' ').join(' ').split(' ');

      for (var i in words) {

        for (var j in alignMe) {

          var align = alignMe[j];

          if (words[i].slice(0,align.length) === align) {
            words[i] = '<span class="hang-' + align +'">' + align + '</span>' + words[i].slice(align.length);

            if (words[(i-1)]) {
                words[(i-1)] = words[(i-1)] + '<span class="space-' + align +'"></span>';
            }
          }
        }

        for (var j in singleWidth) {

          var punctuation = singleWidth[j];

          if (words[i].slice(0,punctuation.length) === punctuation) {

              words[i] = '<span class="hang-single">' + punctuation + '</span>' + words[i].slice(punctuation.length);

              if (words[(i-1)]) {
                  words[(i-1)] = words[(i-1)] + '<span class="space-single"></span>';
              }
          }
        }

        for (var j in doubleWidth) {

          var punctuation = doubleWidth[j];

          if (words[i].slice(0,punctuation.length) === punctuation) {

              words[i] = '<span class="hang-double">' + punctuation + '</span>' + words[i].slice(punctuation.length);

              if (words[(i-1)]) {
                  words[(i-1)] = words[(i-1)] + '<span class="space-double"></span>';
              }
          }
        }
      }

      text = words.join(' ');

      return text;
    });

    return html;
}

var eachTextNode = require('./eachTextNode');
var cheerio = require('cheerio');

module.exports = function smallCaps (html, options) {


    var hangMe = ['&quot;', '"', "“", "„", "”", "&ldquo;", "&OpenCurlyDoubleQuote;", "&#8220;", "&#x0201C;", "&rdquor;", "&rdquo;", '&CloseCurlyDoubleQuote;', '&#8221;', '&ldquor;', '&bdquo;', '&#8222;'];
    
    html = eachTextNode(html, function(text, node){ 

      // Remove consecutive double spaces then create
      // array of distinct words.
      var words = text.split(' ').join(' ').split(' ');

      for (var i in words) {

        for (var j in hangMe) {
          
          var punctuation = hangMe[j];

          if (words[i].slice(0,punctuation.length) === punctuation) {
              
              words[i] = '<span class="hang-me">' + punctuation + '</span>' + words[i].slice(punctuation.length);

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

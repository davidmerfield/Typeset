var eachTextNode = require('./eachTextNode');

module.exports = function smallCaps (html, options) {

  function pull (className, content) {
    return '<span class="pull-' + className +'">' + (content || '') + '</span>';
  }

  function push (className, content) {
    return '<span class="push-' + className +'">' + (content || '') + '</span>';
  }

    var doubleWidth = ['&quot;', '"', "“", "„", "”", "&ldquo;", "&OpenCurlyDoubleQuote;", "&#8220;", "&#x0201C;", "&rdquor;", "&rdquo;", '&CloseCurlyDoubleQuote;', '&#8221;', '&ldquor;', '&bdquo;', '&#8222;'];
    var singleWidth = ["'", '&prime;', '&apos;', '&lsquo;', '&rsquo;', '‘', '’'];

    var alignMe = "CcOoYTAVvWwY".split('');

    html = eachTextNode(html, function(text){

      if (text.length < 2) return text;

      // Remove consecutive double spaces then create
      // array of distinct words.
      var words = text.split(' ').join(' ').split(' ');

      for (var i in words) {

        for (var a in alignMe) {

          var align = alignMe[a];

          if (words[i].slice(0,align.length) === align) {
            words[i] = pull(align, align) + words[i].slice(align.length);

            if (words[(i-1)]) {
                words[(i-1)] = words[(i-1)] + push(align);
            }
          }
        }

        for (var b in singleWidth) {

          var punctuation = singleWidth[b];

          if (words[i].slice(0,punctuation.length) === punctuation) {

              words[i] = pull('single', punctuation) + words[i].slice(punctuation.length);

              if (words[(i-1)]) {
                  words[(i-1)] = words[(i-1)] + push('single');
              }
          }
        }

        for (var c in doubleWidth) {

          var punctuation = doubleWidth[c];

          if (words[i].slice(0,punctuation.length) === punctuation) {

              words[i] = pull('double', punctuation) + words[i].slice(punctuation.length);

              if (words[(i-1)]) {
                  words[(i-1)] = words[(i-1)] + push('double');
              }
          }
        }
      }

      text = words.join(' ');

      return text;

    }, options);

    return html;
};
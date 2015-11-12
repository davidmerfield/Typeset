var $ = require('cheerio');

function isBrowser() {
  try {
    return IS_BROWSER === true;
  } catch(e) {
    return false;
  }
}

// An easy way to apply a function to each text node
// doThis accepts a text string of a text node's content
// and returns the modified string.

var IGNORE = 'head, code, pre, script, style, [class^="pull-"], [class^="push-"], .small-caps';

module.exports = function(html, doThis, options){
  var $processedText;
  var ignore = IGNORE;
  var only = (isBrowser() && html) || (options && options.only) || ':root';

  if (options && options.ignore) ignore += ', ' + options.ignore;

  $ = (isBrowser() && $) || $.load(html, {decodeEntities: false});


  var TEXT_NODE = (isBrowser() && window.Node.TEXT_NODE) || 3;

  function findTextNodes(node) {
    return $(node)
      .contents()
      .filter(function(){
        return !$(this).is(ignore);
      })
      .each(function(){
        // We've made it to a text node!
        // apply the function which transforms
        // its text content (childNode.data)
        if (this.nodeType === TEXT_NODE) {
          this.data = doThis(this.data);
        } else {
          findTextNodes(this);
        }
      });
  }

  $processedText = $(only).each(function(){ return findTextNodes(this);});

  function getProcessedText() {
    function decodeEntities(str) {
      return String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot/g, '"');
    }

    var text = '';

    $processedText.each(function () {
      text += this.outerHTML;
    });

    return decodeEntities(text);
  }

  return isBrowser() ? getProcessedText() : $.html();
};

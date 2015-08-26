var ENV = ENV || undefined;
var cheerio, jquery;

if (ENV && ENV.browser) {
  jquery = require('jquery');
} else {
  cheerio = require('cheerio');
}

// An easy way to apply a function to each text node
// doThis accepts a text string of a text node's content
// and returns the modified string.

var IGNORE = 'head, code, pre, script, style, [class^="pull-"], [class^="push-"], .small-caps';

module.exports = function(html, doThis, options){
  var ignore = IGNORE;
  var only = (jquery && html) || (options && options.only) || ':root';

  if (options && options.ignore) ignore += ', ' + options.ignore;

  var $ = jquery || cheerio.load(html, {decodeEntities: false});

  var processedText = $(only).each(function(){findTextNodes(this);});

  function findTextNodes(node) {

    if ($(node).is(ignore)) return false;

    $(node).contents().each(function(){

      var childNode = $(this)[0];

      // We've made it to a text node!
      // apply the function which transforms
      // its text content (childNode.data)
      if (childNode.type === 'text' || !childNode.type) {
        childNode.data = doThis(childNode.data, childNode);
      } else {
        findTextNodes(childNode, doThis);
      }
    });

  }

  return (jquery && processedText[0]) || $.html();
};

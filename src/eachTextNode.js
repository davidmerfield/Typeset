var cheerio, jquery;

if (typeof ENV !== 'undefined' && ENV.browser) {
  jquery = window.jQuery;
} else {
  cheerio = require('cheerio');
}

var eachChildNode, replaceNode, defaultFilter;

if (cheerio || jquery) {
  eachChildNode = function(node, fn, $) {
    $(node).contents().each(function() { fn(this); });
  };
  replaceNode = function(parentNode, node, html, $) {
    $(node).replaceWith(html);
  };
  defaultFilter = function(node, selector, $) {
    return $(node).is(selector);
  };
} else {
  eachChildNode = function(node, fn) {
    node.normalize();
    var i = node.childNodes.length - 1;
    while (i >= 0) {
      fn(node.childNodes[i]);
      i--;
    }
  };
  replaceNode = function(parentNode, node, html) {
    var prevNode = node.previousSibling;
    if (prevNode) {
      prevNode.insertAdjacentHTML('afterend', html);
    } else {
      parentNode.insertAdjacentHTML('afterbegin', html);
    }
    parentNode.removeChild(node);
  };
  defaultFilter = function(node, selector) {
    return node.matches(selector);
  };
}

function escape(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// An easy way to apply a function to each text node
// doThis accepts a text string of a text node's content
// and returns the modified string.

var IGNORE = 'head, code, pre, script, style, [class^="pull-"], [class^="push-"], .small-caps';

module.exports = function(obj, doThis, options) {
  var ignore = IGNORE;
  var filter = defaultFilter;
  if (options.ignore) {
    if (typeof options.ignore === 'string') {
      ignore += ', ' + options.ignore;
    } else {
      filter = options.ignore;
    }
  }

  var nodes, $;
  if (cheerio) {
    $ = cheerio.load(obj, {decodeEntities: false});
    nodes = $(options.only || ':root');
  } else if (jquery) {
    $ = jquery;
    nodes = $(obj);
  } else {
    nodes = [obj];
  }

  for (var i = 0; i < nodes.length; i++) {
    walkTextNodes(nodes[i]);
  }

  return cheerio ? $.html() : jquery ? nodes : nodes[0];

  function walkTextNodes(node) {
    if (filter(node, ignore, $)) return false;

    eachChildNode(node, function(childNode){
      // We've made it to a text node!
      // apply the function which transforms
      // its text content (childNode.data)
      if (childNode.nodeType === 3) {
        var text = cheerio ? childNode.data : escape(childNode.data);
        replaceNode(node, childNode, doThis(text, childNode), $);
      } else {
        walkTextNodes(childNode, doThis);
      }
    }, $);
  }
};

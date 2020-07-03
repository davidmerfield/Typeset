let cheerio;
let jquery;
let escape;

if (typeof ENV !== "undefined" && ENV.browser) {
  jquery = require("jquery");
  escape = (text) =>
    text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
} else {
  cheerio = require("cheerio");
}

// An easy way to apply a function to each text node
// doThis accepts a text string of a text node's content
// and returns the modified string.

const IGNORE =
  'head, code, pre, script, style, [class^="pull-"], [class^="push-"], .small-caps';

module.exports = (html, doThis, options) => {
  let ignore = IGNORE;
  const only = (jquery && html) || (options && options.only) || ":root";

  if (options && options.ignore) ignore += ", " + options.ignore;

  const $ =
    jquery ||
    cheerio.load(html, {
      decodeEntities: false,
    });

  const processedText = $(only).each(function () {
    findTextNodes(this);
  });

  function findTextNodes(node) {
    if ($(node).is(ignore)) return false;

    $(node)
      .contents()
      .each(function () {
        const childNode = this;

        if (childNode.nodeType === 3) {
          let text = escape ? escape(childNode.data) : childNode.data;

          text = text.replace(/&#39;/g, "'");
          text = text.replace(/&quot;/g, '"');

          childNode.data = text;

          $(childNode).replaceWith(doThis(text, childNode, $));
        } else {
          findTextNodes(childNode);
        }
      });
  }

  return (jquery && processedText[0]) || $.html();
};

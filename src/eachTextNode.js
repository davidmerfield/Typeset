// Import necessary libraries based on the environment
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

// Define selectors to ignore by default
const DEFAULT_IGNORE_SELECTORS =
  'head, code, pre, script, style, img, br, hr, [class^="pull-"], [class^="push-"], .small-caps';

// Main function to process HTML and apply modifications
module.exports = (html, doThis, options) => {
  let ignore = DEFAULT_IGNORE_SELECTORS;
  const only = (jquery && html) || (options && options.only) || ":root";

  if (options && options.ignore) ignore += ", " + options.ignore;

  // Load the appropriate library (cheerio or jquery)
  const $ =
    jquery ||
    cheerio.load(html, {
      decodeEntities: false,
    });

  // Apply the specified function to each text node
  const processedText = $(only).each(function () {
    findTextNodes(this);
  });

  // Recursive function to find and process text nodes
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

  // Return the modified HTML
  return (jquery && processedText[0]) || $.html();
};

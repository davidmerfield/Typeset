const modules = {
  quotes: require("./quotes"),
  hyphenate: require("./hyphenate"),
  ligatures: require("./ligatures"),
  smallCaps: require("./smallCaps"),
  punctuation: require("./punctuation"),
  hangingPunctuation: require("./hangingPunctuation"),
  spaces: require("./spaces"),
};

const eachTextNode = require("./eachTextNode");

module.exports = (html, options = {}) => {
  for (const i in modules) {
    // Check against enable list
    if (options.enable && !options.enable.includes(i)) continue;

    // Check against disable list
    if (options.disable && options.disable.includes(i)) continue;

    // Pass the HTML to each module
    html = eachTextNode(html, modules[i], options);
  }

  return html;
};

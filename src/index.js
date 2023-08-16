const modules = {
  quotes: require("./quotes"),
  hyphenate: require("./hyphenate"),
  ligatures: require("./ligatures"),
  smallCaps: require("./smallCaps"),
  punctuation: require("./punctuation"),
  hangingPunctuation: require("./hangingPunctuation"),
  spaces: require("./spaces"),
};

const applyModuleToText = require("./eachTextNode");

module.exports = (html, options = {}) => {
  for (const moduleName in modules) {
    const currentModule = modules[moduleName];

    // Check if the module should be enabled based on options
    if (options.enable && !options.enable.includes(moduleName)) {
      continue;
    }

    // Check if the module should be disabled based on options
    if (options.disable && options.disable.includes(moduleName)) {
      continue;
    }

    // Apply the module to the HTML
    html = applyModuleToText(html, currentModule, options);
  }

  return html;
};

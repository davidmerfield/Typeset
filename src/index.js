var modules = {
  quotes: require('./quotes'),
  hyphenate: require('./hyphenate'),
  ligatures: require('./ligatures'),
  smallCaps: require('./smallCaps'),
  punctuation: require('./punctuation'),
  hangingPunctuation: require('./hangingPunctuation'),
  spaces: require('./spaces')
};

var eachTextNode = require('./eachTextNode');

module.exports = function(html, options){

  options = options || {};

  // Pass the HTML to each module
  for (var i in modules)
    html = eachTextNode(html, modules[i], options);

  return html;
};

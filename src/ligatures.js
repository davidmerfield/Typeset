var eachTextNode = require('./eachTextNode');

module.exports = function(html, options){

  html = eachTextNode(html, function(text){

    text = text.replace(/fi/g, 'ﬁ');
    text = text.replace(/fl/g, 'ﬂ');

    return text;
  }, options);

  return html;
};

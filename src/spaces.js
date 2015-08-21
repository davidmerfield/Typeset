var eachTextNode = require('./eachTextNode');

module.exports = function(html, options){

  html = eachTextNode(html, function(text){

    // replaces wide spaces with hair spaces
    text = text.replace(/ × /g, ' × ');
    text = text.replace(/ \/ /g, ' / ');

    return text;
  }, options);

  return html;
};

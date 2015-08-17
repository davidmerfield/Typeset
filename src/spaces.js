var eachTextNode = require('./eachTextNode');

module.exports = function smallCaps (html, options) {

    html = eachTextNode(html, function(text){

      // replaces wide spaces with hair spaces
      text = text.split(' × ').join(' × ');
      text = text.split(' / ').join(' / ');

      return text;
    }, options);

    return html;
};
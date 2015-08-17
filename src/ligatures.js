var eachTextNode = require('./eachTextNode');

module.exports = function smallCaps (html, options) {

    html = eachTextNode(html, function(text){

      text = text.split('fi').join('ﬁ');
      text = text.split('fl').join('ﬂ');

      return text;
    }, options);

    return html;
};
var eachTextNode = require('./eachTextNode');

// User auto language detection if no option
// specified https://github.com/richtr/guessLanguage.js

var Hypher = require('hypher'),
    english = require('./hypher-patterns/en-us'),
    h = new Hypher(english);

module.exports = function smallCaps (html, options) {

    html = eachTextNode(html, function(text){
        return h.hyphenateText(text);
    }, options);

    return html;
};
var modules = {
    quotes: require('./quotes'),
    hyphenate: require('./hyphenate'),
    ligatures: require('./ligatures'),
    smallCaps: require('./smallCaps'),
    punctuation: require('./punctuation'),
    hangingPunctuation: require('./hangingPunctuation'),
    spaces: require('./spaces')
};

module.exports = function typeset (html, options) {

    options = options || {};

    // Pass the HTML to each module
    for (var i in modules)
        html = modules[i](html, options);

    return html;
};
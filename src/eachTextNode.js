var cheerio = require('cheerio');

// An easy way to apply a function to each text node
// doThis accepts a text string of a text node's content
// and returns the modified string.

var IGNORE = 'head, code, pre, script, style, .ts-ignore';

module.exports = function forEachTextNode (html, doThis) {

    var $ = cheerio.load(html, {decodeEntities: false});

    $(":root").each(function(){

        findTextNodes(this);

        function findTextNodes(node) {

            if ($(node).is(IGNORE)) return false;

            if (IGNORE.indexOf() > -1) return false;

            $(node).contents().each(function(){

                var childNode = $(this)[0];

                // We've made it to a text node!
                // apply the function which transforms
                // its text content (childNode.data)
                if (childNode.type === 'text') {
                    childNode.data = doThis(childNode.data, childNode);
                } else {
                    findTextNodes(childNode, doThis);
                }
            });

        }

    });

    return $.html();
}

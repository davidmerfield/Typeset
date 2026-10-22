// For each parent paragraph we compute the substituted text once, along with
// the offset of each child node, rather than once per text node (which is
// quadratic for a long paragraph full of inline tags). Keyed by parent node, so
// the cache lives only as long as the parsed document of one typeset call.
const cache = new WeakMap();

// eachTextNode decodes these entities in a text node just before handing it to
// us, so we do the same when measuring the text of its siblings.
function decode(text) {
  return text.replace(/&#39;/g, "'").replace(/&quot;/g, '"');
}

function lookup(node, $) {
  const parent = $(node).parent();
  const key = parent[0];
  let entry = cache.get(key);

  // In the browser the parent is a live DOM node, so it outlives one typeset
  // call. A text node that isn't in the cached offsets means the paragraph was
  // processed (and its text nodes replaced) by an earlier call: rebuild.
  if (!entry || !entry.offsets.has(node)) {
    const offsets = new Map();
    let start = 0;

    parent.contents().each(function () {
      offsets.set(this, start);
      start += decode($(this).text()).length;
    });

    entry = { text: decode(parent.text()), offsets, replaced: null };
    cache.set(key, entry);
  }

  return entry;
}

module.exports = (text, node, $) => {
  if ($(node).parent().is("p, blockquote")) {
    const entry = lookup(node, $);

    if (entry.text !== text) {
      if (entry.replaced === null) entry.replaced = replace(entry.text);

      const start = entry.offsets.get(node);

      return entry.replaced.slice(start, start + text.length);
    }
  }

  return replace(text);
};

function replace(text) {
  text = text
    .replace(/(\W|^)"([^\s\!\?:;\.,‽»])/g, "$1\u201c$2") // beginning "
    .replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, "$1\u201d$2") // ending "
    .replace(/([^0-9])"/g, "$1\u201d") // remaining " at end of word
    .replace(/(\W|^)'(\S)/g, "$1\u2018$2") // beginning '
    .replace(/([a-z])'([a-z])/gi, "$1\u2019$2") // conjunction's possession
    .replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/gi, "$1\u2019$3") // ending '
    .replace(
      /(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/gi,
      "\u2019$2$3"
    ) // abbrev. years like '93
    .replace(
      /(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/gi,
      "$1\u2019"
    ) // backwards apostrophe
    .replace(/'''/g, "\u2034") // triple prime
    .replace(/("|'')/g, "\u2033") // double prime
    .replace(/'/g, "\u2032");

  // Allow escaped quotes
  text = text
    .replace(/\\“/g, '"')
    .replace(/\\”/g, '"')
    .replace(/\\’/g, "'")
    .replace(/\\‘/g, "'");

  return text;
}

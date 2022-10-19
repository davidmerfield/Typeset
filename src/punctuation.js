module.exports = (text) => {

  // M Dash
  // https://en.wikipedia.org/wiki/Dash
  text = text.replace(/--/g, "–");
  text = text.replace(/ – /g, "&thinsp;&mdash;&thinsp;");

  // Ellipsis
  // https://en.wikipedia.org/wiki/Ellipsis
  text = text.replace(/\.\.\./g, "&hellip;");

  // Non-breaking space
  // https://en.wikipedia.org/wiki/Non-breaking_space
  const NBSP = "&nbsp;";
  const NBSP_PUNCTUATION_START = /([«¿¡]) /g;
  const NBSP_PUNCTUATION_END = / ([\!\?:;\.,‽»])/g;

  text = text.replace(NBSP_PUNCTUATION_START, "$1" + NBSP);
  text = text.replace(NBSP_PUNCTUATION_END, NBSP + "$1");

  return text;
};

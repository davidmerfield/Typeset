module.exports = text => {
  // Dashes
  text = text.replace(/--/g, "–");
  text = text.replace(/ – /g, "&thinsp;&mdash;&thinsp;");

  // Elipses
  text = text.replace(/\.\.\./g, "…");

  // Nbsp for punc with spaces
  const NBSP = "&nbsp;";
  const NBSP_PUNCTUATION_START = /([«¿¡]) /g;
  const NBSP_PUNCTUATION_END = / ([\!\?:;\.,‽»])/g;

  text = text.replace(NBSP_PUNCTUATION_START, "$1" + NBSP);
  text = text.replace(NBSP_PUNCTUATION_END, NBSP + "$1");

  return text;
};

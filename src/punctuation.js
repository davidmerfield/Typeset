module.exports = (text) => {

  // N Dash
  // https://en.wikipedia.org/wiki/Dash#En_dash
  // This is before M Dash because we want to handle number ranges as a special case before the more general fixes below.
  text = text.replace(/(\d+)\s?-\s?(\d+)/g, "$1&thinsp;&ndash;&thinsp;$2");
  text = text.replace(/(\d+)\s?–\s?(\d+)/g, "$1&thinsp;&ndash;&thinsp;$2");
  text = text.replace(/(\d+)\s?&mdash;\s?(\d+)/g, "$1&thinsp;&ndash;&thinsp;$2");

  // M Dash
  // https://en.wikipedia.org/wiki/Dash#Em_dash
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

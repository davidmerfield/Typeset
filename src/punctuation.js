module.exports = (text) => {
  // M Dash (En Dash and Em Dash)
  text = text.replace(/--/g, "–"); // En Dash or Em Dash
  text = text.replace(/ – /g, "&thinsp;&mdash;&thinsp;"); // En Dash surrounded by thin spaces

  // Ellipsis
  text = text.replace(/\.\.\./g, "&hellip;"); // Ellipsis

  // Non-breaking space around punctuation
  const NBSP = "&nbsp;";
  const NBSP_PUNCTUATION_START = /([«¿¡]) /g; // Space after specific punctuation
  const NBSP_PUNCTUATION_END = / ([\!\?:;\.,‽»])/g; // Space before specific punctuation

  text = text.replace(NBSP_PUNCTUATION_START, "$1" + NBSP); // Add non-breaking space after specific punctuation
  text = text.replace(NBSP_PUNCTUATION_END, NBSP + "$1"); // Add non-breaking space before specific punctuation

  return text;
};

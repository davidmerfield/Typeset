// User auto language detection if no option
// specified https://github.com/richtr/guessLanguage.js
const Hypher = require("hypher");
const english = require("./hypher-patterns/en-us");
const h = new Hypher(english);

module.exports = (text) => {
  const words = text.split(" ");

  for (const i in words) {
    const word = words[i];

    if (word.slice(0, 1).toUpperCase() === word.slice(0, 1)) continue;
    words[i] = h.hyphenateText(word);
  }

  return words.join(" ");
};

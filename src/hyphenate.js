// User auto language detection if no option
// specified https://github.com/richtr/guessLanguage.js
const Hypher = require("hypher");
const englishHyphenationPatterns = require("./hypher-patterns/en-us"); // Assuming this is the correct path
const hypher = new Hypher(englishHyphenationPatterns);

// Hyphenates non-capitalized words in a text
module.exports = (text) => {
  const words = text.split(" ");

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // Skip words that start with an uppercase letter
    if (word.charAt(0).toUpperCase() === word.charAt(0)) {
      continue;
    }

    words[i] = hypher.hyphenateText(word);
  }

  return words.join(" ");
};

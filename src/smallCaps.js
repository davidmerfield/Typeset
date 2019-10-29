const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();

// Only numbers regex
const onlyNumbers = new RegExp("^\\d+$");

// Ensure the word has a length of more than 2 letters,
// does not contain punctation since exterior punctuation
// has been stripped by this point. If so, then see if the
// uppercase version of the word is indentical, if so it's
// very probably an acronym
function isAcronym(word) {
  return (
    word.length &&
    word.trim().length > 1 &&
    !onlyNumbers.test(
      word.replace(/[\.,-\/#!–$%°\^&\*;?:+′|@\[\]{}=\-_`~()]/g, "")
    ) &&
    word.replace(/[\.,-\/#!$%\^&\*;–?:+|@\[\]{}=\-_`~(′°)]/g, "") === word &&
    word.toUpperCase() === word
  );
}

function removeCruft(word) {
  let ignore = "{}()-‘’[]!#$*&;:,.“”″′‘’\"'"
    .split("")
    .concat(["&quot;", "'s", "’s", "&#39;s"]);
  const encodedIgnore = ignore.slice(0);

  for (const x in encodedIgnore)
    encodedIgnore[x] = entities.encode(encodedIgnore[x]);

  ignore = ignore.concat(encodedIgnore);

  let trailing = "";
  let leading = "";

  for (let i = 0; i < ignore.length; i++) {
    var ignoreThis = ignore[i];
    const endOfWord = word.slice(-ignoreThis.length);

    if (endOfWord === ignoreThis) {
      trailing = ignoreThis + trailing;
      word = word.slice(0, -ignoreThis.length);
      i = 0;
      continue;
    }
  }

  for (let j = 0; j < ignore.length; j++) {
    var ignoreThat = ignore[j];
    const startOfWord = word.slice(0, ignoreThat.length);

    if (startOfWord === ignoreThat) {
      leading += ignoreThat;
      word = word.slice(ignoreThat.length);
      j = 0;
      continue;
    }
  }

  return [leading, word, trailing];
}

module.exports = text => {
  const wordList = text.split(" ");

  for (const i in wordList) {
    const brokenWord = removeCruft(wordList[i]);
    const word = brokenWord[1];
    const leading = brokenWord[0];
    const trailing = brokenWord[2];

    if (isAcronym(word)) {
      wordList[i] =
        leading + '<span class="small-caps">' + word + "</span>" + trailing;
    }
  }

  return wordList.join(" ");
};

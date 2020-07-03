module.exports = (text) => {
  // Replaces wide spaces with hair spaces
  text = text.replace(/ × /g, " × ");
  text = text.replace(/ \/ /g, " / ");

  return text;
};

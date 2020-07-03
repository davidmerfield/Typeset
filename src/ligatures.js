module.exports = (text) => {
  text = text.replace(/fi/g, "ﬁ");
  text = text.replace(/fl/g, "ﬂ");

  return text;
};

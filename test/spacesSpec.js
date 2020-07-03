"use strict";

const typeset = require("../src/index");
const expect = require("chai").expect;

function spaces(html) {
  return typeset(html, {
    enable: ["spaces"],
  });
}

describe("Spaces", () => {
  it("text without wide spaces symbols should be the same after call the function", () => {
    const html = "<p>En un lugar de la mancha</p>";
    expect(spaces(html)).to.equal("<p>En un lugar de la mancha</p>");
  });

  it("should replace wide spaces with hair spaces", () => {
    const html = "<p> 4 × 4 = 16 </p>";
    expect(spaces(html)).to.equal("<p> 4 × 4 = 16 </p>");
  });

  it("should replace multiple wide spaces with hair spaces", () => {
    const html = "<p> 4 × 4 = 16; 10 / 2 = 5;</p>";
    expect(spaces(html)).to.equal("<p> 4 × 4 = 16; 10 / 2 = 5;</p>");
  });
});

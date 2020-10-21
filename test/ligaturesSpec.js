const typeset = require("../src/index");
const expect = require("chai").expect;

function lig(html) {
  return typeset(html, {
    enable: ["ligatures"],
  });
}

describe("Ligatures", () => {
  it("text without ligatures should be the same after call the function", () => {
    const html = "<p>En un lugar de la mancha</p>";
    expect(lig(html)).to.equal("<p>En un lugar de la mancha</p>");
  });

  it("should replace (fi) by (ﬁ)", () => {
    const html =
      "<p>A file folder (US usage) (or folder in British and Australian usage) is a kind of folder that holds loose papers</p>";
    expect(lig(html)).to.equal(
      "<p>A ﬁle folder (US usage) (or folder in British and Australian usage) is a kind of folder that holds loose papers</p>"
    );
  });

  it("should replace (fl) by (ﬂ)", () => {
    const html =
      "<p>fluency is a speech language pathology term that means the smoothness or flow with which sounds</p>";
    expect(lig(html)).to.equal(
      "<p>ﬂuency is a speech language pathology term that means the smoothness or ﬂow with which sounds</p>"
    );
  });
});

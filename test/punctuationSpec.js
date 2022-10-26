const typeset = require("../src/index");
const expect = require("chai").expect;

function punc(html) {
  return typeset(html, {
    enable: ["punctuation"],
  });
}

describe("Punctuation", () => {
  it("text without punctuation symbols should be the same after call the function", () => {
    const html = "<p>En un lugar de la mancha</p>";
    expect(punc(html)).to.equal("<p>En un lugar de la mancha</p>");
  });

  it("should replace three dots by ellipsis symbol", () => {
    const html = "<p>En un lugar de la mancha...</p>";
    expect(punc(html)).to.equal("<p>En un lugar de la mancha&hellip;</p>");
  });

  it("should replace three dots by ellipsis symbol on texts with multiple matches", () => {
    const html =
      "<p>En un lugar de la mancha... De cuyo nombre no quiero acordarme... no ha mucho tiempo que vivía...</p>";
    expect(punc(html)).to.equal(
      "<p>En un lugar de la mancha&hellip; De cuyo nombre no quiero acordarme&hellip; no ha mucho tiempo que vivía&hellip;</p>"
    );
  });

  it("should replace two dashes (--) by a dash (–)", () => {
    const html =
      "<p>Pues aquí hay algo que no te va a gustar Laura, --dijo Carlos-- yo también voy al equipo de Juan.</p>";
    expect(punc(html)).to.equal(
      "<p>Pues aquí hay algo que no te va a gustar Laura, –dijo Carlos– yo también voy al equipo de Juan.</p>"
    );
  });

  it("should replace a dash between spaces ( – ) by (&thinsp;&mdash;&thinsp;)", () => {
    const html =
      '<p>Traveling – that is, traveling by public transit – can be a relaxing activity if you bring music and reading material along with you.</p>';
    expect(punc(html)).to.equal(
      '<p>Traveling&thinsp;&mdash;&thinsp;that is, traveling by public transit&thinsp;&mdash;&thinsp;can be a relaxing activity if you bring music and reading material along with you.</p>'
    );
  });

  it("should replace a dash between numbers (10-20 or 10 - 20) by (&thinsp;&ndash;&thinsp;)", () => {
    const html =
      '<p>Students spend 1-2 hours per night reading. By Monday, they should have read pages 79 - 113.</p>';
    expect(punc(html)).to.equal(
      '<p>Students spend 1&thinsp;&ndash;&thinsp;2 hours per night reading. By Monday, they should have read pages 79&thinsp;&ndash;&thinsp;113.</p>'
    );
  });
});

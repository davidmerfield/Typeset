const typeset = require("../src/index");
const expect = require("chai").expect;

function quotes(html) {
  return typeset(html, {
    enable: ["quotes"],
  });
}

describe("Quotes", () => {
  it("text without quotes symbols should be the same after call the function", () => {
    const html = "<p>En un lugar de la mancha</p>";
    expect(quotes(html)).to.equal("<p>En un lugar de la mancha</p>");
  });

  it("should replace quotes by unicode beginning and ending quotes characters", () => {
    const html = '<p>"Hello," said the fox.</p>';
    expect(quotes(html)).to.equal("<p>“Hello,” said the fox.</p>");
  });

  // check if the issue [#10](http://github.com/davidmerfield/Typeset/issues/10) still fixed
  it("should replace quotes when a punctuation character is after ending quote character", () => {
    const html = '<p>"Hello,". said the fox.</p>';
    expect(quotes(html)).to.equal("<p>“Hello,”. said the fox.</p>");
  });

  it("should replace multiple quotations", () => {
    const html = '<p>"Hello,". said the "fox".</p>';
    expect(quotes(html)).to.equal("<p>“Hello,”. said the “fox”.</p>");
  });

  it("should work with encoded single quotes", () => {
    const html = "<p>I don&#39;t <em>nee&#39;d</em> to <em>d&#39;o</em>.</p>";
    expect(quotes(html)).to.equal("<p>I don’t <em>nee’d</em> to <em>d’o</em>.</p>");
  });

  it("should work with encoded double quotes", () => {
    const html =
      "<p>&quot;I don't &quot;<em>need</em>&quot; to &quot;<em>do</em>&quot; that.&quot;</p>";
    expect(quotes(html)).to.equal("<p>“I don’t “<em>need</em>” to “<em>do</em>” that.”</p>");
  });

  it("multiple differents kinds quotations marks", () => {
    const html = '<p>"She\'s faster than a 120\' 4" whale." </p>';
    expect(quotes(html)).to.equal("<p>“She’s faster than a 120′ 4″ whale.” </p>");
  });

  it("should use the whole paragraph as context across inline tags", () => {
    expect(quotes('<p>He said "see <a href="x">this</a> and <em>that</em>" today.</p>')).to.equal(
      '<p>He said “see <a href="x">this</a> and <em>that</em>” today.</p>'
    );
    expect(quotes('<p>Class of <a href="x">\'93</a> was 5\'10" tall.</p>')).to.equal(
      '<p>Class of <a href="x">’93</a> was 5′10″ tall.</p>'
    );
  });

  it("should handle one very large paragraph with many inline tags quickly", function () {
    this.timeout(2000);

    let inner = "";
    while (inner.length < 40 * 1024)
      inner += 'He said "see <a href="http://x.com/' + inner.length + '">this link</a> and <em>that</em>" it\'s the \'93 <span>thing</span> <br>';

    const start = Date.now();
    const result = quotes("<p>" + inner + "</p>");
    const elapsed = Date.now() - start;

    expect(result).to.contain("He said “see <a");
    expect(result).to.contain("</em>” it’s the ’93 ");
    expect(result).to.not.contain('"see');
    // quadratic behaviour took seconds at this size
    expect(elapsed).to.be.below(500);
  });
});

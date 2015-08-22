var quotes = require('../src/quotes');

var expect = require('chai').expect;

describe('Quotes', function() {

  it('text without quotes symbols should be the same after call the function', function() {
    var html = '<p>En un lugar de la mancha</p>';
    expect(quotes(html)).to.equal('<p>En un lugar de la mancha</p>');
  });

  it('should replace quotes by unicode beginning and ending quotes characters', function() {
    var html = '<p>"Hello," said the fox.</p>';
    expect(quotes(html)).to.equal('<p>“Hello,” said the fox.</p>');
  });

  // check if the issue [#10](http://github.com/davidmerfield/Typeset/issues/10) still fixed
  it('should replace quotes when a punctuation character is after ending quote character', function() {
    var html = '<p>"Hello,". said the fox.</p>';
    expect(quotes(html)).to.equal('<p>“Hello,”. said the fox.</p>');
  });

  it('should replace multiple quotations', function() {
    var html = '<p>"Hello,". said the "fox".</p>';
    expect(quotes(html)).to.equal('<p>“Hello,”. said the “fox”.</p>');
  });

  it('multiple differents kinds quotations marks', function() {
    var html = '<p>"She\'s faster than a 120\' 4" whale." </p>';
    expect(quotes(html)).to.equal('<p>“She’s faster than a 120′ 4″ whale.” </p>');
  });

});

var fs = require('fs');

var cheerio = require('cheerio');

var TESTDIR = __dirname + '/tests';
var SRCDIR = __dirname + '/src';

var minify = require('html-minifier').minify;

var minifyOpts = {
  removeComments: true,
  removeAttributeQuotes: true
};

var INPUT = TESTDIR + '/index-src.html';
var OUTPUT = __dirname + '/index.html';

build();

function build () {

  console.log('BUILDING!');

  var typeset = require('./src');

  var html = fs.readFileSync(INPUT, 'utf-8');

  var $ = cheerio.load(html, {decodeEntities: false});
      $('#panel-2').html($('#panel-1').html());

  var options = {
    ignore: '.ts-ignore'
  };

  html = typeset($.html(), options);
  // html = typeset(html, options);

  if (html) fs.writeFileSync(OUTPUT, minify(html, minifyOpts));
  console.log('DONE!');
}

fs.watch(TESTDIR, build);
fs.watch(SRCDIR, build);


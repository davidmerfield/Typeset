var fs = require('fs');

var TESTDIR = __dirname + '/tests';
var SRCDIR = __dirname + '/src';

var INPUT = TESTDIR + '/index-src.html';
var OUTPUT = __dirname + '/index.html';

build();

function build () {

  console.log('BUILDING!');

  var typeset = require('./src');

  var html = fs.readFileSync(INPUT, 'utf-8');
  var options = {};

  html = typeset(html, options);

  if (html) fs.writeFileSync(OUTPUT, html);
}

fs.watch(TESTDIR, build);
fs.watch(SRCDIR, build);


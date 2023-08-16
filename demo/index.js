const typeset = require('../src/index.js');
const fs = require('fs-extra');
const cheerio = require('cheerio');
const hljs = require('highlight.js');
const path = require('path');
const CleanCSS = require('clean-css');
const UglifyJS = require('uglify-js');

const SOURCE = path.join(__dirname, 'source');
const PUBLIC = path.join(__dirname, 'public');

function build() {
  // Copy library across
  fs.emptyDirSync(PUBLIC);

  const sourceFiles = fs.readdirSync(SOURCE);

  sourceFiles.forEach(function (name) {
    if (name[0] === '.') return;

    const from = path.join(SOURCE, name);
    const to = path.join(PUBLIC, name);

    if (path.extname(name) === '.css') return compressCss(from, to);

    if (path.extname(name) === '.js') return compressJs(from, to);

    if (name === 'index.html') return buildIndex(from, to);

    fs.copySync(from, to);
  });
}

function compressJs(from, to) {
  let file = fs.readFileSync(from, 'utf-8');
  file = UglifyJS.minify(file).code;
  fs.writeFileSync(to, file);
}

function compressCss(from, to) {
  let file = fs.readFileSync(from, 'utf-8');
  file = new CleanCSS({}).minify(file).styles;
  fs.writeFileSync(to, file);
}

function buildIndex(from, to) {
  let html = fs.readFileSync(from, 'utf-8');
  const $ = cheerio.load(html, { decodeEntities: false });

  $('#tab-after').html($('#tab-before').html());

  $('pre code').each(function () {
    const newHTML = hljs.highlight('js', $(this).html()).value;
    $(this).attr('class', 'hljs');
    $(this).html(newHTML);
  });

  html = typeset($.html(), { ignore: '#tab-before, pre', disable: 'ligatures' });

  fs.writeFileSync(to, html);
}

build();
fs.watch(path.join(__dirname, 'source'), function () {
  console.log('Building site...');
  build();
});

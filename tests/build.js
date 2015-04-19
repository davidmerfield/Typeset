var fs = require('fs');
var typeset = require('../src');
var html = fs.readFileSync(__dirname + '/index.html', 'utf-8');

html = typeset(html, {});

fs.writeFileSync(__dirname + '/index-out.html', html);

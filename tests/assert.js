var typeset = require('../src');
var assert = require('assert');
var fs = require('fs');

var html = fs.readFileSync(__dirname + '/index-src.html', 'utf-8');


console.log(typeset(html));
console.log(typeset(typeset(typeset(html))));
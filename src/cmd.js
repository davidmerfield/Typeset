#!/usr/bin/env node
var fs = require('fs');
var typeset = require('./index.js');

var userArgs = process.argv.slice(2);
var inputFile = userArgs[0];
var outputFile = userArgs[1];

if (userArgs.length < 2) {
  throw new Error('Not enough args');
}

fs.readFile(inputFile, function(err, data) {

  if (err) throw err;

  var outputHTML = typeset(data);
  fs.writeFile(outputFile, outputHTML, function(err) {
    if (err) throw err;
  });

});

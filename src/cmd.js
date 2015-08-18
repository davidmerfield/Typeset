#!/usr/bin/env node
var fs = require('fs');
var program = require('commander');
var typeset = require('./index.js');

// CLI
program
  .version(require('../package.json').version)
  .usage('<entry file> [options]')
  .option(
    '-o, --outfile <output file>',
    'write Typeset output to this file (if unspecified, Typeset will print to stdout)'
  ).option(
    '-i, --ignore <string containing selectors to ignore>',
    'string of CSS selector(s) to ignore'
  ).option(
    '-O, --only <string containing selectors to parse>',
    'string of CSS selector(s) to exclusively apply typeset to'
  ).parse(process.argv);

if (program.args.length == 0) {
  // display help and exit
  program.help();
}

var inputFile = program.args[0];
var outputFile = program.outfile || false;

var options = {
  ignore: program.ignore || '',
  only: program.only || '',
};

fs.readFile(inputFile, function(err, data) {

  if (err) throw err;

  var outputHTML = typeset(data, options);

  if (outputFile) {

    fs.writeFile(outputFile, outputHTML, function(err) {
      if (err) throw err;
    });

  } else {
    // print output to stdout by default
    console.log(outputHTML);
  }

});

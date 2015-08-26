#!/usr/bin/env node
var fs = require('fs');
var program = require('commander');
var typeset = require('./index.js');

// CLI
program
  .version(require('../package.json').version)
  .usage('[options] [<infile> [<outfile>]]')
  .option(
    '-i, --ignore <string containing selectors to ignore>',
    'string of CSS selector(s) to ignore'
  ).option(
    '-O, --only <string containing selectors to parse>',
    'string of CSS selector(s) to exclusively apply typeset to'
  ).parse(process.argv);

var inputFile = program.args[0] || null;
var outputFile = program.args[1] || null;

var options = {
  ignore: program.ignore || '',
  only: program.only || '',
};

if (inputFile) {
  fs.readFile(inputFile, function(err, data) {

    if (err) throw err;

    var outputHTML = typeset(data, options);

    if (outputFile) {

      fs.writeFile(outputFile, outputHTML, function(err) {
        if (err) throw err;
        process.exit(0);
      });

    } else {
      // print output to stdout by default
      console.log(outputHTML);
      process.exit(0);
    }

  });
}

process.stdin.resume();
process.stdin.setEncoding('utf8');

// Process input from stdin
process.stdin.on('data', function(data) {
  process.stdout.write(typeset(data, options));
});

process.stdin.on('end', function(data) {
  process.exit(0);
});

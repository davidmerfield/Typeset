# Typeset

**[Typeset](https://typeset.lllllllllllllllll.com/)** is an HTML pre-proces­sor for web ty­pog­ra­phy, giving you hang­ing punc­tu­a­tion, soft hy­phen in­ser­tion, op­ti­cal mar­gin out­dents, small-caps con­ver­sion, and punctuation substitution.

Typeset.js is available as a plugin for [Grunt](https://github.com/mobinni/grunt-typeset) and [gulp](https://github.com/lucasconstantino/gulp-typeset).

[![Demo](http://i.imgur.com/adsiz94.gif)](https://typeset.lllllllllllllllll.com/)

------------

## Getting Started

```js
npm install typeset
```

## Use

```js
const typeset = require('typeset');
const html = '<p>"Hello," said the fox.</p>';
const output = typeset(html);
```

Then tweak the CSS to match the metrics of your font and include it on your page.

```css
/* Small caps */
/*.small-caps {font-variant: small-cap;}*/

/* Double quote (") marks */
.pull-double{margin-left:-.46em}
.push-double{margin-right:.46em}

/* Single quote (') marks */
.pull-single{margin-left:-.27em}
.push-single{margin-right:.27em}

.pull-double, .push-double,
.pull-single, .push-single {display: inline-block}

/* Optical margin alignment for particular letters */
.pull-T, .pull-V, .pull-W, .pull-Y {margin-left: -0.07em}
.push-T, .push-V, .push-W, .push-Y {margin-right: 0.07em}

.pull-O, .pull-C, .pull-o, .pull-c {margin-left: -0.04em}
.push-O, .push-C, .push-o, .push-c {margin-right: 0.04em}

.pull-A {margin-left: -0.03em}
.push-A {margin-right: 0.03em}
```

## Options

You can pass an options object to influence how your HTML is typeset:

```js
const options = {
  // string of a CSS selector to skip
  ignore: '.skip, #anything, .which-matches',

  // string of a CSS selector to only apply typeset,
  only: '#only-typeset, .these-elements',

  // array of features to disable
  disable: ['hyphenate'],
};
```

### Disableable features
The following features may be disabled:

- `quotes`
- `hyphenate`
- `ligatures`
- `smallCaps`
- `punctuation`
- `hangingPunctuation`
- `spaces`

### CLI Usage

```
$ npm install -g typeset
```

```
Usage: typeset-js [options] [<infile> [<outfile>]]

Options:

  -h, --help      output usage information
  -V, --version   output the version number
  -i, --ignore    string of CSS selector(s) to ignore
  -O, --only      string of CSS selector(s) to exclusively apply typeset to
  --disable,      string of typeset feature(s) to disable, separated by commas
```

## Examples:

Compile a file and print it to stdout:
```js
$ typeset-js inputFile.html
```

To create an output file, just add a second argument:
```js
$ typeset-js inputFile.html outputFile.html
```

Use the `--ignore` option to ignore specific CSS selectors:
```js
$ typeset-js inputFile.html outputFile.html --ignore ".some-class, h3"
```

Use the `--disable` option to disable typeset features:
```js
$ typeset-js inputFile.html outputFile.html --disable "hyphenate,ligatures"
```

CLI redirections:
```js
$ cat index.html | typeset-js > outputFile.html
```

## Need help?

If you don't find the answer to your problem in our docs, ask us for help.

## License

This software is dedicated to the public domain and licensed under Creative Commons Zero.
See the [LICENSE](LICENSE) file for details.

## To Do:

* Develop a React, and Svelte plugins
* Develop a client-side plugin
* Add a build file
* Remove recursion from eachTextNode.js
* Feature to [avoid widows](https://github.com/davidmerfield/Typeset/issues/34).
* Incorporate features from [Normalize Opentype](http://kennethormandy.com/journal/normalize-opentype-css)

## Who uses Typeset?

* [**Blot**](https://blot.im/) - A blogging platform with no interface
* **You?** Submit a pull request to add it here!
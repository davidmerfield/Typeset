# Typeset

Typeset is an HTML pre-proces­sor for web ty­pog­ra­phy which pro­vides ty­po­graphic fea­tures used tra­di­tion­ally in ﬁne print­ing which re­main un­avail­able to browser lay­out en­gines. Typeset's pro­cess­ing brings the fol­low­ing to your web­pages:

- [Hang­ing punc­tu­a­tion](https://en.wikipedia.org/wiki/Hanging_punctuation)
- [Ligatures](https://en.wikipedia.org/wiki/Orthographic_ligature)
- [Optical mar­gin align­ment](https://en.wikipedia.org/wiki/Optical_margin_alignment)
- [Punctuation sub­sti­tu­tion](src/punctuation.js)
- [Small caps](https://en.wikipedia.org/wiki/Small_caps)
- [Soft hy­phen in­ser­tion](https://en.wikipedia.org/wiki/Soft_hyphen)

Typeset does not re­quire any client-side JavaScript and uses less than a kilo­byte of CSS. Processed HTML & CSS works in Internet Explorer 5 and with­out any CSS. Typeset can be used man­u­ally or as a plu­gin for [Grunt](https://github.com/mobinni/grunt-typeset) and [gulp](https://github.com/lucasconstantino/gulp-typeset).

<img src="https://i.imgur.com/5dTsGkH.gif" width="600">

---

## Getting Started

### Install

```shell
$ npm i typeset
```

### Usage

```js
const typeset = require('typeset');
let html = '<p>"Hello," said the fox.</p>';
let output = typeset(html);
```

### CSS
Then tweak the CSS to match the metrics of your font and include it on your page.

```css
/*
 Small Capitals
 https://en.wikipedia.org/wiki/Small_caps 
*/

.small-caps {font-variant: small-caps;}

/*
 Optical margin alignment for particular letters 
 https://en.wikipedia.org/wiki/Optical_margin_alignment
*/

.pull-T, .pull-V, .pull-W, .pull-Y {margin-left: -0.07em}
.push-T, .push-V, .push-W, .push-Y {margin-right: 0.07em}

.pull-O, .pull-C, .pull-o, .pull-c {margin-left: -0.04em}
.push-O, .push-C, .push-o, .push-c {margin-right: 0.04em}

.pull-A {margin-left: -0.03em}
.push-A {margin-right: 0.03em}

/* 
 Quotation mark 
 https://en.wikipedia.org/wiki/Quotation_mark) 
*/

/* Single quotation marks (') */
.pull-single{margin-left:-.27em}
.push-single{margin-right:.27em}

.pull-double, .push-double,
.pull-single, .push-single {display: inline-block}

/* Double quotation marks (") */
.pull-double{margin-left:-.46em}
.push-double{margin-right:.46em}
```

---

### Options

You can pass an options object to influence how your HTML is typeset:

```js
const options = {
  ignore: '.skip, #anything, .which-matches', // string of CSS selector(s) to ignore
  only: '#only-typeset, .these-elements', // string of CSS selector(s) to exclusively apply typeset to
  disable: ['hyphenate'] // array of typeset feature(s) to disable
};
```

#### Features
The following features may be disabled:

- `hyphenate`
- `hangingPunctuation`
- `ligatures`
- `punctuation`
- `quotes`
- `smallCaps`
- `spaces`

---

## CLI Usage

```shell
$ npm i -g typeset
```

```shell
Usage: typeset-js [options] [<infile> [<outfile>]]

Options:

  -h, --help      output usage information
  -V, --version   output the version number
  -i, --ignore    string of CSS selector(s) to ignore
  -O, --only      string of CSS selector(s) to exclusively apply typeset to
  --disable,      string of typeset feature(s) to disable, separated by commas
```

---

### Examples:

Compile a file and print it to stdout:
```shell
$ typeset-js inputFile.html
```

To create an output file, just add a second argument:
```shell
$ typeset-js inputFile.html outputFile.html
```

Use the `--ignore` option to ignore specific CSS selectors:
```shell
$ typeset-js inputFile.html outputFile.html --ignore ".some-class, h3"
```

Use the `--disable` option to disable typeset features:
```shell
$ typeset-js inputFile.html outputFile.html --disable "hyphenate,ligatures"
```

CLI redirections:
```shell
$ cat index.html | typeset-js > outputFile.html
```

---

## Plugins

- [Grunt](https://github.com/mobinni/grunt-typeset)
- [gulp](https://github.com/lucasconstantino/gulp-typeset).

---

## Support

If you don't find the answer to your problem in our docs, or have a suggestion for improvements, submit your question [here](https://github.com/davidmerfield/Typeset/issues).

---

## License

This software is dedicated to the public domain and licensed under Creative Commons Zero.
See the [LICENSE](LICENSE) file for details.

---

## To Do:

- [Language options & support](https://github.com/davidmerfield/Typeset/issues/25)
- [Widows & orphans](https://github.com/davidmerfield/Typeset/issues/34).
- Incorporate features from [Normalize Opentype](http://kennethormandy.com/journal/normalize-opentype-css)
- Plugins for React, Angular, Svelte, jQuery
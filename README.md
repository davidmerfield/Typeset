[![Demo](http://i.imgur.com/adsiz94.gif)](https://blot.im/typeset)

**[Typeset](https://blot.im/typeset)** is an html pre-proces­sor for web ty­pog­ra­phy. It uses no client-side JavaScript but gives you hang­ing punc­tu­a­tion, soft hy­phen in­ser­tion, op­ti­cal mar­gin out­dents, small-caps con­ver­sion and punctuation substitution. See the results on [the demo](https://blot.im/typeset). The library is idempotent and runs on the server using Node – I'll adapt it to work on the client soon. The processed HTML & CSS even [renders correctly in IE5](http://i.imgur.com/vVGtD3V.png) and [without any CSS](http://i.imgur.com/ITM0bcG.png)!

```javascript
npm install typeset
```

##### Usage

```javascript
var typeset = require('typeset');
var html = '<p>"Hello," said the fox.</p>';
var output = typeset(html);
```

Then tweak [typeset.css](https://blot.im/typeset/tests/typeset.css) to match the metrics of your font and include it on your page. 

##### Options

You can pass an options object to influence how your HTML is typeset:

```javascript
var options = {
  ignore: '.skip, #anything, .which-matches', // string of a CSS selector to skip
  only: '#only-typeset, .these-elements'    // string of a CSS selector to only apply typeset
};
```

#### Building locally

Clone this repo then fetch its dependencies using:

```
npm install
```

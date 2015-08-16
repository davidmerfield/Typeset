[![Demo](http://i.imgur.com/adsiz94.gif)](https://blot.im/typeset)

**[Typeset](https://blot.im/typeset)** is an html pre-proces­sor for web ty­pog­ra­phy. It uses no client-side JavaScript but gives you hang­ing punc­tu­a­tion, soft hy­phen in­ser­tion, op­ti­cal mar­gin out­dents, small-caps con­ver­sion and punctuation substitution. See the results on [the demo](https://blot.im/typeset).

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

You can pass an options object to influence how your HTML is typeset.

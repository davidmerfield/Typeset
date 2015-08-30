var webpack = require('webpack');
var pkg = require('./package.json');
var PROD = process.env.PROD;

var banner = [
  pkg.name + ' - ' + pkg.description,
  '@version v' + pkg.version,
  '@link ' + pkg.homepage,
  '@author ' + pkg.author,
  '@license ' + pkg.license
].join('\n');

var devPlugins = [
  new webpack.BannerPlugin(banner),
  new webpack.DefinePlugin({ 'IS_BROWSER': true })
];

var prodPlugins = [
  new webpack.BannerPlugin(banner),
  new webpack.DefinePlugin({ 'IS_BROWSER': true }),
  new webpack.optimize.UglifyJsPlugin({minimize: true})
]

// webpack.config.js
// Configuration for build typeset with browser support
// jQuery is a external dependency
module.exports = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    library: pkg.name,
    path: __dirname + '/build',
    filename: PROD ? "typeset.min.js" : 'typeset.js'
  },
  externals: {
    'cheerio': 'window.jQuery' // require jQuery instead of cheerio
  },
  plugins: PROD && prodPlugins || devPlugins
}

const webpack = require("webpack");
const pkg = require("./package.json");
const PROD = process.env.PROD;

const TerserPlugin = require("terser-webpack-plugin");

const banner = [
  pkg.name + " - " + pkg.description,
  "@version v" + pkg.version,
  "@link " + pkg.homepage,
  "@author " + pkg.author,
  "@contributors " + pkg.contributors,
  "@license " + pkg.license,
].join("\n");

module.exports = {
  mode: "production",

  entry: __dirname + "/src/index.js",
  devtool: "source-map",

  output: {
    library: pkg.name,
    path: __dirname + "/build",
    filename: PROD ? "typeset.min.js" : "typeset.js",
  },

  optimization: {
    minimizer: [new TerserPlugin()],
  },

  externals: {
    cheerio: "jQuery", // TODO I think there should be another way to avoid require cheerio
    jquery: "jQuery",
  },

  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
      ENV: {
        browser: true,
      },
    }),
  ],
};

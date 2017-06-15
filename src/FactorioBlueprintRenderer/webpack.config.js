const webpack = require('webpack');

var config = {
  context: __dirname + '/js', // `__dirname` is root of project and `js` is source
  entry: {
    fbpviewer: './init.js',
  },
  output: {
    path: __dirname + '/../AppBundle/Resources/public/js',
    filename: '[name].bundle.js',
  },
  devtool: "cheap-module-eval-source-map",
};

module.exports = config;

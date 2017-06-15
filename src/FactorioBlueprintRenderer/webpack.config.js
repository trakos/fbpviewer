const webpack = require('webpack');

var config = {
  context: __dirname + '/js', // `__dirname` is root of project and `js` is source
  entry: {
    fbpviewer: './init.js',
  },
  output: {
    path: __dirname + '/dist', // `dist` is the destination
    filename: '[name].bundle.js',
  },
};

module.exports = config;

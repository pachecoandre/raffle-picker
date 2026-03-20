const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true
  },
  plugins: [new webpack.EnvironmentPlugin(['BACKEND_URL', 'GOOGLE_CLIENT_ID'])]
});

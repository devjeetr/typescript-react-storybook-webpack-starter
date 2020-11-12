/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  entry: './src/index.tsx',
  target: 'web',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
  },
});

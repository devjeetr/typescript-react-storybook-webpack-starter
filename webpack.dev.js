/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

const { merge, mergeWithRules } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const generateConfig = (config) => {
  // merge base config

  let devConfig = merge(config, {
    entry: './src/index.tsx',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
    },
  });
  if (!devConfig.plugins) {
    devConfig.plugins = [];
  }
  devConfig.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}', // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      },
    }),
    new HtmlWebpackPlugin({
      title: 'typescript-starter',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  );

  // merge rules

  return mergeWithRules({
    module: {
      rules: [
        {
          test: 'match',
          use: {
            loader: 'prepend',
          },
        },
      ],
    },
  })(
    {
      module: {
        rules: [
          {
            test: /\.(j|t)sx?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: require.resolve('babel-loader'),
                options: {
                  plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
                },
              },
            ],
          },
        ],
      },
    },
    devConfig,
  );
};

const finalConfig = generateConfig(commonConfig);
console.log(finalConfig.module.rules[0].use);
module.exports = finalConfig;

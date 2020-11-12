const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "./src/index.tsx",
  target: "web",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              plugins: [
                isDevelopment && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
          {
            loader: "ts-loader",
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            },
          },
        ],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/,
        loader: "css-loader",
      },
    ],
  },
  devServer: {
    open: true,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}", // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      },
    }),
    new HtmlWebpackPlugin({
      title: "typescript-starter",
      template: path.resolve(__dirname, "src/index.html"),
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};

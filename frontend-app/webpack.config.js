"use strict";

const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

let config = {
  target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
  entry: {
    main: ["./src/app.tsx", "./src/css/app.css"],
  },
  output: {
    path: path.resolve(__dirname, "..", "build-app", "bundle"),
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              "@babel/plugin-syntax-dynamic-import",
              ["@babel/plugin-proposal-class-properties", { loose: true }],
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        // use: MiniCssExtractPlugin.loader({
        //   fallback: "style-loader",
        //   use: [
        //     {
        //       loader: "css-loader",
        //     },
        //     "postcss-loader",
        //     "sass-loader",
        //   ],
        // }),
      },
      {
        test: /.(png|woff(2)?|eot|ttf|svg|gif)(\?[a-z0-9=\.]+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "../css/[hash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  externals: {
    PHPApp: "PHPApp",
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
      __API_HOST__: JSON.stringify("http://localhost/my-app/"),
    }),
    new CopyPlugin({
      patterns: [{ from: "./assets/css", to: "assets/css" }],
    }),
  ],
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        sequences: true,
        conditionals: true,
        booleans: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
      },
      output: {
        comments: false,
      },
      minimize: true,
    })
  );
}

module.exports = config;

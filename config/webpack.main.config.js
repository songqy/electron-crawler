const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.resolve(__dirname, '../');
const srcPath = path.resolve(rootPath, 'src');

const plugins = [new CleanWebpackPlugin()];

if (process.env.NODE_ENV === 'development') {
  plugins.push(new HtmlWebpackPlugin({
    filename: 'app.html',
    template: path.resolve(srcPath, 'main/app.html'),
    inject: false,
  }));
}

module.exports = merge(baseConfig, {
  mode: process.env.NODE_ENV || 'production',
  devtool: 'cheap-module-eval-source-map',
  entry: [path.resolve(srcPath, './main/main.ts')],
  output: {
    path: path.resolve(rootPath, 'build'),
    filename: 'main.js',
  },
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins,
});

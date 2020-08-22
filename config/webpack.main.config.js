const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const rootPath = path.resolve(__dirname, '../');
const srcPath = path.resolve(rootPath, 'src');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'cheap-module-eval-source-map',
  entry: [path.resolve(srcPath, 'main.ts')],
  output: {
    path: path.resolve(rootPath, 'build'),
    filename: 'main.js',
  },
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
});

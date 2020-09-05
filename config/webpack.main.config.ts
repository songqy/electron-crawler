import path from 'path';
import { Plugin } from 'webpack';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.base.config';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const rootPath = path.resolve(__dirname, '../');
const srcPath = path.resolve(rootPath, 'src');

const isDev = process.env.NODE_ENV === 'development';

const plugins: Plugin[] = [new CleanWebpackPlugin()];

if (isDev) {
  plugins.push(new HtmlWebpackPlugin({
    filename: 'app.html',
    template: path.resolve(srcPath, 'app.html'),
    inject: false,
  }));
}

export default merge(baseConfig, {
  mode: isDev ? 'development' : 'production',
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

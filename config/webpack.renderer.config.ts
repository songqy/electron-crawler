import path from 'path';
import { spawn } from 'child_process';
import { Plugin, HotModuleReplacementPlugin } from 'webpack';
import { Configuration } from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.base.config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isDev = process.env.NODE_ENV === 'development';

const rootPath = path.resolve(__dirname, '../');
const srcPath = path.resolve(rootPath, 'src');

const port = Number(process.env.PORT) || 3341;
const publicPath = `http://localhost:${port}/dist`;
const plugins: Plugin[] = [
  new HtmlWebpackPlugin({
    filename: 'app.html',
    template: path.resolve(srcPath, 'app.html'),
    inject: true,
  }),
  new VueLoaderPlugin(),
  new MiniCssExtractPlugin({
    filename: 'style.css',
  }),
];

let outputConfig = {};
let devServer: Configuration | undefined;

if (isDev) {
  plugins.push(
    new HotModuleReplacementPlugin(),
  );
  outputConfig = { publicPath };
  devServer = {
    port,
    // index: 'app.html',
    publicPath,
    compress: true,
    noInfo: false,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.resolve(rootPath, 'dist'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100,
    },
    historyApiFallback: {
      verbose: true,
    },
    before() {
      console.log('Starting Main Process...');
      spawn('npm', ['run', 'start-main-dev'], {
        shell: true,
        env: process.env,
        stdio: 'inherit',
      })
        .on('close', (code) => process.exit(code))
        .on('error', (spawnError) => console.error(spawnError));
    },
  };
} else {
  outputConfig = { path: path.resolve(rootPath, 'build') };
}

export default merge(baseConfig, {
  mode: isDev ? 'development' : 'production',
  devtool: 'inline-source-map',
  entry: [path.resolve(srcPath, './renderer/index.js')],
  output: {
    ...outputConfig,
    filename: 'renderer.js',
  },
  target: 'electron-renderer',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
      },
      // WOFF Font
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
      },
      // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
          },
        },
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins,
  devServer,
});

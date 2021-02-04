/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import { Plugin, Configuration } from 'webpack';
import Dotenv from 'dotenv-webpack';
import pkg from '../package.json';

const { dependencies: externals } = pkg;

function resolve (dir: string) {
  return path.join(__dirname, '..', dir);
}

const plugins: Plugin[] = [
  new Dotenv(),
];

const baseConfig: Configuration =  {
  externals: [...Object.keys(externals || {})],

  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname, '..', 'build'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.json', '.ts', '.vue'],
    modules: [path.join(__dirname, '..', 'src'), 'node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@c': resolve('src/renderer/components'),
      '@p': resolve('src/renderer/pages'),
    },
  },

  plugins,
};

export default baseConfig;

/**
 *
 * 开发环境webpack配置
 *
 */
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const webpack = require('webpack');

const config = merge(commonConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          fix: true,
          cache: true
        }
      }
    ]
  },
  devServer: {
    port: 8086,
    compress: true,
    hot: true,
    // stats: 'errors-only',
    overlay: true,
    // clientLogLevel: 'silent',
    historyApiFallback: {
      index: '/dist/index.html'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
});
module.exports = config;
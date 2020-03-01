/**
 *
 * 开发环境webpack配置
 *
 */
const merge = require('webpack-merge');
// TODO: 环境变量
const commonConfig = require('./webpack.config.common');
const webpack = require('webpack');
module.exports = merge(commonConfig, {
  mode: 'development',
  devServer: {
    port: 8086,
    compress: true,
    hot: true,
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
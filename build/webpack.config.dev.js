/**
 *
 * 开发环境webpack配置
 *
 */
const merge = require('webpack-merge');

const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  devServer: {
    port: 8086,
    compress: true,
    historyApiFallback: {
      index: '/dist/index.html'
    }
  }
});
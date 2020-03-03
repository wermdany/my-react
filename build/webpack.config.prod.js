/**
 *
 * 生产环境webpack配置
 *
 */
const commonConfig = require('./webpack.config.common');
const merge = require('webpack-merge');
const webpack = require('webpack');
// 打包前先清除上次打包的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = merge(commonConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
module.exports = config;
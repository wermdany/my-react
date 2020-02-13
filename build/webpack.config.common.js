/**
 * 配置公共文件
 */
//node
// 路径
const path = require('path');
// 操作系统
const os = require('os');
// 公共路径
const srcDir = path.join(__dirname, '../src');
//插件
// 解析index.html模板文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 多线程打包
const HappyPack = require('happypack');
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: {
    app: srcDir + '/app.jsx'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunk:12].js',
    checkFilename: 'js/[name].[chunk:12].js'
  }
};
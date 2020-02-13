/**
 *
 * 生产环境webpack配置
 *
 */
const path = require('path');
const srcDir = path.join(__dirname, '../src');
// 解析index.html模板文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
// 打包前先清除上次打包的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
module.exports = {
  mode: 'production',
  entry: srcDir + '/app.jsx',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/app.js'
    // 由于本地node服务器指向项目根目录，所以生产环境打包需要取消以下代码
    // publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          miniCssExtractPlugin.loader,
          /* 'style-loader',*/
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'image/[hash:32].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: srcDir + '/index.html',
      baseUrl: '/public/'
    }),
    new miniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(),
    new WebpackBar()
  ],
  resolve: {
    // // 别名
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    // 自动确认的文件拓展，主要是用于import文件的时候不需要添加后缀
    extensions: ['.js', '.jsx']
  },
  optimization: {
    splitChunks: {
      chunks: 'all' // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    }
  }
};
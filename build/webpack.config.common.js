/**
 * 配置公共文件
 */
//node
// 路径
const path = require('path');
// 公共路径
const srcDir = path.join(__dirname, '../src');
const pubDir = path.join(__dirname, '../public');
const devMode = process.env.NODE_ENV !== 'production';
console.log(devMode);
//插件
// 解析index.html模板文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
module.exports = {
  entry: {
    app: srcDir + '/app.jsx'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: devMode ? 'js/[name].js' : 'js/[name].[hash:8].js',
    chunkFilename: devMode ? 'js/[id].js' : 'js/[name].[hash:8].js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: /(src|[\\/]node_modules[\\/]antd)/,
        use: [{
          loader: 'babel-loader', options: {
            // 开启缓存
            cacheDirectory: true
          }
        }]
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          // miniCssExtractPlugin.loader,
          devMode ? 'style-loader' : miniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              // jsx语法是把css引入js文件
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
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
      template: pubDir + '/index.html',
      favicon: pubDir + '/favicon.ico',
      title: '管理平台'
    }),
    new miniCssExtractPlugin({
      filename: devMode ? 'css/app-[name].css' : 'css/app-[contenthash:8].css',
      chunkFilename: devMode ? 'css/chunk-[id].css' : 'css/chunk-[contenthash:8].css'
    }),
    new WebpackBar()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial'
        }
      }
    }
  },
  // map文件是否出现？分环境配置
  devtool: devMode ? 'cheap-module-eval-source-map' : 'none'
};
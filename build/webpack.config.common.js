/**
 * 配置公共文件
 */
//node
// 路径
const path = require('path');
// 公共路径
const srcDir = path.join(__dirname, '../src');
const pubDir = path.join(__dirname, '../public');
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
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: /src/,
        use: 'babel-loader'
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          miniCssExtractPlugin.loader,
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
      },
      {
        loader: 'webpack-ant-icon-loader',
        enforce: 'pre',
        options: {
          chunkName: 'antd-icons'
        },
        include: [
          require.resolve('@ant-design/icons/lib/dist')
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: pubDir + '/index.html',
      favicon: pubDir + '/favicon.ico'
    }),
    new miniCssExtractPlugin({
      filename: 'css/app-[contenthash:8].css',
      chunkFilename: 'css/chunk-[contenthash:8].css'
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
  }
};
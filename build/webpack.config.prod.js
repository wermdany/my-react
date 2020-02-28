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
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  mode: 'production',
  entry: {
    app: srcDir + '/app.jsx'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/app-[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].js'
    // 由于本地node服务器指向项目根目录，所以生产环境打包需要取消以下代码
    // publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          miniCssExtractPlugin.loader,
          /* 'style-loader',*/
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader', options: {
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
      template: srcDir + '/index.html',
      baseUrl: '/public/'
    }),
    new miniCssExtractPlugin({
      filename: 'css/css-[contenthash:8].css',
      chunkFilename: 'css/chunk-[contenthash:8].css'
    }),
    new CleanWebpackPlugin(),
    new WebpackBar(),
    new BundleAnalyzerPlugin()
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
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial'
        }
      }
    }
  }
};
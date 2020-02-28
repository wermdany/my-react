const path = require('path');
const srcDir = path.resolve(__dirname, './src');
// 解析index.html模板文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//拆分文件
const miniCssExtractPlugin = require('mini-css-extract-plugin');
// 打包前先清除上次打包的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',//production|development
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/app.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        include: [srcDir],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          miniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader']
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
      template: './src/index.html',
      baseUrl: '/public/'
    }),
    new miniCssExtractPlugin({
      filename: '[name]_[hash:8].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    // // 别名
    alias: {
      '@': path.resolve(__dirname, 'src/')
    },
    // 自动确认的文件拓展，主要是用于import文件的时候不需要添加后缀
    extensions: ['.js', '.jsx']
  },
  optimization: {
    sideEffects: true, //配合tree shaking
    splitChunks: {}, //拆包
    namedModules: false, // namedChunks:false 不启用chunk命名，默认自增id
    minimize: true // 代码压缩
  },
  devServer: {
    port: 8086,
    compress: true,
    historyApiFallback: {
      index: '/dist/index.html'
    }
  }
};
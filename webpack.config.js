const path = require('path');
// 解析index.html模板文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//拆分文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
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
    new ExtractTextPlugin({
      filename: 'css/style[hash:8].css'
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
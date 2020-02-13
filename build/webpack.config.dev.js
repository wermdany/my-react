/**
 *
 * 开发环境webpack配置
 *
 */
const path = require('path');
module.exports = {
  mode: 'development',
  entry: '/src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist')
  }
};
# 从零搭建一个React开发环境

## 引言

2020年疫情期间无聊，研究从零搭建一个React开发环境。

## 一个开发环境究竟都需要什么

### 打包工具

>React 开发必不可少工程化，所以打包工具是必须的，我们使用 [webpack](https://webpack.docschina.org/) 。

### 处理脚本文件

  1. 处理 `.js|.jsx` 文件 [✔]

  2. 处理兼容性  
    2.1 css兼容（post-cssnext）[✔]  
    2.2 js兼容 babel-polyfill [❌]  
  3. 按需加载/文件分离  
   > css分离了，js分离还需要继续优化
  
### 处理样式文件

  1. 处理 `.css|.less` 文件 [✔]

  2. 自动添加浏览器前缀 `postcss` [✔]

  3. 文件分离 [✔]

### 处理视图文件

  1. 处理模板文件 [✔]  

  2. 模板文件变量 [❌]

### 处理其他资源

  1. 图片资源处理 [✔]
  
  2. fontIcon [❌]

### 打包优化

  1. 按需加载 [✔]

  2. 分离文件 [✔]

  3. 分析打包 [✔]

### 便捷开发

  1. 代码规范（es-lint） [✔]

  2. jsconfig [✔]

  3. 热重载 [✔]

  4. 代码提示 [✔]
   
  5. 包引入 [❌]（仍有问题）

### React 相关

### 引入 UI 框架

### Mock数据

### 浏览器兼容性

### 测试

### 创建模板

```cmd
  --registry https://registry.npm.taobao.org/
```

## 包作用

### webpack基础

#### webpack相关

1. webpack
webpack 核心
2. webpack-dev-server
webpack服务器，热重载等
3. webpack-cli
webpack 集成命令

#### 辅助插件

1. webpack-merge
webpack配置文件合并
2. webpackbar
webpack大包进度条
3. happypack
多线程打包

### 样式

#### webpack 加载器

1. style-loader
把css文件插入到HTML文件内
2. css-loader
编译css文件
3. postcss-loader
编译css
4. less-loader
编译less

#### 插件

1. mini-css-extract-plugin（尽在prod环境有效）
css文件抽离出js,默认是加入到js文件中的
2. postcss-cssnext
postcss使用的加载器，用于添加前缀，兼容等操作
3. cssnano
对css文件进行操作，去重，压缩，优化等等

#### 其他

1. less
less语法解析

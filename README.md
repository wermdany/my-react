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

## `babel-runtime`和 `babel-polyfill`

babel是一个解析器，把高版本ES的待吗转为低版本的代码，但是默认只会转化语法，而不会新增API,比如：`Object.prototype.includes`等等方法。  

因此需要一些垫片，常见的就是`polyfill` 和 `babel-runtime`

### 相同点

1. 二者都可以添加高级语法API

### 不同点

1. `polyfill`添加的新api会对全局进行污染方法例如：  

   ```js
    if(!Object.prototype.includes){
      Object.prototype.includes=XXX
    }

   ```

   而`babel-runtime`则会

   ```js
    var _includes = XXX;

   ```

   在使用的时候也会把使用的方法改为`_includes`,由于打包都是使用自执行函数区分模块和作用域，所以并不会影响到其他的代码造成污染，同样其他的方法也无法使用！

### babel 7.4.0 之前

一般 `babel-runtime` 是一些类库开发着开发的时候使用的打包方法，这样保证了类库自身的执行，而不会影响到使用着的环境。同时，它还有提取冗余工具函数的功能，比如：在`webpack`中babel引入此方法可以减少引入多个相同的工具方法，减少打包体积。

### babel 7.4.0 之后

现在打包会变成

 ```js
    var _includes = XXX;
    var Object.includes = _includes;
   ```

多加了，一步

由于 `babel-runtime` 的升级，只需要在 `@babel/preset-env` 的 `options`中像 `babel/polyfill` 以这样配置即可，不需要再，安装 `babel/polyfill`,但是必须保证`core-js@3` 和 `regenerator-runtime` 存在于 `node_modules` 中。

> 事实上 babel/polyfill,就是这两个包的集成。

### 最佳实践

在babel@7.4.0,之前，我们使用 `babel-runtime`（提取公共助手方法） 和 `babel/polyfill`（解决不兼容） 联合，起来（注意是要用在项目开发，如果你要开发类库，最好还是不要污染全局变量！会对使用者造成无法预料的问题，参考antd事件）。打包文件相对小一点。

在@babel@7.4.0之后，大可以全交给 `babel-runtime` 处理，这样打包下来文件相对会比较大。

## React Or Vue 项目，引用第三方UI框架，导致Babel/polyfill“失效”问题

### 起因

我们首先要知道，webpack 打包的机制。

一般情况下，类库的作者，会使用 `babel-runtime` 来兼容自己在写类库的时候用到的一些高级API,并且不会污染全局。这是非常好的。我们一般会把他们当成一个独立的个体，而在webpack打包的时候，会把这部分代码直接拷贝过来，不进行任何处理！在webpack配置的时候，我们总会提到 `include` 和 `exclude` 用来排除 `node_modules` 里面的文件文件，增快编译时间，这就导致了一个问题，我们可以看一下，在 `antd` 这类的UI框架中，除了暴漏给我们打包好的 `xx.js` 文件之外（独立个体文件），还会给我们打包程度不高（划分打包）的或者未打包的 `es` 文件，对的，就是我们常常说的 “按需加载” 。

如果恰好，你引入的某个组件，使用了高级语法（现在一般都使用了），并且，你项目中 `src` 下，也就是你写的业务代码，没有使用到这些高级语法，那么 `babel-polyfill` 就不会添加相对应的垫片，导致 “无效”。

### 解决方案

对于直接使用 `vue-cli@3+` 的 在 `vue.config.js`中有一个 `transpileDependencies` 选项

>transpileDependencies  
>Type: Array \<string | RegExp\>  
>Default: []  
>默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。

可以排除

对于 `vue-cli@2` 的，由于我没用过所以不太了解，但是观察文件目录，应该集成度不如 `@3` 高，可以参考下文 纯 webpack 解决方案。

对于 `webpack` 的，只需要在 babel-loader的配置中把 `include` 和 `exclude` 的设置中排除相应的 UI包即可。

> VueCli@3的 `transpileDependencies`，应该是对应生成了正则去改变webpack babel-loader 的 `include` 和 `exclude`的配置，达到排除屏蔽。  
> 我并没有发现，babel-loader 和相关的配置中，有关于显式转译的配置项。

# Vue 脚手架

## webpack

一个现代 JavaScript 应用程序的静态模块打包工具

1. 5 个核心概念

- 入口 entry
  - 指示以哪个文件开始打包
  - 注意：以入口文件为起点，构建依赖关系图，将所有依赖的文件全部打包进来
- 输出 output
  - 打包后资源输出到哪里去
- 加载器 loader
  - webpack 工具本身只能打包 js、json 资源，其他资源打包不了
  - 需要借助 loader 解析其他资源，webpack 才能打包这些其他资源
- 插件 plugins
  - 执行更加强大的任务（相对 loader 来讲）
- 模式 mode
  - 开发模式 development
  - 生产模式 production
    - 相同点：都能解析 ES6 模块化
    - 不同点：production 多一个压缩 JS 代码

2. 基本使用

- 初始化 package.json 文件

  - npm init
  - npm init -y

  ```json
  {
    "name": "vue-cli", // 包名
    "version": "1.0.0", // 包的版本号
    "scripts": {
      // 启动指令
      "start": "xxx", // npm start
      "dev": "xxx", // npm run dev
      "build": "xxx" // npm run build
    },
    /*
      如果你把开发依赖的包下载到生产依赖会不会有问题？反之会不会有问题？
        不会影响任何功能。
      生产依赖：项目运行时需要使用的依赖（vue，jquery）
      开发依赖：webpack构建打包需要使用的依赖（webpack，babel）
        解决：直接重下（注意依赖）
    */
    "dependencies": {}, // 生产依赖
    "devDependencies": {} // 开发依赖
  }
  ```

- 下载依赖包

  - npm i webpack webpack-cli -D

- 定义 webpack 配置文件

  - webpack.config.js

- 项目根目录
  - 配置文件就在项目根目录
  - 下载包也在项目根目录下
  - 启动 webpack 指令也是在项目根目录
  - 哪个目录是项目根目录？
    - 02.定义 vue 脚手架
    - 包含整个项目的最近的目录（package.json 文件所在的目录）

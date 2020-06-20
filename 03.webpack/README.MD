# webpack 高级

## webpack 基础

- webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具
- 核心概念

  - entry 入口
    - 指示 webpack 从哪个文件开始打包
  - output 输出
    - 指示 webpack 将打包后的文件输出到哪里去
  - loader 加载器
    - webpack 本身只能识别 js/json 模块，其他模块解析不了，所以引入时会报错
    - loader 帮助 webpack 解析它解析不了的模块（将其他模块解析成 webpack 能识别的模块，这样才能打包）
    - 还有其他功能：多进程打包...
  - plugin 插件
    - 能够功能更加强大的事
    - 将现有库包装成 webpack 能够识别的功能模块，从而加载使用
  - mode 模式
    - 模式（development/production）
    - 区别：设置不同 NODE_ENV，启用不同的插件
    - 详细区别：https://webpack.docschina.org/configuration/mode/

- 其他配置

  - resolve 解析：帮助 webpack 解析模块

    - alias 配置路径别名
    - extensions 配置自动补全文件扩展名
    - modules 配置 引入 node_modules 库，node_modules 文件夹去哪找

    ```js
    resolve: {
      alias: {
        '@redux': path.resolve(__dirname, 'src/redux')
      },
      extensions: ['.jsx', '.js', '.json'],
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
    }
    ```

  - optimization 优化
  - devServer 开发服务器
    ```js
    devServer: {
      contentBase: resolve("public"), // 开发服务器将哪个目录的资源暴露出去
      port: 9527, // 服务器端口号
      host: "localhost", // 服务器域名,
      compress: true, // 启动gzip压缩
      open: true, // 自动打开浏览器
      hot: true, // HMR功能
      quiet: false, // 启用静默模式，在终端不打印多余信息
      clientLogLevel: "none", // 在浏览器控制台不打印多余内容
      proxy: {
        // 配置代理服务器
        "/api": {
          target: "http://localhost:3000",
          pathRewrite: { "^/api": "" },
          changeOrigin: true,
        },
      },
      historyApiFallback: true, // 解决开发的前端路由刷新404问题
    }
    ```
  - devtool 生成 map 文件
    - 最佳实践
      - 开发环境 cheap-module-source-map
      - 生成环境 source-map
  - externals 指定某些文件，不被 webpack 打包，从而可以使用外链（cdn）手动引入
    ```js
    externals: {
      jquery: "jQuery"; // 当webpack解析jQuery就会跳过，不解析
    }
    ```

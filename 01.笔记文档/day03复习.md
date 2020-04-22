# day03

## 过渡和动画

- transition
- 注意：触发过渡或动画效果，必须结合 v-if 来控制显示隐藏

## 过滤器

- 全局过滤器和局部过滤器
- 典型应用：格式化时间
- 使用

  - 定义 Vue.filter('xxx', function () {})
  - 使用 {{nowTime | xxx}}

- 格式化时间
  - moment
  - dayjs
  - date-fns

## 指令

- v-text 给标签节点添加文本内容
- v-html 给标签节点添加 html 内容
- v-once 只会渲染一次元素节点，后面更新再也不会发生任何变化
- v-on 绑定事件，通常简写为@
- v-bind 强制绑定数据（单向数据绑定），通常简写为:
- v-model 双向数据绑定
- v-if/v-else-if/v-else 控制元素显示隐藏，在 DOM 结构彻底不存在
- v-show 控制元素显示隐藏，通过样式 display 来控制隐藏
- v-for 遍历对象/数组

## 重要概念

### 数据代理

当你定义 `new Vue({ data: { isShow: true } })` 时，当 Vue 内部解析时会对 data 中的数据进行数据代理
Vue 会自动给 vm（this/实例对象）添加一个直接 isShow 属性，并且设置该属性的 getter 和 setter `类似于~ Object.defineProperty(vm, 'isShow', { get() {}, set() {} })`
所以这些数据具备一些特点，本身是没有值的
当你读取 isShow 属性的值时，内部会自动调用 getter 方法并返回值出去（实际得到的是 getter 方法的返回值）
当你设置 isShow 属性的值时，内部会自动调用 setter 方法，更新值并更新模板页面

### 响应式数据

1. 什么是响应式数据？
   数据一旦发生变化，会自动更新页面/数据
   （页面输入数据发生变化，会自动更新 JS 中 data 数据 / data 数据发生变化，会自动更新页面）

2. 哪些数据是响应式数据？
   Vue 中 data 中所有数据都是响应式数据
   分为两种情况探讨：
   数组数据：内部也会 setter 监视，但是会有例外：
   this.persons[0] = { id: 7, name: "jack" };
   解决： this.persons.splice(0, 1, { id: 7, name: "jack" });
   对象数据/其他类型数据：内部都会给属性添加 setter 进行监视，值一旦发生变 化，即会更新值也会触发页面的更新

3. 响应式和非响应式
   响应式数据
   data 中的所有数据（data 对象，data 函数返回的对象）
   通过 vm.$set() / Vue.set() 设置的属性数据
   非响应式数据   
      手动给vm添加属性  
        this.msg2 = xxx （解决：通过给data初始化msg2属性）
      手动通过 . 方式给data数据添加额外的属性（得使用vm.$set()解决）
   this.person.age = 18 (解决：data 中 person.age = 0)

## 组件

- 模块
  - 具有特定功能效果 js 文件
- 模块化
  - 当 js 文件采用一个一个模块编写的就是一个模块化应用
- 组件
  - 具有特定功能效果的集合体（HTML/CSS/JS...）
- 组件化

  - 当应用程序采用 一个一个组件编写的就是一个组件化应用

- 定义组件

  - 两种方式
    - Vue.extend(options/配置对象) 定义组件，返回值组件构造函数
    - Vue.component(组件名, 组件构造函数) 注册组件（确定组件名称）
    - Vue.component(组件名, options) 定义并注册一个组件（是上面两个的简写）
  
  - 定义并注册全局组件
    - Vue.component(组件名, options)
  - 定义并注册局部组件

    ```vue
    // 定义组件
    const Component = Vue.extend(options); 
    new Vue({
      components: { // 注册局部组件 
        'component': Component
      }
    })
    ```

- 使用组件
  - 通过组件标签方式使用
  - `<component></component>`

- 面试题：为什么定义组件时data必须使用函数形式而不能使用对象呢？
  - 如果data使用对象形式，创建出来的n个组件会共享同一份data数据，一旦其中一个组件修改，全部组件都会变化更新
  - 如果data使用函数形式，函数每次调用都会返回一个新的data对象，创建出来的n个组件就不会共享同一份data数据，就不存在上面这个问题了

## 自定义 Vue 脚手架

### webpack

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

### 配置

1. 处理js资源
  babel 一个 JavaScript 编译器
  可以将ES6以上语法编译成ES5以下语法~，作用用来做JS兼容性处理

  - 下载依赖包（loader只需要下载不需要引入）
    npm i babel-loader @babel/core @babel/preset-env -D 
  - 配置loader  
    {
      test: /\.js$/, 
      // exclude: /node_modules/, 
      include: [resolve('src')], 
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: [], 
        },
      },
    },

2. 处理css资源

- 下载依赖包（loader只需要下载不需要引入）
npm i style-loader css-loader -D
- 配置loader   
{
  test: /\.css$/,
  include: [resolve("src")],
  use: [
    "style-loader",
    "css-loader",
  ],
},

3. 处理图片资源
- 下载依赖包（loader只需要下载不需要引入）
npm i url-loader file-loader -D
- 配置loader   
{
  test: /\.(png|gif|jpe?g|webp)$/,
  include: [resolve("src")],
  use: {
    loader: "url-loader",
    options: {
      limit: 10 * 1024,
      name: "static/media/[hash:10].[ext]",
    },
  },
},

4. 处理html资源
5. 处理其他资源（字体图标~）
6. 自动化

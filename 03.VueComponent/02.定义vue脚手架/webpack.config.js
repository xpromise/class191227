/*
  webpack的配置文件

  所有JS构建工具都是基于NODEJS工作的，所以模块化默认使用commonjs

  使用commonjs模块化语法向外暴露一个配置对象（属性名固定的对象）

  里面配置不能写错，一旦写错单词就会报错（代码写完检查一遍~）

  开发环境：让代码在内存中编译运行即可，没有输出文件到本地
  生产环境：输出打包后的资源文件到本地

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
*/
// Nodejs的模块 path 专门用来处理文件路径
const path = require("path");

/**
 * 封装一个处理绝对路径的方法
 * @param {String} relative 相对路径
 * @return {String} 基于项目根目录的绝对路径
 */
function resolve(relative) {
  // __dirname 代表当前文件所在的文件夹绝对路径
  // __dirname 其实就是项目根目录
  return path.resolve(__dirname, relative);
}

module.exports = {
  // 入口
  entry: "./src/index.js",
  // 输出
  output: {
    path: undefined, // 输出的目录
    filename: "built.js", // 输出文件名
  },
  // 加载器
  module: {
    rules: [
      {
        test: /\.js$/, // 规则对哪些文件生效
        // exclude: /node_modules/, // 排除node_modules文件，其他文件都检查
        include: [resolve("src")], // 包含src下面的文件，只检查包含的文件，而其他文件不检查
        // use: {}, 如果只要使用一个loader 用{}
        // use: []  如果要使用多个loader 用[]
        use: {
          // 需要下载
          loader: "babel-loader",
          options: {
            // 配置对象
            presets: ["@babel/preset-env"], // 预设，babel要干什么活
            plugins: [], // 插件
          },
        },
      },
      {
        test: /\.css$/,
        include: [resolve("src")],
        use: [
          // 执行顺序：从下到上 / 从右到左
          // 动态创建style标签，将js中css字符串添加，插入head中显示
          "style-loader",
          // 将css编译成js字符串，以commonjs规则插入到js文件中
          "css-loader",
        ],
      },
      {
        test: /\.(png|gif|jpe?g|webp)$/,
        include: [resolve("src")],
        use: {
          loader: "url-loader",
          options: {
            /*
              大小小于10kb以下的图片会被base64处理
              base64:
                1. 一种图片的优化手段（只针对小图片做优化）
                2. 将图片编译成base64编码的字符串
                  优点：随着html文件加载一起加载，不需要额外发送请求（减少请求数量，降低服务器压力）
                  缺点：体积会变得更大
            */
            limit: 10 * 1024,
            /*
              对输出文件进行重命名
              [hash:10] hash（根据文件生成唯一id值）取10位
              [ext] 使用原来文件扩展名
            */
            name: "static/media/[hash:10].[ext]",
          },
        },
      },
    ],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "development",
};

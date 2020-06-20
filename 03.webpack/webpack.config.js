/*
  开发流程：
    1. 初始化 package.json
      npm init -y
    
    2. 下载webpack基本包
      npm i webpack webpack-cli webpack-dev-server -D
    
    3. 配置启动webpack指令
      在package.json中配置  
      "scripts": {
        "start": "webpack-dev-server", // 开发环境指令
        "build": "webpack" // 生产环境指令
      },

    4. 定义webpack配置文件
      项目根目录/webpack.config.js  
*/
const path = require("path");
// npm i html-webpack-plugin -D
const HtmlWebpackPlugin = require("html-webpack-plugin");

function resolve(relative) {
  return path.resolve(__dirname, relative);
}

module.exports = {
  entry: "./src/index.js",
  output: {
    path: undefined,
    filename: "js/[name].js", // 决定输出文件名
    publicPath: "/", // 决定资源引入的公共路径
  },
  module: {
    rules: [],
  },
  plugins: [
    // 处理html文件
    new HtmlWebpackPlugin({
      template: resolve("public/index.html"), // 以index.html文件为模板创建新html文件
    }),
  ],
  mode: "development",
  devServer: {
    contentBase: resolve("public"),
    port: 9527,
    open: true,
    compress: true,
  },
  devtool: "cheap-module-source-map",
  resolve: {
    alias: {
      "@src": resolve("src"),
    },
    extensions: [".jsx", ".js", ".json"],
    modules: [resolve("node_modules"), "node_modules"],
  },
};

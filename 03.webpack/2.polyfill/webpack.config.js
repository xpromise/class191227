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
const webpack = require("webpack");
const path = require("path");
// npm i html-webpack-plugin -D
const HtmlWebpackPlugin = require("html-webpack-plugin");
// npm i mini-css-extract-plugin -D
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve(relative) {
  return path.resolve(__dirname, relative);
}

process.env.NODE_ENV = "production";

module.exports = {
  entry: "./src/index.js",
  output: {
    path: undefined,
    filename: "js/[name].js", // 决定输出文件名
    publicPath: "/", // 决定资源引入的公共路径
  },
  module: {
    rules: [
      // npm i css-loader style-loader -D
      {
        test: /\.css$/,
        use: [
          // 从下到上执行
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          // npm i postcss-loader postcss-flexbugs-fixes postcss-preset-env postcss-normalize -D
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebook/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'), // 修改flex bugs
                require('postcss-preset-env')({ // 做兼容性处理
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
                // Adds PostCSS Normalize as the reset css with default options,
                // so that it honors browserslist config in package.json
                // which in turn let's users customize the target behavior as per their needs.
                require('postcss-normalize')(), // 引入reset.css
              ],
            },
          }
        ],
      },
      // npm install -D babel-loader @babel/core @babel/preset-env
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/, // 排除
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: [
      //         [
      //           "@babel/preset-env",
      //           {
      //             useBuiltIns: "usage", // 按需加载需要使用兼容性包~
      //             corejs: {
      //               // corejs版本
      //               version: 3,
      //             },
      //             // targets: { // js兼容性程度
      //             //   ie: 10,
      //             //   chrome: 60,
      //             //   firefox: 50,
      //             //   safari: 10,
      //             // }
      //             // https://github.com/browserslist/browserslist
      //             targets: "> 0.25%, not dead",
      //           },
      //         ],
      //       ],
      //     },
      //   },
      // },
    ],
  },
  plugins: [
    // 处理html文件
    new HtmlWebpackPlugin({
      template: resolve("public/index.html"), // 以index.html文件为模板创建新html文件
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ],
  mode: "production",
  devServer: {
    contentBase: resolve("public"),
    port: 9527,
    open: true,
    compress: true,
  },
  // devtool: "cheap-module-source-map",
  resolve: {
    alias: {
      "@src": resolve("src"),
    },
    extensions: [".jsx", ".js", ".json"],
    modules: [resolve("node_modules"), "node_modules"],
  },
};

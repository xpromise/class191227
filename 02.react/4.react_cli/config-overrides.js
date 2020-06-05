/*
  1. 按需加载
    yarn add customize-cra react-app-rewired babel-plugin-import 
    在package.json修改启动指令：
      "scripts": {
        "start": "react-app-rewired start",
        "build": "react-app-rewired build",
        "test": "react-app-rewired test",
        "eject": "react-scripts eject"
      },
    加下如下配置即可；
  2. 自定义主题
   yarn add less less-loader   
   加下如下配置即可；
  
  3. 总结：
   yarn add customize-cra react-app-rewired babel-plugin-import less less-loader  
*/
const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
} = require("customize-cra");

module.exports = override(
  // 按需加载样式
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  // 自定义主题
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      // antd颜色变量文档
      // https://3x.ant.design/docs/react/customize-theme-cn#Ant-Design-%E7%9A%84%E6%A0%B7%E5%BC%8F%E5%8F%98%E9%87%8F
      modifyVars: { "@primary-color": "#1DA57A" }, // 修改antd主题色
    },
  }),
  // 添加babel插件 - 支持装饰器语法
  // yarn add @babel/plugin-proposal-decorators --dev
  addDecoratorsLegacy()
);

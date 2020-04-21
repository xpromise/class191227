/*
  webpack的配置文件

  所有JS构建工具都是基于NODEJS工作的，所以模块化默认使用commonjs

  使用commonjs模块化语法向外暴露一个配置对象（属性名固定的对象）

  里面配置不能写错，一旦写错单词就会报错（代码写完检查一遍~）
*/
module.exports = {
  // 入口
  entry: "",
  // 输出
  output: {},
  // 加载器
  module: {
    rules: [],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "",
};

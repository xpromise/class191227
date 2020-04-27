import Vue from "vue";
import VueResource from "vue-resource";
// import "@babel/polyfill";
/*
  问题：不支持ES6以上高级语法，比如 async 函数
    即使有babel，但是现在babel配置只能编译一些简单的ES6语法
  解决：
    1. @babel/polyfill 
      专门做ES6以上高级语法兼容性处理

      npm i @babel/polyfill 
      import '@babel/polyfill'

      新问题：我们现在只需要做async函数的兼容性处理，
      但是一旦引入 @babel/polyfill，就会做所有兼容性处理，问题文件体积太大了

    2. core-js 来做按需加载（按照实际需求加载指定文件）
      源代码使用哪些有兼容性问题代码，自动引入需要做兼容性问题的文件，其他的不要引入 

      npm i core-js

      presets: [
        [
          "@babel/preset-env",
          {
            // 配置按需加载
            useBuiltIns: "usage",
            corejs: { version: 3 },
            targets: {
              // 兼容性
              ie: 9,
              chrome: 60,
              firefox: 50,
              edge: 17,
              safari: 11,
            },
          },
        ],
      ]
*/

import App from "./App";

// 安装插件
Vue.use(VueResource);

new Vue({
  el: "#root",
  render: (h) => h(App),
});

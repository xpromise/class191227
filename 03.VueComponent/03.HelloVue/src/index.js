/*
  webpack打包的入口文件

  开发前端/客户端代码，使用都是ES6模块化
*/

import Vue from "vue"; // npm i vue

// 引入App组件
import App from "./App.vue";

new Vue({
  // 内部会创建App组件实例对象，并渲染到 "#app" 元素上
  render: (h) => h(App),
  // 去public/index.html中找
}).$mount("#app");

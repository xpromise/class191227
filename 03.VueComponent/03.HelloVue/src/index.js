/*
  webpack打包的入口文件

  开发前端/客户端代码，使用都是ES6模块化
*/

import Vue from "vue"; // npm i vue

// 引入App组件
import App from "./App";

import Hello from "@comps/HelloWorld";

// 全局注册一个组件
Vue.component("Hello", Hello);

new Vue({
  // 内部会创建App组件实例对象，并渲染到 "#app" 元素上
  render: (h) => h(App),
  // 去public/index.html中找
}).$mount("#app");

// new Vue({
//   components: {
//     App, // 注册App组件
//   },
//   template: "<App />", // 内部渲染App组件内容
// }).$mount("#app");

/*
  上面写法是下面的简写：
    下面没办法直接使用，会报错：
    [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

    原因：当前使用Vue的版本是运行时版本（vue.runtime.esm.js）, 这个版本没有编译器
    没有编译器就不能解析template，所以报错
    解决：
      1. 使用render方法去对 template 进行预解析 (推荐使用，体积更小)
      （内部使用 vue-template-compiler 去编译template）
      2. 使用带编译器的vue版本 （体积更大）

      https://cn.vuejs.org/v2/guide/installation.html#%E5%AF%B9%E4%B8%8D%E5%90%8C%E6%9E%84%E5%BB%BA%E7%89%88%E6%9C%AC%E7%9A%84%E8%A7%A3%E9%87%8A
*/

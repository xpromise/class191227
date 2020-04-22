/*
  项目打包入口文件
*/

import Vue from "vue";

import App from "./App";

new Vue({
  el: "#app", // public/index.html 对应上
  // 最终组件的内容渲染到页面元素上~
  render: (h) => h(App),
  // render: function(createElement) {
  //   // 自动注册App组件，并返回要渲染的App组件实例对象，最终会渲染到页面el元素上
  //   return createElement(App);
  // },
});

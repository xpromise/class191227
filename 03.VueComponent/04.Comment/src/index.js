/*
  项目打包入口文件
*/

import Vue from "vue";

import App from "./App";

new Vue({
  el: "#app", // public/index.html 对应上
  render: (h) => h(App),
});

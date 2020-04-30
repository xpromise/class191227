import Vue from "vue";
// 引入element-ui插件
// import ElementUI from "element-ui";
// 引入element-ui主题样式
// 问题：样式文件webpack解析不了，导致报错
// 原因：
// import "element-ui/lib/theme-chalk/index.css";

// 引入使其生效
import "./element";
import App from "./App";
// 安装插件（扩展Vue功能）
// 注册了n个全局组件
// 添加了n个Vue原型上的方法
// Vue.use(ElementUI);

new Vue({
  el: "#root",
  render: (h) => h(App),
});

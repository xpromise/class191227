import Vue from "vue";

import App from "./App";

// 1. 给Vue原型对象上添加一个公共的vm实例对象
const vm = new Vue();
Vue.prototype.$globalEventBus = vm;

new Vue({
  el: "#root",
  render: (h) => h(App),
});

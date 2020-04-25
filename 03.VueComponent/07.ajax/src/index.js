import Vue from "vue";
import VueResource from "vue-resource";

import App from "./App";

// 安装插件
Vue.use(VueResource);

new Vue({
  el: "#root",
  render: (h) => h(App),
});

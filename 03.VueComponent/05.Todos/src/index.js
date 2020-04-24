import Vue from "vue";

import App from "./App";
// 引入公共/基础样式
import './index.css';

new Vue({
  el: "#root",
  render: (h) => h(App),
});

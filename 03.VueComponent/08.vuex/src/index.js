import Vue from "vue";

import App from "./App";

// 默认情况下会自动找 store/index.js
import store from "./store";

// 引入插件，再new Vue() 之前安装插件
import myPlugin from "./plugins/myPlugin";

Vue.use(myPlugin);

// 调用插件扩展的全局方法
Vue.globalMethod();

new Vue({
  el: "#root",
  render: (h) => h(App),
  // 应用store，将来所有要使用vuex的组件不需要引入store，
  // 可以直接通过组件实例对象使用 this.$store
  store,
});

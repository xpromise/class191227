import Vue from "vue";
import VueRouter from "vue-router";

// 引入路由组件
import Home from "../pages/Home";
import About from "../pages/About";

// 凡是Vue插件都需要做
// 安装插件 / 声明使用插件
Vue.use(VueRouter);

// 创建路由器对象
const router = new VueRouter({
  routes: [
    // 路由配置
    {
      // 一旦配置，应用router时生效
      // 当路径变成 /home 时，当前路由组件就是 Home
      path: "/home",
      component: Home,
    },
    {
      path: "/about",
      component: About,
    },
    {
      // 当地址是 / ，会自动调整到 /home
      path: "/",
      redirect: "/home",
    },
  ],
});

// 默认暴露出去
export default router;

<template>
  <!-- 
    vue项目默认有一个App.vue组件
    这个组件：应用主组件/根组件

    组件里面有三个标签：
      template 模板页面：里面写模板代码
        注意：必须有且只有一个根标签
      script 组件配置对象：里面写js代码
      style 模板样式（组件样式）：里面写css代码
   -->
  <div>
    <h1 class="title">{{ title }}</h1>
    <!-- 
      使用组件：通过组件标签使用 
      https://cn.vuejs.org/v2/style-guide/#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90
      <HelloWorld /> 单标签（常用）
      <HelloWorld></HelloWorld> 双标签
      <hello-world></hello-world> 不太方便，写代码不太方便
      <hello-world />
    -->
    <HelloWorld />
    <HelloWorld></HelloWorld>
    <hello-world></hello-world>
    <hello-world />

    <Hello />
    <img class="logo" src="./assets/images/logo.png" alt="logo" />
  </div>
</template>

<script>
// 引入其他组件
import HelloWorld from "@comps/HelloWorld";

// 使用ES6模块化语法，向外暴露一个组件配置对象: data\methods\watch\computed...
export default {
  data() {
    // 必须定义函数形式
    return {
      title: "法外狂徒张三~",
    };
  },
  // 注册局部组件
  components: {
    // HelloWorld: HelloWorld, // 组件名: 组件构造函数
    // ES6对象简写
    HelloWorld,
  },
};
</script>

<style scoped>
.title {
  color: pink;
}
.logo {
  display: block;
  width: 500px;
  height: 500px;
}
</style>

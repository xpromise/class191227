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
    <img class="logo" src="./assets/images/logo.png" alt="logo" />
  </div>
</template>

<script>
// 使用ES6模块化语法，向外暴露一个组件配置对象: data\methods\watch\computed...
export default {
  data() {
    // 必须定义函数形式
    return {
      title: "法外狂徒张三~",
    };
  },
};
</script>

<style>
.title {
  color: pink;
}
.logo {
  display: block;
  width: 500px;
  height: 500px;
}
</style>

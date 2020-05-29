<template>
  <ul>
    <li>ID: {{ detail.id }}</li>
    <li>Title: {{ detail.title }}</li>
    <li>Content: {{ detail.content }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    id: Number,
    count: Number
  },
  data() {
    return {
      details: [],
      detail: {},
    };
  },
  created() {
    console.log("messageDetail created()");

    setTimeout(() => {
      // console.log(this.$route.query);

      const details = [
        { id: 1, title: "title001", content: "content001" },
        { id: 2, title: "title002", content: "content002" },
        { id: 3, title: "title003", content: "content003" },
        { id: 4, title: "title004", content: "content004" },
      ];

      // 查找当前选中的detail数据
      // 获取params参数
      const id = +this.$route.params.id;
      // const id = this.$route.params.id * 1;
      // const id = this.$route.params.id / 1;
      // const id = this.$route.params.id - 0;

      const detail = details.find((item) => item.id === id);

      this.detail = detail;
      this.details = details;
    }, 1000);
  },
  watch: {
    // 浅度监视，只会监视对象的第一层属性
    // 因为每次更新时，$route都会创建一个新对象 ，而不是原对象
    // 所以所有数据都是新的，可以监视的
    $route(to, from) {
      // 对路由变化作出响应...
      const id = +to.params.id;
      const detail = this.details.find((item) => item.id === id);
      this.detail = detail;
    },
  },
  beforeDestroy() {
    console.log("messageDetail beforeDestroy()");
  },
};
</script>

<style></style>

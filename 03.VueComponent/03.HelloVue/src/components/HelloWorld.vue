<template>
  <div>
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "hello world~~",
    };
  },
};
</script>

<style scoped>
/* 
  scoped 让样式只在当前组件生效（类似于作用域） 
*/
.title {
  color: yellowgreen;
}
</style>

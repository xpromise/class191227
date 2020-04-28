<template>
  <h1>About组件</h1>
</template>

<script>
export default {
  name: 'about',
  created() {
    console.log("about created()");
  },
  beforeDestroy() {
    console.log("about beforeDestroy()");
  },
};
</script>

<style></style>

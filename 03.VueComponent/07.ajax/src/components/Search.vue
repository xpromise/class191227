<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input
        type="text"
        placeholder="enter the name you search"
        v-model="searchName"
      />
      <button @click="search">Search</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchName: "",
    };
  },
  methods: {
    search() {
      // 收集数据
      const searchName = this.searchName.trim();
      // 触发事件
      this.$bus.$emit("search-name", searchName);
    },
  },
};
</script>

<style scoped></style>

<template>
  <div>
    <h3>Child组件...</h3>
    <button @click="add">添加</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      person: {
        id: 2,
        name: "rose",
      },
    };
  },
  methods: {
    add() {
      // 触发add-person事件，才能将person数据传递给App组件
      this.$emit("add-person", this.person);
    },
  },
};
</script>

<style></style>

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
      // 通过原型链找到位于Vue原型对象上的vm，通过vm触发事件
      this.$globalEventBus.$emit("add-person", this.person);
    },
  },
};
</script>

<style></style>

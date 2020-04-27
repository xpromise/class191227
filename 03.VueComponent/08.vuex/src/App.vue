<template>
  <div>
    <p>
      clicked: {{ this.$store.state.count }} times, count is {{ oddOrEven }}
    </p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
export default {
  mounted() {
    /*
      更新数据和读取数据的方法都在store中
        读取数据 this.$store.state.xxx
        更新数据 
          触发actions this.$store.dispatch('xxx')
          触发mutaions this.$store.commit('xxx')
    */
    // console.log(this.$store);
  },
  computed: {
    oddOrEven() {
      return this.$store.state.count % 2 === 1 ? "奇数" : "偶数";
    },
  },
  methods: {
    increment() {
      // 触发actions --> increment action函数的调用
      this.$store.dispatch("increment");
    },
    decrement() {
      this.$store.dispatch("decrement");
    },
    incrementIfOdd() {
      this.$store.dispatch("incrementIfOdd");
    },
    incrementAsync() {
      this.$store.dispatch("incrementAsync");
    },
  },
};
</script>

<style></style>

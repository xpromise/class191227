<template>
  <div>
    <p>clicked: {{ count }} times, count is {{ oddOrEven }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    oddOrEven() {
      return this.count % 2 === 1 ? "奇数" : "偶数";
    },
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    incrementIfOdd() {
      // 判断是否是奇数
      if (this.count % 2 === 1) {
        this.count++;
      }
    },
    incrementAsync() {
      // 模拟异步加法
      setTimeout(() => {
        this.count++;
      }, 1000);
    },
  },
};
</script>

<style></style>

<template>
  <div>
    <!-- <p>
      clicked: {{ $store.state.count }} times, count is
      {{ $store.getters.oddOrEven }}
    </p> -->
    <p v-lower-text="'HELLO atguigu'"></p>
    <p>
      clicked: {{ count }} times, count is
      {{ oddOrEven }}
    </p>
    <button @click="INCREMENT">+</button>
    <button @click="DECREMENT">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
/*
  mapState, 遍历vuex/store的state数据，添加组件实例对象上，作为计算属性
  mapGetters, 遍历vuex/store的getters数据，添加组件实例对象上,作为计算属性
  mapActions, 遍历vuex/store的actions方法，添加组件实例对象上，作为方法
  mapMutations 遍历vuex/store的mutations方法，添加组件实例对象上，作为方法
*/
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  mounted() {
    /*
      更新数据和读取数据的方法都在store中
        读取普通数据 this.$store.state.xxx
        读取计算属性数据 this.$store.getters.xxx
        更新数据 
          触发actions this.$store.dispatch('xxx')
          触发mutations this.$store.commit('xxx')
    */
    // console.log(this.$store);
    this.$vmMethod();
  },
  computed: {
    // oddOrEven() {
    //   return this.$store.state.count % 2 === 1 ? "奇数" : "偶数";
    // },

    /*
      mapState是一个函数
      mapState(["count"]) 返回值是一个对象
        {
          count: function () {
            xxxx
          }
        }
      ...mapState(["count"]) 将返回值对象展开到另外一个对象中
    */
    ...mapState(["count"]),
    ...mapGetters(["oddOrEven"]),
  },
  methods: {
    /* increment() {
      // 触发actions --> increment action函数的调用
      // this.$store.dispatch("increment");
      // 如果action没有任何其他逻辑，只是触发调用mutation方法
      // 那么更好的方式是再组件中直接触发调用mutation方法
      this.$store.commit("INCREMENT");
    },
    decrement() {
      this.$store.commit("DECREMENT");
    },
    incrementIfOdd() {
      this.$store.dispatch("incrementIfOdd");
    },
    incrementAsync() {
      this.$store.dispatch("incrementAsync");
    }, */
    ...mapActions(["incrementIfOdd", "incrementAsync"]),
    ...mapMutations(["INCREMENT", "DECREMENT"]),
  },
};
</script>

<style></style>

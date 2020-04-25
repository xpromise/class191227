<template>
  <div>
    <h1>App组件...</h1>
    <ul>
      <li v-for="person in persons" :key="person.id">
        {{ person.name }}
      </li>
    </ul>
    <!-- 
      给Child组件绑定自定义事件：
        事件名：add-person
        事件回调函数：addPerson

      事件名一般没有大写  

      addPerson 触发事件传入什么参数，就能接受什么参数
      addPerson() 触发事件传入参数就无效了
    -->
    <!-- <Child @add-person="addPerson" /> -->

    <!-- 
      ref 获取DOM元素或组件实例对象
        如果ref设置到普通html元素上，得到就是这个DOM元素
        如果ref设置到组件上，得到就是组件实例对象
     -->
    <Child ref="child" />
  </div>
</template>

<script>
import Child from "@comps/Child";
/*
  需求：点击Child组件按钮，向父组件App传递person数据（子组件向父组件通信）
*/
export default {
  data() {
    return {
      persons: [{ id: 1, name: "jack" }],
    };
  },
  // 生命周期函数
  created() {
    // 在数据代理之后执行
    // 此时html元素还没有创建 / 组件的实例对象还没有创建
    // console.log(this.$refs.child); // undefined
  },
  mounted() {
    // 通过原型链找到位于Vue原型对象上的vm，通过vm绑定事件
    this.$globalEventBus.$on("add-person", this.addPerson);
  },
  beforeDestory() {
    // 组件销毁之前，解绑自定义事件
    this.$globalEventBus.$off("add-person", this.addPerson);
  },
  methods: {
    addPerson(person) {
      this.persons.push(person);
    },
  },
  components: {
    Child,
  },
};
</script>

<style></style>

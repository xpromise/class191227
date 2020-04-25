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
    <Child @add-person="addPerson" />
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

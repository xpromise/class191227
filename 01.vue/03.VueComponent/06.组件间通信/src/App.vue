<template>
  <div>
    <h1>App组件...</h1>

    <Child>
      <!-- 
        默认插槽：（没有名称的插槽）
        template模板数据就会以slot方式传入Child组件 
        注意：要传入给子组件的数据都要在Child标签内部

        问题：子组件不能选择位置渲染，默认标签只能渲染到一个位置
      -->
      <!-- <template>
        <h3>子组件标题~~~</h3>
      </template>
      <template>
        <ul>
          <li v-for="person in persons" :key="person.id">
            {{ person.name }}
          </li>
        </ul>
      </template> -->

      <!-- 
        具名插槽/命名插槽
          父组件通过给模板标签取一个属性：v-slot:xxx
          子组件就能通过属性来渲染指定的模板标签

          用法：
            <template slot="list"></template>  即将废弃（在未来的新版本，不能使用）
            <template v-slot:title></template> 2.6版本推荐使用
            <template #title></template> 是上面这种的简写。 2.6版本推荐使用
       -->
      <!-- <template v-slot:title> -->
      <!-- <template #title> -->
      <!-- <template slot="title"> -->
      <!-- <h3>子组件标题~~~</h3> -->
      <!-- </template> -->
      <!-- <template v-slot:list> -->
      <!-- <template #list> -->
      <!-- <template slot="list"> -->
      <!-- <ul>
          <li v-for="person in persons" :key="person.id">
            {{ person.name }}
          </li>
        </ul>
      </template> -->

      <!-- 
        前置知识：
          父组件有父组件作用域，只能读取使用当前作用域数据
          子组件有子组件作用域，只能读取使用当前作用域数据
          父组件通常情况下是不能读取子组件数据使用的。

        需求：父组件需要子组件数据来渲染插槽中模板标签  
        解决：作用域插槽
          能够使用子组件数据渲染模板，在传递给子组件（父组件数据也可以使用）

       -->
      <template #title>
        <h3>子组件标题~~~</h3>
      </template>
      <!-- 父组件需要声明接受子组件传递的数据 -->
      <!-- <template #list="data"> -->
      <!-- 支持对传递的数据进行对象结构赋值 -->
      <template #list="{ persons }">
        <ul>
          <!-- <li v-for="person in data.persons" :key="person.id"> -->
          <li v-for="person in persons" :key="person.id">
            {{ person.name }}
          </li>
        </ul>
      </template>
    </Child>
  </div>
</template>

<script>
import Child from "@comps/Child";

export default {
  // data() {
  //   return {
  //     persons: [
  //       { id: 1, name: "jack" },
  //       { id: 2, name: "rose" },
  //     ],
  //   };
  // },
  components: {
    Child,
  },
};
</script>

<style scoped></style>

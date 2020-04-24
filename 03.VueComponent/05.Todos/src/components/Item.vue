<template>
  <li>
    <label>
      <!-- 
          v-model是双向数据绑定，
          导致问题：会直接修改App组件  
          注意：不应该直接修改App组件数据，应该通过App组件的方法来修改
      -->
      <!-- <input type="checkbox" v-model="todo.completed" /> -->
      <input type="checkbox" v-model="isCompleted" />
      <span>{{ todo.name }}</span>
    </label>
    <button class="btn btn-danger" style="display:none">删除</button>
  </li>
</template>

<script>
export default {
  props: {
    todo: Object,
    updateTodo: Function,
  },
  computed: {
    // 计算属性
    isCompleted: {
      get() {
        // 读取属性调用的方法
        return this.todo.completed;
      },
      set(val) {
        // 设置属性调用的方法
        // 调用父组件的方法更新数据
        this.updateTodo(this.todo.id, val);
      },
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>

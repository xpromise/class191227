<template>
  <ul class="todo-main">
    <Item
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      :updateTodo="updateTodo"
      :delTodo="delTodo"
    />
  </ul>
</template>

<script>
import Item from "@comps/Item";
export default {
  data() {
    return {
      // 因为有可能没有值，没有就是null，不行
      todos: JSON.parse(window.localStorage.getItem("todos")) || [],
    };
  },
  mounted() {
    this.$bus.$on("add-todo", this.addTodo);
    this.$bus.$on("handle-select-all", this.handleSelectAll);
    this.$bus.$on("del-completed-todo", this.delCompletedTodo);
    this.$bus.$emit("receive-todos", this.todos);
  },
  beforeDestory() {
    this.$bus.$off("add-todo", this.addTodo);
    this.$bus.$off("handle-select-all", this.handleSelectAll);
    this.$bus.$off("del-completed-todo", this.delCompletedTodo);
  },
  methods: {
    // 更新todo的方法
    updateTodo(id, completed) {
      /* this.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.completed = completed;
        }
      }); */

      // find方法 里面函数返回值true就找到了并返回找到的元素，返回值false就没找到就会继续找
      const todo = this.todos.find((todo) => todo.id === id);
      todo.completed = completed;
    },
    addTodo(name) {
      // 设计函数：功能单一、使用简单
      this.todos.unshift({ id: Date.now(), name, completed: false });
    },
    // 删除todo
    delTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    // 全选/全部选
    handleSelectAll(isSelectAll) {
      this.todos.forEach((todo) => {
        todo.completed = isSelectAll;
      });
    },
    // 删除已选中的todo数据
    delCompletedTodo() {
      /*
        要不要定义形参：看函数内部有没有值是不确定的。
          如果有不确定的值，就需要定义，由外面传入
          如果没有，就不需要定义
      */
      this.todos = this.todos.filter((todo) => !todo.completed);
    },
  },
  watch: {
    // 深度监视：监视todos所有值的变化
    todos: {
      deep: true,
      handler(val) {
        // 将todos传递给Footer组件
        this.$bus.$emit("receive-todos", this.todos);
        window.localStorage.setItem("todos", JSON.stringify(val));
      },
    },
  },
  components: {
    Item,
  },
};
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>

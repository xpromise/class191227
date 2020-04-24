<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :updateTodo="updateTodo" :delTodo="delTodo" />
      <Footer
        :todos="todos"
        :handleSelectAll="handleSelectAll"
        :delCompletedTodo="delCompletedTodo"
      />
    </div>
  </div>
</template>

<script>
import Header from "@comps/Header";
import List from "@comps/List";
import Footer from "@comps/Footer";

export default {
  data() {
    return {
      // 因为有可能没有值，没有就是null，不行
      todos: JSON.parse(window.localStorage.getItem("todos")) || [],
    };
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
    // 添加todo
    // addTodo(todo) {
    //   this.todos.unshift(todo);
    // },
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
    // 浅度监视，只能监视todos的第一层属性的变化，todos里面对象监视不到
    // todos(val) {
    //   // 监视todos的变化，一旦变化就存储起来
    //   window.localStorage.setItem("todos", JSON.stringify(val));
    // },

    // 深度监视：监视todos所有值的变化
    todos: {
      deep: true,
      handler(val) {
        window.localStorage.setItem("todos", JSON.stringify(val));
      },
    },
  },
  components: {
    Header,
    List,
    Footer,
  },
};
</script>

<style scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>

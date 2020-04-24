<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :updateTodo="updateTodo" :delTodo="delTodo"/>
      <Footer />
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
      todos: [
        { id: 1, name: "吃饭", completed: false },
        { id: 2, name: "睡觉", completed: false },
        { id: 3, name: "打猪", completed: true },
      ],
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

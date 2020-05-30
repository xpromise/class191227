/*
 应用主组件
*/
import React, { Component } from "react";

import Header from "./pages/Header";
import Footer from "./pages/Footer";
import List from "./pages/List";

// 引入样式文件 --> 为了让webpack打包它
import "./App.css";

class App extends Component {
  // 初始化状态
  state = {
    todos: [
      { id: 1, name: "吃饭", isCompleted: false },
      { id: 2, name: "睡觉", isCompleted: false },
    ],
  };

  id = 3;

  // 状态数据定义在哪，更新状态数据的方法就应该定义在哪？
  addTodo = (name) => {
    // 之前的数据
    const { todos } = this.state;
    this.setState({
      // 必须要保证更新的数据是一个全新数据（不能push unshift）
      todos: [{ id: this.id++, name, isCompleted: false }, ...todos],
    });
  };

  updateTodo = (id, isCompleted) => {
    const { todos } = this.state;

    this.setState({
      todos: todos.map((todo) => {
        // map既能更新数组中所有值，也能只更新指定值
        if (todo.id === id) {
          return {
            id: todo.id,
            name: todo.name,
            isCompleted,
          };
        }
        return todo;
      }),
    });
  };

  checkAll = (isCheckAll) => {
    const { todos } = this.state;
    console.log(isCheckAll);

    this.setState({
      todos: todos.map((todo) => {
        // map既能更新数组中所有值，也能只更新指定值
        return {
          id: todo.id,
          name: todo.name,
          isCompleted: isCheckAll,
        };
      }),
    });
  };

  render() {
    // 读取state
    const { todos } = this.state;

    // 计算：总数
    const allCount = todos.length;
    // 已完成数量
    const completedCount = todos.reduce((p, c) => {
      return p + (c.isCompleted ? 1 : 0);
    }, 0);

    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo} />
          <List todos={todos} updateTodo={this.updateTodo} />
          <Footer
            allCount={allCount}
            completedCount={completedCount}
            checkAll={this.checkAll}
          />
        </div>
      </div>
    );
  }
}

export default App;

/*
 应用主组件
*/
import React, { Component } from "react";

import Header from "./pages/Header";
import Footer from "./pages/Footer";
import List from "./pages/List";

// 引入样式文件 --> 为了让webpack打包它
import './App.css';

class App extends Component {
  // 初始化状态
  state = {
    todos: [
      {id: 1, name: '吃饭', isCompleted: false},
      {id: 2, name: '睡觉', isCompleted: false},
    ]
  }

  render() {
    // 读取state
    const { todos } = this.state;

    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header />
          <List todos={todos}/>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;

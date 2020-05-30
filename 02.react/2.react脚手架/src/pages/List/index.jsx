import React, { Component } from "react";
import PropTypes from "prop-types";

import Item from "../Item";

import "./index.css";

export default class List extends Component {
  // 对props数据进行类型和必要性限制（作用：让代码在编译时就能发现错误）
  static propTypes = {
    todos: PropTypes.array.isRequired,
  };

  render() {
    // 读取props
    const { todos } = this.props;

    return (
      <ul className="todo-main">
        {todos.map((todo) => {
          // 遍历的每一项元素需要有一个唯一的key属性(有id用id)
          return <Item key={todo.id} todo={todo} />;
        })}
      </ul>
    );
  }
}

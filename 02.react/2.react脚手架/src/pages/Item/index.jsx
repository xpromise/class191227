import React, { Component } from "react";
import PropTypes from "prop-types";

import "./index.css";

export default class Item extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    updateTodo: PropTypes.func.isRequired,
  };

  handleChange = (e) => {
    // console.log(e.target.checked); // checkbox 有无选中
    const { updateTodo, todo } = this.props;
    updateTodo(todo.id, e.target.checked);
  };

  render() {
    const { name, isCompleted } = this.props.todo;

    return (
      <li>
        <label>
          <input
            type="checkbox"
            // 在Vue中通过v-model就能实现 input value
            // 但是React中必须自己实现
            onChange={this.handleChange}
            checked={isCompleted}
          />
          <span>{name}</span>
        </label>
        {/* {{}}: 第一个括号：JSX语法，代表里面写JS代码  第二个括号：代表是一个对象数据 */}
        <button className="btn btn-danger" style={{ display: "none" }}>
          删除
        </button>
      </li>
    );
  }
}

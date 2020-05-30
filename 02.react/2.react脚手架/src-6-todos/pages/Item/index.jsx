import React, { Component } from "react";
import PropTypes from "prop-types";

import "./index.css";

export default class Item extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    updateTodo: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
  };

  handleChange = (e) => {
    // console.log(e.target.checked); // checkbox 有无选中
    const { updateTodo, todo } = this.props;
    updateTodo(todo.id, e.target.checked);
  };

  /*
    Vue中一旦data数据发生变化，即会更新data数据，又会更新用户界面
    React中不管你怎么改动数据，用户界面是不会更新的，只有调用this.setState才能更新用户界面
    结论：如果数据涉及到用户界面的更新，就要定义在state中
          如果不用，就可以定义一个普通属性
 */
  // OK
  state = {
    display: "none",
  };
  // 不行
  // display = "none";

  handleEnter = () => {
    // 怎么样控制显示隐藏？
    this.setState({
      display: "block",
    });
  };

  handleLeave = () => {
    this.setState({
      display: "none",
    });
  };

  handleDel = () => {
    const { id } = this.props.todo;
    if (window.confirm("你确认要删除当前数据吗？")) {
      this.props.delTodo(id);
    }
  };

  render() {
    const { name, isCompleted } = this.props.todo;

    return (
      <li onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
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
        <button
          className="btn btn-danger"
          style={{ display: this.state.display }}
          onClick={this.handleDel}
        >
          删除
        </button>
      </li>
    );
  }
}

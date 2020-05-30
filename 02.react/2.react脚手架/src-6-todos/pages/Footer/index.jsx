import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.css";

export default class Footer extends Component {
  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    allCount: PropTypes.number.isRequired,
    checkAll: PropTypes.func.isRequired,
    delCompletedTodos: PropTypes.func.isRequired,
  };

  handleChange = (e) => {
    this.props.checkAll(e.target.checked);
  };

  handleDel = () => {
    if (window.confirm("你确认要删除已完成任务吗")) {
      this.props.delCompletedTodos();
    }
  };

  render() {
    const { allCount, completedCount, delCompletedTodos } = this.props;

    return (
      <div className="todo-footer">
        <label>
          <input
            type="checkbox"
            checked={!!allCount && completedCount === allCount}
            onChange={this.handleChange}
          />
        </label>
        <span>
          <span>已完成{completedCount}</span> / 全部{allCount}
        </span>
        <button className="btn btn-danger" onClick={this.handleDel}>
          清除已完成任务
        </button>
      </div>
    );
  }
}

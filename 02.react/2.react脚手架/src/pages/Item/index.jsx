import React, { Component } from "react";
import PropTypes from "prop-types";

import "./index.css";

export default class Item extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
  };

  render() {
    const { name } = this.props.todo;

    return (
      <li>
        <label>
          <input type="checkbox" />
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

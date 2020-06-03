import React, { Component } from "react";
import { Button, message } from "antd";

import "antd/dist/antd.min.css";

export default class App extends Component {
  handleClick = () => {
    message.success("hello antd~");
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>默认按钮</Button>
        <Button type="primary">经典按钮</Button>
        <Button type="danger">危险按钮</Button>
      </div>
    );
  }
}

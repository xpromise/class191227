import React, { Component } from "react";
import PubSub from "pubsub-js";

import Child from "./Child";

export default class App extends Component {
  handleClick = () => {
    // 发送消息
    console.log("App组件发送了数据~");
    PubSub.publish("RECEIVE_DATA", "您真好看~");
  };

  render() {
    return (
      <div>
        App...
        <button onClick={this.handleClick}>点击按钮向子组件传递数据</button>
        <Child />
      </div>
    );
  }
}

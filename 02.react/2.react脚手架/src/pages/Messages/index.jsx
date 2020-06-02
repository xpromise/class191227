import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import Detail from "../Detail";

export default class Messages extends Component {
  /*
    路由跳转有两种方式：
      1. 使用路由链接导航：Link / NavLink 跳转
      2. 使用编程式导航: history.push/replace(path)

    什么时候用第一种？什么时候用第二种？
      如果仅仅只需要跳转地址，不需要做其他事：用第一种
      如果你需要发送请求（如：登录按钮，点击需要将收集的数据发送到后台，验证成功才能跳转）
      收集数据等其他事，做完才能跳转：用第二种

    路由传参:
      1. /home/message/5 --> params参数  this.props.match.params
      2. this.props.history.push("xxx", data); --> state参数 
        注意： 
          hash history没有这个功能
          browser history才有
  */

  // 编程式导航
  push = () => {
    this.props.history.push("/home/message/5", { name: "jack" });
  };
  replace = () => {
    this.props.history.replace("/home/message/3");
  };
  goForward = () => {
    this.props.history.goForward();
  };
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <>
        <ul>
          <li>
            {/* 路由导航链接 */}
            <Link to="/home/message/1">message001</Link>
          </li>
          <li>
            <Link to="/home/message/3">message003</Link>
          </li>
          <li>
            <Link to="/home/message/5">message005</Link>
          </li>
        </ul>
        <button onClick={this.push}>添加</button>
        <button onClick={this.replace}>替换</button>
        <button onClick={this.goForward}>前进</button>
        <button onClick={this.goBack}>后退</button>
        <Route path="/home/message/:id" component={Detail} />
      </>
    );
  }
}

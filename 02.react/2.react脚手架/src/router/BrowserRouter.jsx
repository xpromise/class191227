/*
  BrowserRouter:
    用来给后代组件提供三大属性：location、history、match
    1. 三大属性怎么产生？
      history --> 来源于 history 库
      location --> history.location
      match --> 自己定义（{}）
    
    2. 怎么给后代组件提供数据？
      context
*/

import React, { Component } from "react";
import { createBrowserHistory } from "history";

import context from "./context";

// 创建history对象
const history = createBrowserHistory();
/*
  1. 在哪个组件更新？
    BrowserRouter 只有一个
    而 Link / Route 有多个
  2. 什么时候需要更新？ 
    当浏览历史记录变化时才需要更新
      history.listen()  监听一次
*/
export default class BrowserRouter extends Component {
  state = {
    location: history.location,
  };

  componentDidMount() {
    // 返回值是解绑事件的方法
    this.unlisten = history.listen((location) => {
      // console.log("listen方法调用了", location);
      // this.setState({}); // 更新当前组件 问题：就是因为没有更新实际的数据，将来可能被PureComponent优化
      this.setState({ location }); // 更新当前组件
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return (
      // 给后代组件传递路由组件三大属性
      <context.Provider
        value={{ history, location: this.state.location, match: {} }}
      >
        {/* 
          如何把后代组件放在这个位置? 
          <A><B /><C /></A> 
            --> 组件A内部就能通过 this.props.children 获取组件标签中所有内容（组件B和组件C）
        */}
        {this.props.children}
      </context.Provider>
    );
  }
}

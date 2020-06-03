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

export default class BrowserRouter extends Component {
  render() {
    return (
      // 给后代组件传递路由组件三大属性
      <context.Provider
        value={{ history, location: history.location, match: {} }}
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

import React, { Component } from "react";
import ReactDOM from "react-dom";

import Child from "./Child";

/*
  React函数中的this：
    1. 生命周期函数的this指向组件实例对象
    2. 其他函数默认是undefined，所以要改成箭头函数

  三个流程:
    1. 初始化
      constructor
      componentWillMount
      render
      componentDidMount
    2. 更新
      更新有三种方式触发：
        1. 父组件this.setState导致子组件重新渲染，子组件会触发：
          componentWillReceiveProps
          shouldComponentUpdate
          componentWillUpdate
          render
          componentDidUpdate
        2. 父组件this.setState, 父组件触发：
          shouldComponentUpdate
          componentWillUpdate
          render
          componentDidUpdate
        3. 父组件this.forceUpdate, 父组件触发：
          componentWillUpdate
          render
          componentDidUpdate  
    3. 卸载
      componentWillUnmount     

    重要生命周期函数：
      componentDidMount
        发送请求、设置定时器、绑定事件等一次性任务
      shouldComponentUpdate
        性能优化
          返回值 true 要更新
          返回值 false 不更新
      componentWillUnmount
        取消请求、清除定时器、解绑事件等收尾工作

    不安全，在未来新版本即将废弃（可能会调用多次）
      componentWillMount
      componentWillReceiveProps
      componentWillUpdate
        不建议使用以上三个   
    
    新生命周期函数扩展了两个：
      static getDerivedStateFromProps
      getSnapshotBeforeUpdate    
*/
export default class App extends Component {
  constructor() {
    super(); // 调用父类的构造函数
    console.log("App  constructor()");
  }

  componentDidMount() {
    console.log("App  componentDidMount()");
  }

  componentWillMount() {
    console.log("App  componentWillMount()");
  }

  componentWillReceiveProps() {
    console.log("App  componentWillReceiveProps()");
  }

  shouldComponentUpdate() {
    console.log("App  shouldComponentUpdate()");
    // 专门做性能优化
    return true; // 代表要重新渲染
    // return false; // 代表不要重新渲染
  }

  componentWillUpdate() {
    console.log("App  componentWillUpdate()");
  }

  componentDidUpdate() {
    console.log("App  componentDidUpdate()");
  }

  componentWillUnmount() {
    console.log("App   componentWillUnmount()");
  }

  render() {
    console.log("App  render()");
    return (
      <div
        onClick={() => {
          // this.setState({});
          // this.forceUpdate(() => {}); // 强制更新（用得少）

          // 将root节点上挂载的组件卸载掉
          // ReactDOM.unmountComponentAtNode(document.getElementById("root"));
        }}
      >
        <h1>React生命周期函数</h1>
        <Child />
      </div>
    );
  }
}

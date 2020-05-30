import React, { Component } from "react";

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

*/
export default class Child extends Component {
  constructor() {
    super(); // 调用父类的构造函数
    console.log("constructor()");
  }

  componentDidMount() {
    console.log("componentDidMount()");
  }

  componentWillMount() {
    console.log("componentWillMount()");
  }

  componentWillReceiveProps() {
    console.log("componentWillReceiveProps()");
  }

  shouldComponentUpdate() {
    console.log("shouldComponentUpdate()");
    return true;
  }

  componentWillUpdate() {
    console.log("componentWillUpdate()");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate()");
  }

  render() {
    console.log("render()");
    return <h1>React生命周期函数</h1>;
  }
}

import React, { Component } from "react";
/*
  高阶组件：HOC
    概念：本质上是一个函数：执行函数接受一个组件作为参数，返回值是一个新组件
    作用：复用组件代码

*/

export default function withForm(title) {
  return function (WrappedComponent) {
    // WrappedComponent组件
    return class extends Component {
      // 新组件
      // 将WrappedComponent组件的公共代码 提取到新组件内部中，从而复用
  
      // 给高阶组件命名 --> displayName优先级最高
      static displayName = `Form(${
        WrappedComponent.displayName || WrappedComponent.name || "Component"
      })`;
  
      // 高阶函数
      handleChange = (key) => {
        return (e) => {
          this.setState({
            [key]: e.target.value.trim(),
          });
        };
      };
  
      handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
      };
  
      render() {
        return (
          <>
            <h1>{title}</h1>
            <WrappedComponent
              // 使用props方式 将复用的代码传递给你
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </>
        );
      }
    };
  }
}
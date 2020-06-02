// npm i react react-dom
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

// const vDom = <h1>hello react cli</h1>;

/*
  1. 定义组件有哪些注意事项
    1. 组件名首字母必须大写
      原因是：
        JSX一旦标签 <myComponent1 /> 首字母小写就会当做html元素解析，
        但是html中没有myComponent1这个元素就会报错
        所以首字母大写 <MyComponent1 />，就会当做组件解析
        内部会判断是工厂函数还是ES6类组件
    2. 内部返回虚拟DOM对象元素必须有结束符
        单标签自结束标签
        双标签
    3. 内部返回多个虚拟DOM对象，必须有且有一个根标签

  2. 工厂函数组件和ES6类组件的区别
    1. this不一样
      工厂函数没有this
      ES6类组件函数中有this
    2. 功能不一样
      因为工厂函数没有this，有些功能默认实现不了
      因为ES6类组件有this，所以可以实现  

  总结：
    工厂函数组件一般用来定义功能简单组件
    ES6类组件一般用来定义功能复杂组件
*/

// 定义工厂函数组件
/* function MyComponent1() {
  console.log('工厂函数', this);
  
  // 组件内部返回要渲染的虚拟DOM对象
  return (
    <div>
      <input />
      <input />
    </div>
  );
} */

// 定义ES6类组件
/* class MyComponent2 extends React.Component {
  // 组件内部返回要渲染的虚拟DOM对象 --> 通过render方法返回
  render() {
    console.log('ES6类组件', this); // this指向ES6类组件实例对象
    return <h1>ES6类组件</h1>;
  }
}
 */

// 使用组件: 组件标签方式使用
/* ReactDOM.render(
  <div>
    <MyComponent1 />
    <MyComponent2></MyComponent2>
  </div>,
  document.getElementById("root")
); */

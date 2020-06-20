import React from "./lib/react";
import ReactDOM from "./lib/react-dom";

// 创建虚拟DOM对象
const vDom = (
  <ul id="list" className="list">
    <li>111</li>
    <li className="child">
      <span>222</span>
    </li>
    <li onClick={() => console.log(333)}>333</li>
    <li onClick={() => console.log(444)}>444</li>
  </ul>
);

// 创建ES6类组件
class ClassComp extends React.Component {
  render() {
    return (
      <h1 id="title" className="title">
        hello react
        <FuncComp />
      </h1>
    );
  }
}

// console.log(<ClassComp />);

// 创建工厂函数组件
function FuncComp() {
  return (
    <h1 id="title" className="title">
      hello react
    </h1>
  );
}

// console.log(<FuncComp />);
ReactDOM.render(<ClassComp />, document.getElementById("root"));

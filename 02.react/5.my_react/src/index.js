import React from "./lib/react";
// import ReactDOM from "react-dom";

// 创建虚拟DOM对象
const vDom = (
  <h1 id="title" className="title">
    hello react
  </h1>
);

console.log(vDom);

// 创建ES6类组件
class ClassComp extends React.Component {
  render() {
    return (
      <h1 id="title" className="title">
        hello react
      </h1>
    );
  }
}

console.log(<ClassComp />);

// 创建工厂函数组件
function FuncComp() {
  return (
    <h1 id="title" className="title">
      hello react
    </h1>
  );
}

console.log(<FuncComp />);

// ReactDOM.render(vDom, document.getElementById("root"));

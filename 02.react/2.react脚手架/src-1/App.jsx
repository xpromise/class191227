/*
 应用主组件
*/
import React from "react";

// 引入其他组件
import FuncComp from "./pages/FuncComp";
import ClassComp from "./pages/ClassComp";

// 定义ES6类组件，组件名App
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App...</h1>
        {/* 以组件标签的方式 使用组件 */}
        <FuncComp />
        <ClassComp />
      </div>
    );
  }
}

// 暴露组件语法
export default App;

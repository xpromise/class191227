// 为什么函数组件没有使用React，还需要引入
import React from "react";

function FuncComp() {
  console.log("工厂函数", this);

  // 组件内部返回要渲染的虚拟DOM对象
  return <div>FuncComp...</div>; // React.createElement()
}

export default FuncComp;

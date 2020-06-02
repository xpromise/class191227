import React from "react";

// 创建Context
const personContext = React.createContext({ name: "jack", age: 18 });

// 暴露出去
export default personContext;

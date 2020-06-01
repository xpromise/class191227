import React, { Component } from "react";

import FragmentDemo from "./pages/01.Fragment";

export default class App extends Component {
  render() {
    return (
      // Fragment最终不会生成多余的结构/元素
      // 空标签就相当于Fragment
      <>
        <FragmentDemo />
      </>
    );
  }
}

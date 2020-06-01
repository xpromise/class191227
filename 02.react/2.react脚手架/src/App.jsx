import React, { Component } from "react";

// import FragmentDemo from "./pages/01.Fragment";
// import Father from "./pages/02.context/Father";
// import Index from "./pages/03.性能优化";
// import ForwardRef from "./pages/04.forwardRef";
import Modal from "./pages/05.modal";

/*
  1. 引入context：
  2. context内部包含两个组件
    context.Provider 提供者（负责向后代组件提供数据）
    context.Consumer 消费者（负责消费数据，使用父（爷）组件提供的数据）
*/
// import personContext from "./pages/02.context/context";

export default class App extends Component {
  state = {
    person: {
      name: "xfz",
      age: 40,
    },
  };

  // xxRef = React.createRef();

  // componentDidMount() {
  //   console.log(this.xxRef);
  // }

  render() {
    return (
      // Fragment最终不会生成多余的结构/元素
      // 空标签就相当于Fragment
      <>
        {/* JSX中的注释： */}
        {/* <FragmentDemo />  */}

        {/* 
          personContext.Provider组件就会将 this.state.person 数据传递下去 
          注意：只有后代组件才能接受到
        */}
        {/* <personContext.Provider value={this.state.person}>
          <Father />
        </personContext.Provider> */}

        {/* <Index person={this.state.person}/> */}

        {/* <ForwardRef {...this.state.person} ref={this.xxRef}>
          <p>hello~~~</p>
        </ForwardRef> */}

        <button>点击显示Modal</button>

        <Modal title="app title~~~" content={<div>app content...</div>} />
      </>
    );
  }
}

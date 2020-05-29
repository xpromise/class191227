/*
 应用主组件
*/
import React from "react";

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.inputRef = React.createRef();
  // }
  // 给实例对象添加属性
  inputRef = React.createRef();

  handleClick = () => {
    // console.log(this.inputRef); // 没有挂载ref {current: null}
    // console.log(this.inputRef); // 挂载ref {current: input}
    const value = this.inputRef.current.value.trim();
    alert(value);
  };

  handleBlur = (e) => {
    // 触发事件元素和要收集数据元素是同一个元素，就e.target
    alert(e.target.value.trim()); // 触发事件的目标元素
  };

  render() {
    return (
      <div>
        <input type="text" placeholder="请输入内容" ref={this.inputRef} />
        <button onClick={this.handleClick}>点击提示数据</button>
        <input
          type="text"
          placeholder="失去焦点提示数据"
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

export default App;

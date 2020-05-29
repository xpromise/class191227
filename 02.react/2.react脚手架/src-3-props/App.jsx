/*
 应用主组件
*/
import React from "react";

import Child from "./pages/Child";

class App extends React.Component {
  state = {
    person: {
      name: "晓飞张",
      age: 40,
      sex: "男",
    },
  };

  updatePerson = (person) => {
    this.setState({
      person,
    });
  };

  render() {
    /*
      需求：将person数据传递给Child组件
      解决: 使用组件间通信 props
        父 --> 子 通信 使用普通属性
        子 --> 父 通信 使用函数属性
    */
    const { person } = this.state;

    return (
      <div>
        <h1>App...</h1>
        {/* 以标签属性方式（props）给子组件传递数据 */}
        <Child
          // name={person.name}
          // age={person.age}
          // sex={person.sex}
          {...person}
          updatePerson={this.updatePerson}
        />
      </div>
    );
  }
}

export default App;

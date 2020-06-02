import React, { Component } from "react";

import personContext from "./context";

/*
  context：组件间通信方案：适用于祖孙组件通信
    使用：
      1. 创建context.js文件（方便将来任意组件都可以使用）
        React.createContext(defaultValue) 
          defaultValue只有在没有定义Provider组件时，才能生效

      2. 上层组件使用Provider组件来向后代组件提供数据
        <Provider value={数据}> 子组件 </Provider>
      
      3. 后代组件接受上层组件提供的数据
        方案一：适用于接受到数据直接渲染
          <Consumer>{(数据) => { 使用 return 要渲染的虚拟DOM对象 }}</Consumer>
        方案二：适用于接受到数据后进行其他操作
          static contextType = context; 
          this.context 去使用
*/

export default class Son extends Component {
  static contextType = personContext;

  handleClick = () => {
    // console.log(this.person);
    console.log(this.context);
  };

  render() {
    return (
      <>
        <h3 onClick={this.handleClick}>Son...</h3>
        {/* personContext.Consumer组件，负责接受到爷组件传递的数据 */}
        <personContext.Consumer>
          {
            // 需要传一个函数，内部会调用函数，将接受到爷组件的数据传入到函数中
            (person) => {
              // console.log(person);
              const { name, age } = person;
              // this.person = person;
              // 函数的返回值，就是Consumer组件要渲染的内容
              return (
                <ul>
                  <li>姓名：{name}</li>
                  <li>年龄：{age}</li>
                </ul>
              );
            }
          }
        </personContext.Consumer>
      </>
    );
  }
}

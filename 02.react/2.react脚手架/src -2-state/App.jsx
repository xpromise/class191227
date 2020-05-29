/*
 应用主组件
*/
import React from "react";

/*
  ES6类组件 实例对象三大属性 state 状态
    作用：用来更新用户界面
    使用：
      1. 初始化状态
        constructor() {
          super();
          this.state = { xxx }
        }

          --> 简写

        state = {
          xxx
        }  

      2. 读取状态
        this.state.xxx 
      3. 更新状态
        this.setState({ xxx })

    在React 类组件中，this指向：
      1. 如果是生命周期函数中，this指向组件实例对象 constructor / render
      2. 如果在其他自定义函数中，this默认指向undefined（严格模式）
        需求: 需要将 其他自定义函数 this 指向组件实例对象
        解决：箭头函数
*/

class App extends React.Component {
  // constructor() {
  //   super();
  //   // 初始化状态
  //   this.state = {
  //     isLikeMe: false,
  //   };
  // }
  // 简写 --> 需要webpack添加babel插件~
  state = {
    isLikeMe: false,
  }

  /* handleClick() {
    // console.log("点我了~~");
    // 更新状态 --> 改变isLikeMe的值
    // 也会更新状态 也会更新用户界面
    console.log(this); // undefined

    this.setState({
      // Cannot read property 'setState' of undefined
      isLikeMe: true,
    });
  } */

  handleClick = () => {
    // console.log(this); // 组件实例对象

    // 读取状态
    const { isLikeMe } = this.state;
    // 用来更新用户界面的方法
    this.setState({
      isLikeMe: !isLikeMe,
    });
  };

  render() {
    /*
      在React绑定事件：
        1. onXxx 采用小驼峰命名法 
            如：onClick  onChange  onMouceMove
    */
    console.log("render()");

    // 读取state
    const { isLikeMe } = this.state;
    // 第一种问题：只要render调用，就需要重新创建函数，性能不好
    // return <h1 onClick={() => { console.log('点我了~~') }}>我喜欢你</h1>;
    // 第二种好
    return (
      <h1 onClick={this.handleClick}>{isLikeMe ? "你喜欢我" : "我喜欢你"}</h1>
    );
  }
}

// 暴露组件语法
export default App;

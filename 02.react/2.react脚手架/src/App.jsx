/*
 应用主组件
*/
import React from "react";

// 受控组件：通过state和onChange事件来自动收集表单数据
class App extends React.Component {
  state = {
    username: "",
    password: "",
  };

  login = (e) => {
    // 禁止表单的默认行为
    e.preventDefault();
    // 收集表单数据
    const { username, password } = this.state;
    console.log(username, password);
    // 清空用户数据
    this.setState({
      username: "",
      password: "",
    });
  };

  // 封装一个函数，来复用一下两个函数？ 提示：高阶函数（执行函数返回值是一个新函数）
  /*
    函数柯里化：
      function fn(a, b) { return a + b} 普通函数
        --> 经过函数柯里化处理的函数
          function fn(a) {
            return function (b) {
              return a + b;
            }
          }
      闭包的典型应用    
  */
  handleChange = (key) => {
    // 返回一个新函数（事件回调函数）
    return (e) => {
      this.setState({
        [key]: e.target.value.trim(),
      });
    };
  };

  /* handleUsernameChange = (e, stateKey) => {
    const username = e.target.value.trim();
    this.setState({
      username,
    });
  };

  handlePasswordChange = (e) => {
    const password = e.target.value.trim();
    this.setState({
      password,
    });
  }; */

  render() {
    const { username, password } = this.state;

    return (
      <form onSubmit={this.login}>
        用户名:
        <input
          type="text"
          // 在React中，事件都是合成事件，不是原生DOM事件
          // 合成事件：做了兼容性处理~
          onChange={this.handleChange("username")}
          value={username}
        />
        密码:
        <input
          type="password"
          onChange={this.handleChange("password")}
          value={password}
        />
        <button type="submit">登录</button>
      </form>
    );
  }
}

export default App;

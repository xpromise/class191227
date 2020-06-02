import React, { Component } from "react";
// 引入高阶组件
import withForm from "./withForm";

/*
  ES7 装饰器语法：
    装饰类

    @withForm('登录组件')
    class Login extends Component {}
    export default Login;

    // 等价于

    class Login extends Component {}
    Login = withForm('登录组件')(Login)
    export default Login

    代码在编译时，就会将上面代码编译成下面代码
    所以 真正运行时是下面代码 

    注意：装饰器是实验性功能，目前还不支持
    1. 需要修改Vscode --> experimentalDecorators
    2. babel不能识别 -->
      plugins: [ // 插件
        ["@babel/plugin-proposal-decorators", { legacy: true }], // 解决装饰器语法
        ["@babel/plugin-proposal-class-properties", { loose: true }], // 解决state={xxx}
      ],
*/

@withForm('登录组件')
class Login extends Component {
  // state = {
  //   username: "",
  //   password: "",
  // };

  // // 高阶函数
  // handleChange = (key) => {
  //   return (e) => {
  //     this.setState({
  //       [key]: e.target.value.trim(),
  //     });
  //   };
  // };

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(this.state);
  // };

  render() {
    const { handleChange, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        用户名：
        <input type="text" onChange={handleChange("username")} /> <br />
        密码：
        <input type="password" onChange={handleChange("password")} />
        <br />
        <button type="submit">登录</button>
      </form>
    );
  }
}

// 调用高阶组件，返回新组件
// const NewLogin = withForm(Login, '登录组件');

// 暴露新组件，新组件内部渲染Login组件
// export default withForm('登录组件')(Login);

// 使用了装饰器
export default Login;

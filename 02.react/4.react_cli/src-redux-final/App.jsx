import React, { Component } from "react";
import { connect } from "react-redux";

import { increment, decrement, incrementAsync } from "./redux/actions";

// 使用装饰器语法~
@connect(
  // 函数：给UI传递redux管理的状态数据
  (state) => ({
    // count: state, // 之前reducer只暴露一个内容，所以redux管理的状态数据就是count
    count: state.count, // 现在reducer暴露多个内容，他们都在一个对象上
  }),
  // 对象：值为actions，内部会封装成函数
  // 对象：给UI传递更新redux状态数据方法
  { increment, decrement, incrementAsync }
)
// UI组件（被包装组件）
class App extends Component {
  state = {
    number: 1,
  };

  handleChange = (e) => {
    this.setState({
      // 收集数据是字符串，转换为number
      number: +e.target.value,
    });
  };

  increment = () => {
    const { number } = this.state;
    this.props.increment(number);
  };

  decrement = () => {
    const { number } = this.state;
    this.props.decrement(number);
  };

  incrementIfOdd = () => {
    const { count } = this.props;
    // 如果是奇数就加
    if (count & 1) {
      const { number } = this.state;
      this.props.increment(number);
    }
  };

  incrementAsync = () => {
    const { number } = this.state;
    this.props.incrementAsync(number);
  };

  render() {
    // 读取状态，展示
    const { count } = this.props;

    return (
      <>
        <p>click {count} times</p>
        <select onChange={this.handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.incrementIfOdd}>increment if odd</button>
        <button onClick={this.incrementAsync}>increment async</button>
      </>
    );
  }
}

/************* 以下redux代码 *************/

/*
  connect(
    // 遍历redux管理的数据（取出部分需要使用的数据）以props方式传给UI组件
    mapStateToProps, 
    // 遍历更新redux数据的方法以props方式传给UI组件
    mapDispatchToProps
  )(UI)

  connect高阶组件，返回值是一个新组件 --> 容器组件
    作用：负责给被包装的UI组件传递redux的数据和更新数据的方法
*/

// 接受redux管理的状态数据作为参数
/* const mapStateToProps = (state) => {
  // 返回值是对象
  // 将来这个对象就会以props方式传递给UI组件
  // 所以UI组件能接受到一个属性count，值就是状态数据
  return {
    count: state,
  };
}; */

// 接受store.dispatch方法作为参数
/* const mapDispatchToProps = (dispatch) => {
  // 返回值是对象
  // 将来这个对象就会以props方式传递给UI组件
  return {
    // 更新redux数据的方法
    // 封装一个方法，将来UI组件使用起来更加方便
    increment(number) {
      // 调用actions生成action对象
      const action = increment(number);
      // 调用dispatch方法触发reducers函数，从而更新store状态数据
      dispatch(action);
    },
    decrement(number) {
      dispatch(decrement(number));
    },
  };
}; */

// 容器组件(包装组件)
// const Container = connect(mapStateToProps, mapDispatchToProps)(App);

// export default Container;

/* export default connect(
  // 函数：给UI传递redux管理的状态数据
  (state) => ({
    count: state,
  }),
  // 对象：值为actions，内部会封装成函数
  // 对象：给UI传递更新redux状态数据方法
  { increment, decrement }
)(App); */

export default App;

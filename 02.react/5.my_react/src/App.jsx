import React, { Component } from "react";
import { connect } from "./lib/react-redux";

import { increment, decrement } from "./redux/actions";

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
    setTimeout(() => {
      const { number } = this.state;
      this.props.increment(number);
    }, 1000);
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

export default connect(
  // 状态数据
  (state) => ({ count: state.count }),
  // 更新状态数据的方法
  {
    increment,
    decrement,
  }
)(App);

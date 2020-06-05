import React, { Component } from "react";

import store from "./redux/store";
import { increment, decrement } from "./redux/actions";

export default class App extends Component {
  state = {
    number: 1,
  };

  /* componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      // 一旦store管理的状态数据发生变化，就会调用
      this.setState({});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  } */

  handleChange = (e) => {
    this.setState({
      // 收集数据是字符串，转换为number
      number: +e.target.value,
    });
  };

  increment = () => {
    const { number } = this.state;
    // 调用actions生成action对象
    const action = increment(number);
    // 调用dispatch方法触发reducers函数，从而更新store状态数据
    store.dispatch(action);
  };

  decrement = () => {
    const { number } = this.state;
    store.dispatch(decrement(number));
  };

  incrementIfOdd = () => {
    const count = store.getState();
    // 如果是奇数就加
    if (count & 1) {
      const { number } = this.state;
      store.dispatch(increment(number));
    }
  };

  incrementAsync = () => {
    setTimeout(() => {
      const { number } = this.state;
      store.dispatch(increment(number));
    }, 1000);
  };

  render() {
    // 读取状态，展示
    const count = store.getState();

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

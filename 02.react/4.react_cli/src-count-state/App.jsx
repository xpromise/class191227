import React, { Component } from "react";

export default class App extends Component {
  state = {
    count: 0,
    number: 1,
  };

  handleChange = (e) => {
    this.setState({
      // 收集数据是字符串，转换为number
      number: +e.target.value,
    });
  };

  increment = () => {
    const { count, number } = this.state;
    this.setState({
      count: count + number,
    });
  };

  decrement = () => {
    const { count, number } = this.state;
    this.setState({
      count: count - number,
    });
  };

  incrementIfOdd = () => {
    const { count, number } = this.state;
    // 如果是奇数就加
    // if (count % 2 === 1) {}
    /*
      与 位运算
      A && B 
        A和B只要有一个是false，返回值false
        只有都是true，返回值是true
      A & B
        将其转换为2进制，取最后一位进行 && 运行
        A & 1 
          A 如果是奇数 末尾数就是 1，1 && 1 --> 1 true
          B 如果是偶数 末尾数就是 0，0 && 1 --> 0 false
    */
    if (count & 1) {
      this.setState({
        count: count + number,
      });
    }
  };

  incrementAsync = () => {
    setTimeout(() => {
      const { count, number } = this.state;
      this.setState({
        count: count + number,
      });
    }, 1000);
  };

  render() {
    const { count } = this.state;
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

import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Child extends Component {
  state = {
    opacity: 1,
  };

  componentDidMount() {
    // 在React中除了生命周期函数以外，其他函数最好定义箭头函数
    this.timeId = setInterval(() => {
      let { opacity } = this.state;
      opacity -= 0.01;
      if (opacity <= 0) opacity = 1;
      this.setState({
        opacity,
      });
    }, 1000 / 60);
  }

  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.timeId);
  }

  goDie = () => {
    // 卸载组件，React会把组件相关的东西干掉
    // React合成事件可以干掉的
    // 定时器、ajax请求、原生DOM事件这些React不会清楚的 --> 需要开发者手动清除
    ReactDOM.unmountComponentAtNode(document.getElementById("root"));
  };

  render() {
    const { opacity } = this.state;
    return (
      <div>
        <h1 style={{ opacity }}>React学不会咋整</h1>
        <button onClick={this.goDie}>不活了~</button>
      </div>
    );
  }
}

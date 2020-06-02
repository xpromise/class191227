import React, { Component } from "react";
import PropTypes from 'prop-types'
// import B from "./B";

/*
  hoc 复用代码 
    --> 本质上是一个函数，产生一个新组件
    --> 通过产生的新组件来复用代码（方法）
  render props 复用代码 
    --> 本质上是一个组件
    --> 将B组件渲染到A组件内部，同时A组件传递必要的props（往往是属性数据，而不是方法）
*/
export default class A extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired
  }

  state = {
    count: 1,
  };

  render() {
    return (
      <div>
        A......
        {/* <B count={this.state.count} /> */}
        {this.props.render(this.state.count)}
      </div>
    );
  }
}

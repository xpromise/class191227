import React, { Component } from "react";
import PropTypes from "prop-types"; // 用来对props类型检查的库

/*
  class 定义类
  extends 继承
  constructor 类的构造方法
  super() 调用父类的构造方法 / super.xxx() 调用父类的xxx方法
  static 定义类的静态方法
    （类的直接方法，只有类可以使用，实例对象不能使用）
    普通方法是实例对象可以使用，类不能使用
*/

export default class Child extends Component {
  // 对传入的props进行类型/必要性检查
  static propTypes = {
    name: PropTypes.string.isRequired, // 必要
    age: PropTypes.number, // 可选
    sex: PropTypes.string,
    updatePerson: PropTypes.func.isRequired,
  };

  // 给props默认值
  static defaultProps = {
    age: 18,
    sex: "女",
  };

  update = () => {
    this.props.updatePerson({
      name: "jack",
      age: 20,
      sex: "男",
    });
  };

  render() {
    // 读取props
    const { name, age, sex } = this.props;

    return (
      <div>
        <h2 onClick={this.update}>Child...</h2>
        <ul>
          <li>姓名: {name}</li>
          <li>年龄: {age}</li>
          <li>性别: {sex}</li>
        </ul>
      </div>
    );
  }
}

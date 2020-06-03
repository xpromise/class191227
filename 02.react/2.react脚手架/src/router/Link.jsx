/*
  Link
    不能刷新，不能发送请求，不能跳转网址 onClick 禁止默认行为
    只能更新浏览历史记录 --> history.push()
    
    <Link to="/home">首页</Link>
    Link组件内部通过 
      this.props.to ---> /home
      this.props.children --> 首页

*/
import React, { Component } from 'react'

import context from './context';

export default class Link extends Component {
  static contextType = context; // 接受context数据

  handleClick = (e) => {
    e.preventDefault();
    // 跳转地址
    this.context.history.push(this.props.to);
  }

  render() {
    return (
      <a onClick={this.handleClick}>
        {
          this.props.children
        }
      </a>
    )
  }
}

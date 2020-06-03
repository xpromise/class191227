/*
  Route: 
    接受两个属性：path 、component
    根据pathname的变化，看是否匹配上path，加载指定组件component

    加载component时，需要给其传递路由组件三大属性
*/
import React, { Component } from "react";
import { matchPath } from 'react-router';

import context from "./context";
/**
 * 检查当前路径是否匹配上path
 * @param {*} pathname 当前路径
 * @param {*} props Route组件接受的属性
 */
/* function matchPath(pathname, props) {
  const { path, exact } = props; // 路由path属性
  // 定义是否匹配上路径的标识
  let match = false;

  if (exact) {
    // 严格匹配 必须全等
    if (pathname === path) {
      match = true;
    }
  } else {
    // 模糊匹配 以path开头即可
    if (pathname.statsWith(path)) {
      match = true;
    }
  }

  return match;
} */

export default class Route extends Component {
  render() {
    // 接受祖先组件传递的context数据
    return (
      <context.Consumer>
        {(context) => {
          // 根据pathname的变化，看是否匹配上path
          const { pathname } = context.location; // 当前路径
          // 检查当前路径是否匹配上path
          const match = matchPath(pathname, this.props);
          if (!match) return null; 
          // 返回路由组件
          // 问题：需要给其传递路由组件三大属性
          // React.createElement(type(元素类型/组件), props(元素/组件接受的属性), children)
          return React.createElement(this.props.component, context);
        }}
      </context.Consumer>
    );
  }
}

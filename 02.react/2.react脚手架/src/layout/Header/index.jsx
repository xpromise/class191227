import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import routes from "../../config/routes";

// 使用装饰器语法
@withRouter
export default class Header extends Component {
  /**
   * 找到子菜单
   */
  renderChildren = () => {
    // 1. 获取当前路径location.pathname
    /*
      Header组件不是路由组件 --> 没有通过Route加载 
      所以没有路由组件三大属性
      需求：需要路由组件的三大属性
      解决：react-router-dom有一个高阶组件withRouter
          withRouter内部保存路由组件的三大属性，会给被包装组件传递三大属性
    */
    const { pathname } = this.props.location;
    // 2. 判断routes中哪个配置匹配上当前路径
    /*
      遍历数组有两种方式
        forEach 一般写代码推荐forEach，语义化更好
          一般用于要全部遍历的场景
        for循环 一般写库或框架，追求极致性能使用。性能好
          一般用于遍历可中断的场景
    */
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      // 判断当前路径是否和一级菜单路径相等
      if (pathname.startsWith(route.path)) {
        // 3. 取出route.children属性，将属性中配置遍历生成二级导航链接
        return route.children || [];
      }
      /*
        1. 继续遍历route.children
           判断当前路径是否和二级菜单路径相等，返回route.children
        2. 判断当前路径是否以一级菜单开头，说明匹配上了
          一级菜单路径 /timeline 
          当前路径 pathname 
            /timeline
            /timeline/frontend
          如何判断 当前路径是否以一级菜单开头：
            String.prototype.startsWith()
            正则表达式
      */

    }

    return [];
  };

  render() {
    const routeChildren = this.renderChildren();

    return (
      <div>
        {/* 一级导航链接 */}
        <ul>
          {routes.map((route) => {
            return (
              <li key={route.path}>
                <NavLink to={route.path}>{route.name}</NavLink>
              </li>
            );
          })}
        </ul>
        {/* 
          二级导航链接:
            思路： 
              1. 获取当前路径location.pathname
              2. 判断routes中哪个配置匹配上当前路径
              3. 取出route.children属性，将属性中配置遍历生成二级导航链接
            坑：如果当前路径是二级导航链接，该怎么判断routes中哪个配置匹配上当前路径？  
        */}
        <ul>
          {routeChildren.map((route) => {
            return (
              <li key={route.path}>
                <NavLink to={route.path}>{route.name}</NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

/*
  暴露的是新组件
  新组件内部渲染Header，此时就会以props方式传递三大属性
*/
// export default withRouter(Header)

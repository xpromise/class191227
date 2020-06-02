import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import routes from "../../config/routes";

export default class Header extends Component {
  render() {
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
        <ul></ul>

      </div>
    );
  }
}

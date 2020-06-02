import React, { Component } from "react";

export default class Detail extends Component {
  render() {
    /*
      通过Route加载的组件，叫做路由组件
      特点：有路由组件三大属性：
        location
          pathname 当前路由地址
          state undefined 
        history  
          push/replace/goBack/goForward/listen 等方法
          用来操作浏览历史记录~
        match
          params 参数
    */
    // console.log(this.props.match.params);
    console.log(this.props.location);

    return <div>Detail...</div>;
  }
}

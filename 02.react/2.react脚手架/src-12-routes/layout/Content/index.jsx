import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../../config/routes";

export default class Content extends Component {
  renderRoutes = () => {
    const renderRoutes = [];

    routes.forEach((route) => {
      /*
        问题：为什么先添加一级路由，就不能正常显示二级路由内容？
          最终遍历时一级路由在前面，二级路由在后面
          Switch组件会让多个路由只生效一个，所以一级路由在前面，就会先匹配一级路由

          <Route path="/home" component={Home}/>
          <Route path="/home/xxx" component={Xxx}/> 这个路由匹配不上
            这个路由默认匹配路径是以 /home 开头的路径都能匹配

          <Route path="/home/xxx" component={Xxx}/>
          <Route path="/home" component={Home}/>
        
        解决：
          <Route path="/home" component={Home}/> 模拟匹配，以/home开头即可
          <Route path="/home" component={Home} exact={true}/> 严格匹配，路径必须全部相等
          <Route path="/home" component={Home} exact/> 严格匹配，路径必须全部相等
      */

      // 添加一级路由
      renderRoutes.push(
        <Route
          path={route.path}
          key={route.path}
          component={route.component}
          exact // 严格匹配
        />
      );

      if (route.children) {
        route.children.forEach((childRoute) => {
          // 添加子路由
          renderRoutes.push(
            <Route
              path={childRoute.path}
              key={childRoute.path}
              component={childRoute.component}
              exact // 严格匹配
            />
          );
        });
      }
    });

    return renderRoutes;
  };

  render() {
    return <Switch>{this.renderRoutes()}</Switch>;
  }
}

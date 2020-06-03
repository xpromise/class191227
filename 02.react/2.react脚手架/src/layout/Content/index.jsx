import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../../config/routes";

export default class Content extends Component {
  renderRoutes = () => {
    const renderRoutes = [];

    routes.forEach((route) => {
      /*
        问题：为什么先添加一级路由，就不能正常显示二级路由内容？
      */

      if (route.children) {
        route.children.forEach((childRoute) => {
          // 添加子路由
          renderRoutes.push(
            <Route
              path={childRoute.path}
              key={childRoute.path}
              component={childRoute.component}
            />
          );
        });
      }

      // 添加一级路由
      renderRoutes.push(
        <Route path={route.path} key={route.path} component={route.component} />
      );
    });

    return renderRoutes;
  };

  render() {
    return <Switch>{this.renderRoutes()}</Switch>;
  }
}

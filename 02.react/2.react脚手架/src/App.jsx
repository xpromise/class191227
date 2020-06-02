import React, { Component } from "react";

import {
  BrowserRouter,
  HashRouter,
  Link,
  NavLink,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";

export default class App extends Component {
  render() {
    return (
      // 最外面必须使用Router，里面子组件才能使用router技术
      // 给里面子组件传递需要用的属性 history
      <HashRouter>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header">
              <h2>React Router Demo</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* 
                Link组件：1. 添加浏览器历史记录
                NavLink组件：1. 添加浏览器历史记录 2. 选中时多一个类名 active
                
                什么时候用Link，什么时候用NavLink？
                  需要选中时有特殊样式时用NavLink
                  如果不需要就用Link
              */}
              <NavLink className="list-group-item" to="/about">
                About
              </NavLink>
              <Link className="list-group-item" to="/home">
                Home
              </Link>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 
                  Switch 切换
                    能保证Route只有一个生效，只有一个会加载
                    默认情况下，从上到下依次匹配
                */}
                <Switch>
                  {/* 
                  Route负责根据浏览器历史记录的变化，一旦匹配上，就会加载当前组件 
                  如果之前加载过，没有匹配上，就会卸载
                  如果之前没有加载过。就不加载
                */}
                  <Route path="/about" component={About} />
                  <Route path="/home" component={Home} />
                  {/* 
                  Redirect组件会匹配所有地址，一旦匹配上就会自动更新浏览器历史记录
                */}
                  <Redirect to="/home" />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}

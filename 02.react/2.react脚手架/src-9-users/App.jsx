import React, { Component } from "react";

/*
  1. 将class --> className
  2. 将没有结束符标签加上结束符：input img
  3. 将style改成{{}}
*/

import List from "./pages/List";
import Search from "./pages/Search";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Search />
        <List />
      </div>
    );
  }
}

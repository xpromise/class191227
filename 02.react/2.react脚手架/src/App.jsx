import React, { Component } from "react";

import { BrowserRouter, Route, Link } from "./router";

import Home from "./pages/Home";
import About from "./pages/About";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/home"> Home </Link>
          </li>
          <li>
            <Link to="/about"> About </Link>
          </li>
        </ul>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
      </BrowserRouter>
    );
  }
}

import React, { Component } from "react";

import { BrowserRouter, Route } from "./router";

import Home from "./pages/Home";
import About from "./pages/About";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
      </BrowserRouter>
    );
  }
}

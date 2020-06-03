import React, { Component } from "react";

import Header from "./Header";
import Content from "./Content";

export default class Layout extends Component {
  render() {
    return (
      <>
        <Header />
        <Content />
      </>
    );
  }
}

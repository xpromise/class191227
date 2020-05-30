import React, { Component } from "react";
import PubSub from "pubsub-js";

export default class Search extends Component {
  state = {
    searchName: "",
  };

  handleChange = (e) => {
    this.setState({
      searchName: e.target.value.trim(),
    });
  };

  handleClick = () => {
    // 将数据发送给List组件
    const { searchName } = this.state;

    if (searchName) {
      PubSub.publish("SEARCHNAME", searchName);
    }
  };

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input
            type="text"
            placeholder="enter the name you search"
            onChange={this.handleChange}
          />
          <button onClick={this.handleClick}>Search</button>
        </div>
      </section>
    );
  }
}

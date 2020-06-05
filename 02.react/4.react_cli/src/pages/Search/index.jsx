import React, { Component } from "react";
import { connect } from "react-redux";

import { getUsersData } from "../../redux/actions";

@connect(
  null, // 不需要redux的状态数据
  { getUsersData } // 需要redux的方法
)
class Search extends Component {
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
      this.props.getUsersData(searchName);
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
export default Search;

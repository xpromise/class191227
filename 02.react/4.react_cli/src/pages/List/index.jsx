import React, { Component } from "react";
import { connect } from "react-redux";

import "./index.css";

@connect(
  (state) => ({
    isFirstView: state.userList.isFirstView,
    isLoading: state.userList.isLoading,
    users: state.userList.users,
    error: state.userList.error,
  }),
  null
)
class List extends Component {
  render() {
    const { isFirstView, isLoading, users, error } = this.props;

    if (isFirstView) {
      return <h1>Enter Name To Search</h1>;
    }

    if (isLoading) {
      return <h1>Loading...</h1>;
    }

    if (users) {
      return (
        <div className="row">
          {users.map((user) => {
            return (
              <div className="card" key={user.id}>
                <a href={user.html_url} target="_blank">
                  <img src={user.avatar_url} style={{ width: 100 }} />
                </a>
                <p className="card-text">{user.login}</p>
              </div>
            );
          })}
        </div>
      );
    }

    return <h1>{error}</h1>;
  }
}

export default List;

import React, { Component } from "react";
import PubSub from "pubsub-js";
import axios from "axios";

import "./index.css";

export default class List extends Component {
  state = {
    isFirstView: true, // 代表是否是初始化显示
    isLoading: false, // 代表是否请求中
    users: null, // 代表请求成功的数据
    error: null, // 代表请求失败的原因
  };

  componentDidMount() {
    PubSub.subscribe("SEARCHNAME", (msg, searchName) => {
      // 发送请求之前切换成loading
      this.setState({
        isFirstView: false,
        isLoading: true,
      });
      // 发送请求  https://api.github.com/search/users
      /*
        用代理服务器解决跨域：
          1. 配置 webpack.config.js  devServer proxy (和Vue基本一致)
          2. 页面中需要访问代理服务器。代理服务器会将请求转发到目标服务器
      */
      axios
        .get("http://localhost:9527/api/search/users", {
          params: {
            q: searchName,
          },
        })
        .then((response) => {
          console.log("请求成功", response);
          this.setState({
            users: response.data.items.map((user) => {
              return {
                login: user.login,
                avatar_url: user.avatar_url,
                html_url: user.html_url,
                id: user.id,
              };
            }),
            isLoading: false,
          });
        })
        .catch((err) => {
          console.log("请求失败", err);
          this.setState({
            users: null,
            error: "网络出现问题，请刷新试试~",
            isLoading: false,
          });
        });
    });
  }

  componentWillUnmount() {
    PubSub.unsubscribe("SEARCHNAME");
  }

  render() {
    const { isFirstView, isLoading, users, error } = this.state;

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

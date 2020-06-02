import React, { useState, useEffect } from "react";
import PubSub from "pubsub-js";
import axios from "axios";

import "./index.css";

export default function List() {
  const [isFirstView, setIsFirstView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 相当于componentDidMount
    PubSub.subscribe("SEARCHNAME", (msg, searchName) => {
      // 发送请求之前切换成loading
      setIsFirstView(false);
      setIsLoading(true);

      axios
        .get("http://localhost:9527/api/search/users", {
          params: {
            q: searchName,
          },
        })
        .then((response) => {
          // console.log("请求成功", response);
          const data = response.data.items.map((user) => {
            return {
              login: user.login,
              avatar_url: user.avatar_url,
              html_url: user.html_url,
              id: user.id,
            };
          });

          setUsers(data);
          setIsLoading(false);
        })
        .catch((err) => {
          // console.log("请求失败", err);
          setUsers(null);
          setIsLoading(false);
          setError("网络出现问题，请刷新试试~");
        });
    });

    return () => {
      // componentWillUnmount
      PubSub.unsubscribe("SEARCHNAME");
    };
  }, []);

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

import React, { useState } from "react";
import PubSub from "pubsub-js";

export default function Search() {
  // 定义state
  const [searchName, setSearchName] = useState("");

  const handleChange = (e) => {
    setSearchName(e.target.value.trim());
  };

  const handleClick = () => {
    // 将数据发送给List组件
    if (searchName) {
      PubSub.publish("SEARCHNAME", searchName);
    }
  };

  return (
    <section className="jumbotron">
      <h3 className="jumbotron-heading">Search Github Users</h3>
      <div>
        <input
          type="text"
          placeholder="enter the name you search"
          onChange={handleChange}
        />
        <button onClick={handleClick}>Search</button>
      </div>
    </section>
  );
}

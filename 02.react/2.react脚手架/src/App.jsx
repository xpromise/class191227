import React from "react";

import List from "./pages/List";
import Search from "./pages/Search";

export default function App() {
  return (
    <div className="container">
      <Search />
      <List />
    </div>
  );
}

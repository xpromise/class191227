import add from "./js/add";

import "./css/main.css";
import "./css/index.css";

console.log("hello webpack");
console.log("hello webpack");
console.log(add(1, 2));

// 判断是否开启了HMR
if (module.hot) {
  // 让某个JS模块具备HMR功能 --> 只要下面文件发生变化，别的文件使用缓存，重新加载下面文件
  module.hot.accept("./js/add", () => {
    // 当模块更新后，触发的函数
  });
}

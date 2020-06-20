import count from "./count";

console.log(count(3, 1));

export default function add(x, y) {
  if (typeof x !== "number" && typeof y !== "number") return;
  return x + y;
}

// 判断是否开启了HMR
if (module.hot) {
  // 让某个JS模块具备HMR功能
  module.hot.accept("./count", () => {
    // 当模块更新后，触发的函数
  });
}

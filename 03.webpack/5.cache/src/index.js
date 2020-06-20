import "./css/main.css";
import "./css/index.css";

console.log('hello webpack~');

// 动态加载JS，代码分割
import("./js/add").then((module) => {
  console.log(module.add(1, 2));
});

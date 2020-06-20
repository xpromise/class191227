import $ from "jquery";

console.log($);

// 动态加载JS，代码分割
import("./js/add").then((module) => {
  console.log(module.add(1, 2));
});

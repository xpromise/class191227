/*  
  没有加 '@babel/polyfill'  打包文件 48kb
  加上 '@babel/polyfill' 打包文件 447kb
  使用 core-js 方案 打包文件 144kb
*/
// import '@babel/polyfill'; // 所有JS兼容性包~
import sum from "./js/sum";

import "./css/main.css";
import "./css/index.css";

console.log(sum(1, 2, 3, 4));

const promise = new Promise((resolve) => resolve());
promise.then(() => console.log(111));

/*
  自定义Vue插件
  作用：扩展Vue的功能
*/

/* const myPlugin = {};

// 安装插件方法
// 一旦Vue.use(myPlugin), 内部就会调用 myPlugin.install(Vue)
myPlugin.install = function(Vue) {
  // 扩展Vue的功能

  // 1. 扩展Vue的全局功能
  Vue.globalMethod = function() {
    console.log("hello globalMethod~~~");
  };
  // 2. 扩展Vue的实例对象功能
  Vue.prototype.$vmMethod = function() {
    console.log("hello $vmMethod~~~");
  };
  // 3. 扩展其他功能
  // 自定义指令
  Vue.directive("lower-text", function(el, binding) {
    el.textContent = binding.value.toLowerCase();
  });
}; */

// 如果是函数，整个函数都被当作install方法直接调用
function myPlugin(Vue) {
  // 扩展Vue的功能

  // 1. 扩展Vue的全局功能
  Vue.globalMethod = function() {
    console.log("hello globalMethod~~~");
  };
  // 2. 扩展Vue的实例对象功能
  Vue.prototype.$vmMethod = function() {
    console.log("hello $vmMethod~~~");
  };
  // 3. 扩展其他功能
  // 自定义指令
  Vue.directive("lower-text", function(el, binding) {
    el.textContent = binding.value.toLowerCase();
  });
  
}

export default myPlugin;

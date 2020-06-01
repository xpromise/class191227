import React from "react";

/*
  ES6类组件：
    三大属性 state/props/refs
  工厂函数组件：
    this --> undefined
    state --> React.useState()
    props --> 第一个参数
    ref --> 
      React.forwardRef() 将工厂函数组件内部的元素提供给父组件访问
    
    <A /> --> props 没有children
    <A>xxxx</A> --> props: { children: xxxx } 
*/
export default React.forwardRef(function ForwardRef(props, ref) {
  // console.log(this); // undefined
  // console.log(arguments);
  console.log(props);

  return (
    <div>
      <span ref={ref}>ForwardRef...</span>
      {props.children}
    </div>
  );
});

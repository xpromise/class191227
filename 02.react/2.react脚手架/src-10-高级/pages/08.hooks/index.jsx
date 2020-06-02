import React, { useState, useContext, useCallback } from "react";
import PubSub from "pubsub-js";
import ReactDOM from "react-dom";

import context from "./context";
/*
  ES6类组件和工厂函数组件的区别：
    1. 工厂函数组件没有this，Es6类组件this指向组件实例对象
    2. 工厂函数没有三个属性（state、props、refs）
      props --> 函数参数
      refs --> React.forwardRef()
      state --> React.useState()
    3. 工厂函数没有生命周期函数
      componentDidMount
      shouldComponentUpdate
      componentWillUnmount  
*/

export default function Hooks() {
  // 返回值就是Provider组件提供的value
  const defaultValue = useContext(context);

  const [count, setCount] = useState(defaultValue);
  const [num, setNum] = useState(0);

  // 默认情况下，函数会随着组件重新渲染，从而重新创建
  /* const handleClick = () => {
    setCount(count + 1);
  }; */

  // useCallback缓存函数
  // 注意：不需要太多变化的函数
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const handleClick2 = () => {
    setNum(num + 1);
  };

  return (
    <div>
      <p>点击次数：{count}</p>
      <button onClick={handleClick}>按钮1</button>
      <button onClick={handleClick2}>按钮2</button>
    </div>
  );
}

// export default function Hooks(props) {
//   /*
//     数组解构赋值：
//       const arr = [4, 5];
//       const [a, b] = arr;
//       a === 4
//       b === 5

//       1. const [状态数据（初始化为defaultValue）, 更新状态数据的方法] = React.useState(defaultValue)
//         作用：让工厂函数组件拥有状态数据state
//       2. React.useEffect()
//         作用：让工厂函数组件拥有生命周期函数（componentDidMount componentDidUpdate componentWillUnmount）
//   */
//   const [count, setCount] = React.useState(0);

//   const handleClick = () => {
//     // 更新count数据，同时会重新渲染组件
//     setCount(count + 1);
//   };

//   React.useEffect(() => {
//     // 相当于 componentDidMount和componentDidUpdate
//     // 初始化渲染时会调用，更新时也会调用

//     // 需求：只有 componentDidMount 功能，不要在更新调用(只会在初始化渲染调用一次)
//     // 解决：传入第二个参数 []
//     console.log("useEffect调用了~~");

//     // 模拟发送请求
//     setTimeout(() => {
//       setCount(10);
//     }, 1000);

//     // 绑定事件 / 订阅消息
//     PubSub.subscribe("MSG", (msg, data) => {});

//     // 需求: 具有componentWillUnmount功能
//     // 增加返回值，返回值函数
//     return () => {
//       PubSub.unsubscribe("MSG");
//     };
//   }, []);

//   const goDie = () => {
//     ReactDOM.unmountComponentAtNode(document.getElementById("root"));
//   };

//   return (
//     <div>
//       <p>点击次数：{count}</p>
//       <button onClick={handleClick}>点击</button>
//       <button onClick={goDie}>卸载组件</button>
//     </div>
//   );
// }

/*
  根据prevState和action来生成newState的函数模块

  reducers就是一个函数，函数名称一般和要管理状态数据名称一致
*/
import { combineReducers } from "../lib/redux";
import { INCREMENT, DECREMENT } from "./constants";
/*
  prevState 代表之前的state
  action 
    type 更新类型
    data 参与更新的数据
  
  一上来reducer函数会调用一次，目的为了得到初始化值
    prevState是undefined
    action是{type: "@@redux/INITh.s.0.p.6.s"}  
*/
const initCount = 0; // 初始化值

function count(prevState = initCount, action) {
  console.log(prevState, action);
  // 内部计算得到newState
  switch (action.type) {
    case INCREMENT:
      return prevState + action.data;
    case DECREMENT:
      return prevState - action.data;
    default:
      return prevState;
  }
}

// export default count; // redux管理的状态数据 就是 count --> count(prevState, action)

// redux管理的状态数据 就是 { count } --> { count: count(prevState, action), yyy: yyy(prevState, action) }
export default combineReducers({
  count,
});

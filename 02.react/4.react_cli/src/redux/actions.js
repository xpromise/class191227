/*
  用来创建action对象工厂函数模块
  action对象：{type: 更新类型, data: 参与更新的数据}

  定义n个工厂函数：看对数据更新几种操作
*/

/* function increment(number) {
  return {
    type: 'INCREMENT', // 更新类型 --> +
    data: number // 参与更新的数据
  }
} */
import { INCREMENT, DECREMENT } from "./constants";

/*
  redux-thunk中间件
    将actions分为同步action creators和异步action creators
    同步action creators: 是一个函数，返回值是一个action对象
    异步action creators：是一个函数，返回值还是函数，函数接受store.dispatch作为参数
*/

export const increment = (number) => ({
  type: INCREMENT, // 更新类型 --> +
  data: number, // 参与更新的数据
});

export const decrement = (number) => ({
  type: DECREMENT, // 更新类型 --> -
  data: number, // 参与更新的数据
});

/*
  函数需要调用两次，当我们在外面调用 incrementAsync 时，
  内部实际会调用两次，第二次会传入dispatch作为参数
*/
export const incrementAsync = (number) => {
  return (dispatch) => {
    // 执行异步代码
    setTimeout(() => {
      const action = increment(number);
      dispatch(action);
    }, 1000)
  }
}
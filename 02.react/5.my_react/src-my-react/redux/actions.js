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

export const increment = (number) => ({
  type: INCREMENT, // 更新类型 --> +
  data: number, // 参与更新的数据
});

export const decrement = (number) => ({
  type: DECREMENT, // 更新类型 --> -
  data: number, // 参与更新的数据
});

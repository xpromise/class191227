/*
  同步action：用来创建action对象的工厂函数模块
  异步action：返回值是函数，函数接受dispatch作为参数，里面执行异步代码~
    异步action往往伴随着1个或多个同步action

    考虑两个问题:
      1. redux管理什么状态数据？
        comments
      2. 状态数据需要几种更新方法？
        添加
        删除
*/

import { ADD_COMMENT, DEL_COMMENT } from "./contants";

/*
  注意：
    actions里面不能直接操作数据，操作数据是reducer做
    action负责传递reducer操作数据的必要参数
*/
// 添加评论
export const addComment = (comment) => ({
  type: ADD_COMMENT,
  data: comment,
});

// 删除评论
export const delComment = (id) => ({
  type: DEL_COMMENT,
  data: id,
});

/*
  用来创建action对象工厂函数模块：
    同步action：返回值是一个action对象
    异步action：返回值是一个函数，函数接受dispatch作为参数

    redux需要管理的状态数据是什么？isFirstView isLoading users error
    状态数据有哪些变化？
*/
import axios from "axios";
import {
  GET_USERS_DATA_FAILED,
  GET_USERS_DATA_SUCCESS,
  LOADING,
} from "./constants";
// NodeJS API设计
// 同步action
export const getUsersDataSuccessSync = (users) => ({
  type: GET_USERS_DATA_SUCCESS,
  data: users,
});

export const getUsersDataFailedSync = (error) => ({
  type: GET_USERS_DATA_FAILED,
  data: error,
});

export const loadingSync = () => ({
  type: LOADING,
});

// 异步action
export const getUsersData = (searchName) => {
  return (dispatch) => {
    // 执行异步代码
    // 发送请求之前，将状态切换成loading
    dispatch(loadingSync()); // 为了切换成loading
    /*
      跨域问题：配置代理服务器解决
      解决：package.json中 配置 "proxy": "http://localhost:3000"
    */
    axios
      .get("/search/users", {
        params: {
          q: searchName,
        },
      })
      .then((response) => {
        // 得到数据
        const users = response.data.items.map((user) => {
          return {
            login: user.login,
            avatar_url: user.avatar_url,
            html_url: user.html_url,
            id: user.id,
          };
        });
        // 生成action对象
        const action = getUsersDataSuccessSync(users);
        // 调用dispatch触发更新
        dispatch(action);
      })
      .catch((err) => {
        dispatch(getUsersDataFailedSync("网络出现故障，请稍后再试~"));
      });
  };
};

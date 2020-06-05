/*
  根据prevState和action来生成newState函数模块
*/

import { combineReducers } from "redux";
import {
  GET_USERS_DATA_FAILED,
  GET_USERS_DATA_SUCCESS,
  LOADING,
} from "./constants";

const initUserList = {
  isFirstView: true,
  isLoading: false,
  users: null,
  error: "",
};

function userList(prevState = initUserList, action) {
  switch (action.type) {
    case LOADING:
      /* return {
        isFirstView: false,
        isLoading: true,
        users: prevState.users,
        error: prevState.error,
      }; */
      return {
        ...prevState, // babel能让对象使用...运算符
        isFirstView: false,
        isLoading: true,
      };
    case GET_USERS_DATA_SUCCESS:
      /* return {
        isFirstView: prevState.isFirstView,
        isLoading: false,
        users: action.data,
        error: prevState.error,
      }; */
      return {
        ...prevState,
        isLoading: false,
        users: action.data,
      };
    case GET_USERS_DATA_FAILED:
      return {
        ...prevState,
        isLoading: false,
        users: null,
        error: action.data,
      };
    default:
      return prevState;
  }
}

export default combineReducers({
  userList,
});

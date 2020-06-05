/*
  用来集中式管理多个组件共享状态数据模块
  读取/触发更新状态数据的方法都在其中
    store.getState()
    store.dispatch(action)
    store.subscribe(listener)

  创建store对象  
*/

import { createStore } from 'redux';

import reducers from './reducers';
// 创建store对象
const store = createStore(reducers);
// 暴露出去
export default store;

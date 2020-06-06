/*
  自定义redux：
  API：
    createStore(reducers)
      返回值是 store 对象：
        store.getState() 获取redux管理所有状态数据
        store.dispatch(action) 触发更新（触发reducer调用）
        store.subscribe(listener) 监听redux状态的变化，一旦发生变化就触发listener
    combineReducers()  
*/

/**
 * 创建store对象
 * @param {*} reducers reducer函数
 * @return store对象
 */
export function createStore(reducers) {
  // 集中式管理状态数据 --> 定义一个存储数据的容器，将来所有数据都存在这个容器中
  let currentState; // 用来集中式管理状态数据的容器
  let currentListener = null; // 用来存储更新组件的方法的容器

  /**
   * 获取redux管理所有状态数据
   * @return redux管理所有状态数据
   */
  function getState() {
    // 利用闭包的特点，让函数外面能操作（读取）函数内部的数据
    return currentState;
  }

  /**
   * 触发更新
   * @param {*} action action对象
   */
  function dispatch(action) {
    // 触发reducer函数的调用, 传入prevState, action
    // 一旦调用reducer函数就能得到newState
    // 更新redux状态数据(此时组件并没有变化，还需要更新组件)
    currentState = reducers(currentState, action);
    // 更新组件
    currentListener && currentListener();
  }

  /**
   * 监听redux状态的变化，一旦发生变化就触发listener
   * @param {*} listener 更新组件的回调函数
   */
  function subscribe(listener) {
    currentListener = listener;
    // 返回值用来解绑
    return function () {
      currentListener = null;
    };
  }

  // 一上来需要进行状态的初始化
  currentState = reducers(currentState, { type: "@@INIT-MY-REDUX-class1227" });

  // 返回值是store对象，store上有三个方法~
  return {
    getState,
    dispatch,
    subscribe,
  };
}

export default {
  createStore,
};

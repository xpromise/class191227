/*
  自定义redux：
  API：
    createStore(reducers)
      返回值是 store 对象：
        store.getState() 获取redux管理所有状态数据
        store.dispatch(action) 触发更新（触发reducer调用）
        store.subscribe(listener) 监听redux状态的变化，一旦发生变化就触发listener
    combineReducers()  
      整合多个reducer函数成为一个函数
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

/**
 * 整合多个reducer函数成为一个函数
 * @param {object} reducers 是一个对象，对象中有n个reducer函数
 * @return 整合后的reducer函数
 */
export function combineReducers(reducers) {
  //#region
  /*
    reducers 
      接受的值
      {
        xxx: function xxx(prevState, action) {},
        yyy: function yyy(prevState, action) {}
      }

      combineReducers返回值是一个函数 --> 函数内部就应该将多个reducer的状态统一管理
      最终redux管理的状态数据的结构：
        {
          xxx: xxx, --> xxx(prevState['xxx'], action)
          yyy: yyy --> yyy(prevState['yyy'], action)
        }
  */
  //#endregion

  // 返回值：整合后的reducers函数，应该返回对象数据
  // 对象中有多少数据，看传入的reducers函数有多少个
  return function (prevState = {}, action) {
    // 遍历所有传入的reducers函数
    // 所有传入reducers函数属性名数组
    const reducerKeys = Object.keys(reducers);

    /* // 返回值：整合后的redux状态
    const currentState = {};
    
    reducerKeys.forEach((reducerKey) => {
      // 得到真正的reducer函数
      const reducer = reducers[reducerKey];
      // 给返回值添加key，值是对应reducer函数调用的返回值（就能得到相应状态值）
      // 整体数据是对象（包含所有数据），而reducer调用时只需要它相关的数据即可 prevState[reducerKey]
      currentState[reducerKey] = reducer(prevState[reducerKey], action);
    }) */

    const currentState = reducerKeys.reduce((currentState, reducerKey) => {
      const reducer = reducers[reducerKey];
      currentState[reducerKey] = reducer(prevState[reducerKey], action);
      return currentState;
    }, {});

    return currentState;
  };
}

export default {
  createStore,
  combineReducers,
};

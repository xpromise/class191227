# day06

## redux
* 一种用来集中式管理多个组件共享状态
* 不是React插件，但是常用于React中

* redux API
  * createStore(reducer, middleware) 用来创建store对象
  * combineReducers({ reducer1, reducer2 }) 整合多个reducer函数成为一个
  * applyMiddleware(middleware) 应用中间件

* 定义redux相关文件
  * store
    * 创建store对象
    * 读取/更新状态数据的方法都在store对象中
      * store.getState()
      * store.dispatch(action)
      * store.subscribe(listener)
  * action creators（actions）
    * 用来创建action对象工厂函数模块
      * `{type: 更新数据类型, data: 参与更新的数据}`
  * constants
    * 常量模块
  * reducers
    * 根据prevState和action来生成newState的函数模块

## react-redux
* 简化使用redux

* API
  * Provider 组件
    * `<Provider store={store}>xxx</Provider>`
    * 负责给后台元素/组件传递store
      * 简化以后其他组件就不需要引入store
  * connect 高阶组件
    * `connect(mapStateToProps, mapDispatchToProps)(UI组件)`
    * 负责给UI组件传递redux的状态数据和更新状态数据的方法
      * 简化UI组件使用redux
    * 同时内部绑定了store.subscribe，一旦状态数据发生变化，子组件就会更新

## redux-thunk
* 使用中间件，在redux执行异步代码

* 将actions分类
  * 同步action 返回值是action对象
  * 异步action 返回值是函数，函数接受dispatch作为参数，里面执行异步代码

* 使用
  * `createStore(reducers, applyMiddleware(thunk))`

## redux-devtools-extension
* 开发调试redux的工具
* 需要配合下载chrome插件 redux-devtools 一起使用

* 使用
  * `createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))`
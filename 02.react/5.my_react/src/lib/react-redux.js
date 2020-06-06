/*
  react-redux 简化使用redux
    Provider 组件 
      负责给后代组件提供store属性
    connect 高阶组件
      负责给UI组件传递redux的状态数据和更新状态数据的方法
      内部实现store.subscribe方法
*/
import React, { Component } from "react";

const context = React.createContext();


/*
  将来Provider组件会这样使用：
    <Provider store={store}>  
      <App/>
    </Provider>
    --> 所以Provider组件接受两个属性：
      store
      children --> App组件
*/
// 负责给后代组件提供store属性
export class Provider extends Component {
  render() {
    return <context.Provider value={this.props.store}>
      {
        // 渲染Provider标签中的内容
        this.props.children
      }
    </context.Provider>
  }
}

/*
  const Container = connect(mapStateToProps, mapDispatchToProps)(UI组件)
   --> 实际使用
    connect(
      (state) => ({count: state.count}), // state代表redux管理的所有状态数据
      { increment, decrement } // increment/decrement 代表actions
    )(App)
   --> 最终组件使用
    读取状态数据 this.props.count
    更新状态数据 this.props.increment(number) 
      --> increment方法不是之前传入的increment actions方法
          而是内部自定义了一个方法：
          increment(...args) {
            // 生成action对象
            const action = increment(...args);
            // 调用dispatch方法更新
            dispatch(action);
          }
*/
export function connect() {
  return function () {
    return class extends Component {};
  };
}

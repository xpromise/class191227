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
    return (
      <context.Provider value={this.props.store}>
        {
          // 渲染Provider标签中的内容
          this.props.children
        }
      </context.Provider>
    );
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
export function connect(mapStateToProps, mapDispatchToProps) {
  return function (UIComponent) {
    return class extends Component {
      // 给当前容器组件命名
      static displayName = `Connect(${
        UIComponent.displayName || UIComponent.name || "Component"
      })`;
      // 为了在生命周期函数使用context数据
      static contextType = context;

      componentDidMount() {
        // 绑定触发组件更新的方法
        this.unsubscribe = this.context.subscribe(() => {
          this.setState({});
        });
      }

      componentWillUnmount() {
        // 解绑
        this.unsubscribe();
      }

      render() {
        return (
          <context.Consumer>
            {(store) => {
              // 获取redux管理的状态数据
              const currentState = store.getState();
              // 得到需要的状态数据对象
              const state = mapStateToProps(currentState);

              // 得到更新状态数据的方法
              const dispatch = Object.keys(mapDispatchToProps).reduce(
                (dispatch, actionKey) => {
                  // 获取action函数
                  const actionFn = mapDispatchToProps[actionKey];
                  // 给对象添加属性 action函数名
                  dispatch[actionKey] = function (...args) {
                    const action = actionFn(...args); // 生成action对象
                    store.dispatch(action); // 触发更新
                  };

                  return dispatch;
                },
                {}
              );

              // 给UI组件传递redux数据和更新redux数据的方法
              return <UIComponent {...state} {...dispatch} />;
            }}
          </context.Consumer>
        );
      }
    };
  };
}

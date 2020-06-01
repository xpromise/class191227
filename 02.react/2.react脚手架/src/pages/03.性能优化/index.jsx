import React, { Component, PureComponent } from "react";

/*
  Component 普通类组件
  PureComponent 纯类组件
    内部实现了shouldComponentUpdate
      对state和props进行浅比较（对对象数据只对比第一层属性）

  函数：
    不纯函数 内部使用了Math.random() / Date.now() ，值往往是随机的，值不可控
    纯函数，输入一致，输出也一致

    shouldComponentUpdate 和 PureComponent 同时存在只会生效 shouldComponentUpdate
      shouldComponentUpdate优先级更高~
*/

export default class Index extends PureComponent {
  state = {
    num: 1,
  };

  /*
      问题：什么时候要重新渲染，什么时候不需要？
        只有数据更新才需要重新渲染
      问题：数据是什么数据？
        state 和 props  
      问题：怎么判断数据更新了？
        之前的数据和当前最新的数据是不是相等
        对象数据一般比地址值，
          为什么前面要求更新的数据必须是一份全新的数据？
            如果使用push/splice方法更新数据，前后数据会是同一个，就判断不出来
            一旦更新的数据是新数据，地址值就不一样，就能判断出来

      shouldComponentUpdate(nextProps, nextState)
        组件要不要更新（此时还没有更新，所以this.state/this.props还是上一次的值）
        nextProps, nextState 就是组件接受最新的值
      
      最终：
        要判断 this.state 和 nextState 里面的数据是否一致
        还要判断 this.props 和 nextProps 里面的数据是否一致
    */
  // shouldComponentUpdate(nextProps, nextState) {

  //   // console.log(nextProps, nextState);
  //   // console.log(this.props, this.state);

  //   // 最简单写法
  //   // if (this.state === nextState && this.props === nextProps) {
  //   //   // 代表数据没有更新
  //   //   return false;
  //   // }

  //   // 复杂一些
  //   // const prevStateKeys = Object.keys(this.state);
  //   const nextStateKeys = Object.keys(nextState);

  //   for (let i = 0; i < nextStateKeys.length; i++) {
  //     // 获取属性名
  //     const nextStateKey = nextStateKeys[i];
  //     // 判断属性名是否相等
  //     // a.hasOwnProperty(b) 判断a对象上是否有直接属性b
  //     // 判断属性值是否相等
  //     if (
  //       !this.state.hasOwnProperty(nextStateKey) ||
  //       nextState[nextStateKey] !== this.state[nextStateKey]
  //     ) {
  //       // 说明属性名或属性值不相等 --> 数据更新了 --> 要重新渲染
  //       return true;
  //     }
  //   }
  //   // 说明属性名或属性值全都相等 --> 数据没有更新 --> 不要重新渲染
  //   return false;
  // }

  update = () => {
    this.setState({
      num: this.state.num + 1,
    });
  };

  render() {
    console.log("render()");

    return <button onClick={this.update}>点击更新</button>;
  }
}

# day02
1. state定义在哪个组件？
- props方案 
  - 状态提升（单个组件就定义在单个组件内部，多个组件就定义在其公共的父组件中）
- pubsub方案
  - 状态定义在要显示数据的组件（哪个组件需要状态进行展示，就定义在哪？而不要操作）

2. 更新state的注意事项
- Vue
  - 直接更新（监视数据变化，重写push/splice等方法）
- React
  - this.setState() 才能更新用户界面
  - 更新的数据必须是一份全新的数据（所以一般不会使用push/splice等方法）

3. 生命周期函数
- 初始化
  - constructor
  - componentWillMount
  - render
  - componentDidMount
- 更新
  - componentWillReceiveProps --> 父组件组件更新，子组件内部触发
  - shouldComponentUpdate --> 组件内部调用this.setState
  - componentWillUpdate --> 组件内部调用this.forceUpdate
  - render
  - componentDidUpdate
- 卸载
  - componentWillUnmount

- 重要的生命周期函数
  - componentDidMount 用来发送请求、设置定时器、绑定原生DOM事件等一次性任务
  - shouldComponentUpdate 性能优化
  - componentWillUnmount 用来取消请求、清除定时器、解绑事件等收尾工作（给componentDidMount收尾，防止内存泄漏）

- 新生命周期函数（了解~）

4. pubsub 
- 用于兄弟、祖孙组件通信
- 订阅（接受数据方）PubSub.subscribe('msg', (msg, data) => {})
- 取消订阅方法：PubSub.unsubscribe('msg')
- 发布（发送数据方）PubSub.publish('msg', data)
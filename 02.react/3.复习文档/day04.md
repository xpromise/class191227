# day04
1. render props
- 提供一种将组件A渲染到组件B内部的技术，同时传入props
- 作用：复用代码

2. hooks
- 未来一种开发趋势
- 干死class，让函数一统江湖
- 作用：增强工厂函数组件的功能
- 使用：
  - **useState** 让工厂函数组件能够使用状态数据
    - `const [state, setState] = useState(defaultValue)`
  - **useEffect** 让工厂函数组件能够使用生命周期函数
    - `useEffect(() => { /* 相当于componentDidMount */  return () => { /* componentWillUnmount */ } }, [])`
  - useContext 用来使用context
  - useCallback 用来缓存函数

3. react-router
- 用来开发单页面应用SPA
- 原理：
  - 点击a标签不会跳转，不会刷新，不会发送请求
    - 给a标签绑定点击事件，禁止默认行为   
  - 点击a标签更新浏览器历史记录
    - history.push()
  - 页面不会全部刷新，会局部更新
    - history.listen监听浏览器历史记录的变化，从而根据变化pathname来选择加载某些组件
- 使用：
  - BrowserRouter history模式，给后代组件传递路由组件三大属性（history/location/match）
  - HashRouter hash模式，给后代组件传递路由组件三大属性（history/location/match）
  - Link 更新浏览器历史记录
  - NavLink 更新浏览器历史记录（选中时会有一个active）
  - Route 根据pathname的变化，加载指定组件
  - Redirect 重定向到新地址
  - Switch 切换显示，多个路由组件只会加载一个   
- history模式 和 hash模式的区别
  - hash路径带#，发送请求时#后面参数不会携带。history模式正常，发送请求时所有路径都带上
    - hash刷新浏览器没有问题，history刷新浏览器会出现404
      - 开发：devServer --> historyApiFallback: true
      - 上线: nginx  ^/api --> 后台服务器   / --> index.html
  - hash兼容性好，history兼容性稍差
- 路由跳转方法
  - Link / NavLink 路由导航链接
    - 只要进行路由跳转
  - history.push 编程式导航
    - 既要跳转，也要干些其他事
- 路由传参方式
  - params参数 /home/message/1 --> this.props.match.params
  - state参数 history.push('/xxx', data) --> this.props.location.state
    - 只有history模式能用

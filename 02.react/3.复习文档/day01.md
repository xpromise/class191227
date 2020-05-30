# day01复习
1. 创建DOM对象的方式
- `React.createElement(type, props, children, children...)`
- JSX `<h1>hello</h1>`
  - 注意：JSX语法浏览器不识别，需要使用babel编译
  - 最终会被编译成JS语法（上面这个语法）

2. JSX
- Javascript XML
- 作用：用来创建虚拟DOM对象
- 语法：
  - 以 < 开头，会当做标签语法解析。
    - 如果标签名首字母小写，会当做html解析，解析不了就报错
    - 如果标签名首字母大写，会当做组件解析
  - 以 { 开头，里面代码会当做JS代码解析
    - `{JS表达式}`

3. 自定义React脚手架 
- 使用babel来编译JSX语法 --> @babel/preset-react

4. 创建组件两种方式
- 工厂函数组件（简单组件）
- ES6类组件（复杂组件）

5. ES6类组件实例对象三大属性
- state
  - 作用：用来控制用户界面的更新
  - 使用：
    - 初始化：`state = { xxx: yyy }`
    - 读取: `this.state.xxx`
    - 更新: `this.setState({xxx: zzz})`
- props
  - 作用：用来父子组件通信
  - 使用：
    - 类型限制：`static propTypes = { age: PropTypes.number.isRequired }`
    - 默认值：`static defaultProps = { sex: '男' }`
    - 读取: `this.props.xxx`
- refs（用的很少）
  - 作用：用来获取真实DOM元素
  - 使用：
    - 创建ref `xxxRef = React.createRef()`
    - 设置ref `<input ref={this.xxxRef} />`
    - 使用ref `this.xxxRef.current`

6. 受控组件
- 概念：使用 state + onChange 的方式来自动收集表单数据
- 高阶函数：用来将多个函数封装成一个高阶函数用来复用（执行函数返回一个新函数）
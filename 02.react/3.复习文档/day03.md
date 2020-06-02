# day03
1. Fragment
- 概念：文档碎片，用来充当根标签
- 特点：不会生成额外的元素
- 使用：
  - `<Fragment></Fragment>`
  - `<></>`

2. context
- 组件间通信 - 祖孙组件
- 创建context React.createContext()
- 使用context
  - context.Provider 负责提供数据
  - context.Consumer 负责接受使用数据
  - static contextType = context / this.context 负责接受使用数据

3. 性能优化
- shouldComponentUpdate 
  - 自己编码减少重复渲染
  - props和state前后是否一致
  - 适用场景：
    - 只有props或者只有state场景
- PureComponent
  - 内部实现了props和state浅比较（只对比第一层属性）
  - 适用场景：
    - 即有props或者又有state场景

- 注意：更新state一定是一份全新的数据    

4. forwardRef
- 用于工厂函数组件给外面组件（父组件）提供ref
- React.forwardRef((props, ref) => { return <h1 ref={ref}>hello</h1> })

5. Modal
- ReactDOM.createPortal(React元素/element, DOM节点/node)
- 作用：将React元素渲染到根节点root外面去
- 常用于Modal组件

6. HOC
- 高阶组件：本质上是一个函数，接受组件（被包装组件）作为参数，返回一个新组件（包装组件）
- 作用：复用组件代码（给被包装组件传递props）


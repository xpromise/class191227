# Vue Day01

- 渐进式 JS 框架

- 特点：
  - MVVM 模式
  - 编码简洁, 体积小, 运行效率高, 适合移动/PC 端开发
  - 它本身只关注 UI, 可以轻松引入 vue 插件或其它第三库开发项目

## 基本语法

```vue
const vm = new Vue(配置对象)
配置对象：属性名固定的对象
  el  
    值：元素选择器
    作用：获取vm要挂载的DOM元素
      $mount() 可以取代~
  data
    值：对象
    作用：保存要渲染到模板页面的动态数据（一般数据/非函数数据）
  methods
    值：对象
    作用：保存要渲染到模板页面的方法（函数数据）
  computed
    值：对象
    作用：保存计算属性（定义属性getter和setter）
    什么时候使用计算属性？当需要使用属性要通过计算才能使用（data中不用定义这个属性）
    理解：计算属性是一种特殊的data，每次取值需要先计算才能得到~
  watch  
    值：对象
    作用：监视某个data属性的变化
    什么时候使用watch属性？当data属性变化时需要发送AJAX请求，才需要使用（data中必须定义这个属性）
    $watch 可以取代

  特点：data和methods上的属性和方法，最终都会直接挂载到vm/this/Vue实例对象上~
```

## 模板语法

- 插值语法（双大括号表达式）
  - {{JS表达式}}
  - 作用：动态展示JS的数据（可能data、computed、methods...）

- 指令语法: 以v-xxx开头，值为JS表达式（作为标签属性使用）
  - v-model 
    - 实现双向数据绑定
    - 常用于表单标签（可以输入数据的标签），如input、textarea等
  - v-bind  
    - 实现强制数据绑定（单向数据绑定）
    - 简写： :xxx
  - v-on
    - 实现DOM事件监听
    - 简写：@click

## 重点概念的理解

- 双向数据绑定
  - 当你改变页面输入时，数据由View（页面）流向Model（data）,从而修改data数据
  - 当你改变data数据时，数据由Model（data）流向View（页面），从而更新页面数据
  - 这个过程由VM来自动完成的~
- MVVM
  - M - Model
  - V - View
  - VM - ViewModel 通过DOM事件监听和数据绑定来实现双向数据绑定
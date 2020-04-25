# day06 组件间通信

## 1. props

## 2. 自定义事件

1. 原生 DOM 事件

- 绑定事件监听
  - 事件名称(事件名是固定，有限的 n 个事件名)
  - 事件回调函数

```js
document.body.onclick = function (event) {};
```

- 触发事件/分发事件
  - 当用户做了某些操作（点击按钮，移动鼠标...），浏览器会自动触发事件
  - 数据：event 对象

2. Vue 的自定义事件

- 绑定事件监听
  - 事件名称(事件名是任意的。通常不会和原生 DOM 事件一致)
  - 事件回调函数

```js
<MyComponent @my-event="callback" />
<MyComponent @xxx="callback" />
```

- 触发事件/分发事件
  - 手动触发：`this.$emit(事件名称[, 事件参数1, 事件参数2...])`
    - `this.$emit(eventName[, arg1, arg2...])`
    - []代表可选值（可传可不传）
  - 数据：arg1, arg2...

3. 总结自定义事件

- 绑定事件方式

```js
// 方式一
<MyComponent @my-event="callback" />

// 方式二
<MyComponent ref="xxx" />

mounted() {
  this.$refs.xxx.$on('my-event', callback);
}
```

- 触发事件方式: `this.$emit(eventName[, arg1, arg2...])`

- API

  - this.\$on(eventName, callback) 绑定持久事件
  - this.\$once(eventName, callback) 绑定一次性事件
  - this.\$off(eventName, callback) 解绑事件
  - this.\$emit(eventName[, arg1, arg2...]) 触发事件

- 注意：绑定自定义事件的组件对象 A，那么触发事件组件对象也必须是 A，其他组件不能触发（哪个组件绑定事件，只有这个组件可以触发，其他组件触发不了）
- 作用：用于子组件向父组件通信

## 3. 全局事件总线 Event Bus

- 原理：基于自定义事件，解决自定义事件痛点
- 自定义事件痛点：哪个组件绑定事件，只有这个组件可以触发，其他组件触发不了
  - 导致结果只能实现子组件向父组件通信
- 目的：实现所有组件任意通信
- 解决：给任意组件绑定事件，能由任意组件触发事件

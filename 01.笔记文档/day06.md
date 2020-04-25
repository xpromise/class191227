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

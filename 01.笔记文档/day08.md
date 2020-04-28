# day08

## 路由组件的生命周期

当你从 A 组件切换到 B 组件，A 组件会被卸载（销毁）B 组件会被创建
当你从 B 组件切换回 A 组件，B 组件会被卸载（销毁）A 组件会被创建
当你从 C 组件切换到 C 组件，C 组件并不会被重新创建或卸载，而是复用之前 C 组件（仅仅更新了而已）

## 路由组件传参

1. params 参数

- 传递参数
  `<router-link to="/home/message/detail/1">xx</router-link>`
- 接受使用
  `this.$route.params.xxx`

2. query 参数

- 传递参数
  `<router-link to="/home/message/detail?count=123">xx</router-link>`
- 接受使用
  `this.$route.query.xxx`

3. 路由配置 props 传参

- 传递参数
  `<router-link to="/home/message/detail/1?count=123">xx</router-link>`
- routes 配置
  ```js
  {
    path: "detail/:id",
    component: MessageDetail,
    props: (route) => {
      // 返回一个对象，这个对象中所有属性会以props方式传递给 MessageDetail 组件
      return {
        id: +route.params.id,
        count: +route.query.count,
      };
    },
  },
  ```
- 路由组件声明接受
  ```js
  props: {
    id: Number,
    count: Number
  }
  ```
- 使用
  `this.id / this.count`

4. 路由组件 props 传参

- 路由传参
  `<router-view msg="123"></router-view>`
- 当前路由组件声明接受

```js
  props: {
    msg: String,
  }
```

- 使用
  `this.msg`

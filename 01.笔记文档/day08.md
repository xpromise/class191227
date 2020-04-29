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

## 前端路由模式

1. hash

- 优点：兼容性极好
- 缺点：请求路径带#

2. history

   - 优点：请求路径没有#
   - 缺点：兼容性稍差（只能支持 IE10 以上）

3. 总结：开发中一般使用 history 模式

4. 问题

- hash 模式
  hash 模式刷新浏览器时，向服务器发送请求，请求地址 http://localhost:9527/
  服务器返回相应的响应，响应中就会包含 js 代码，js 代码解析时就会根据请求路径 /#/home/news
  加载指定路由组件进行显示
- history 模式
  history 模式刷新浏览器时，向服务器发送请求，请求地址 http://localhost:9527/home/news
  服务器并不能处理 /home/news 只能处理 /，所以找不到相应的后台路由处理，返回 404

  开发的解决方案：
    一旦访问开发服务器 404，就返回 index.html 给你
  （相当于请求所有开发服务器地址，都相当于请求 http://localhost:9527/）

  通过配置webpack来解决：historyApiFallback: true,

  此时产生了新的问题：built.js和bootstrap.css访问路径出了问题
  
  根本原因：输出路径是相对路径 ./ 或 不写
    比如：当前项目路径：http://localhost:9527/home/news
         相对路径会以 http://localhost:9527/home （去掉最后一层路径）
  解决：将输出路径改成 / 开头，路径一定会以服务器根路径补充
    实际路径  http://localhost:9527/

  最终：
    index.html 需要将 href="./bootstrap.css" 改成 href="/bootstrap.css"
    webpack.config.js 需要output上增加 publicPath: '/'
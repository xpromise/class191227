# day07

## 跨域

- 什么是跨域？
  违背了同源策略即是跨域

- 什么是同源策略？
  一个浏览器安全策略（保证浏览器能更加安全的方式运行）
  规定：协议名 / 域名 / 端口 三者必须完全一致

- 谁会产生跨域？
  浏览器检查的跨域，只有浏览器会产生跨域

- 浏览器哪些请求会有跨域问题？
  普通 http 请求：天然可以跨域
  ajax 请求：只能 ajax 请求会有跨域问题

- 解决跨域的方法
  - jsonp
    - 优点：兼容性好
    - 缺点：只能发送 GET 请求
  - cors
    - 优点：能处理任意方式请求
    - 缺点：兼容性稍差
  - 代理服务器
    - 正向代理服务器
      ```js
        proxy: {
          "/api": {
            target: "http://localhost:3000", // 目标服务器地址
            pathRewrite: {
              // 重写请求地址
              "^/api": "", // 将/api重写为''(去掉请求地址的/api)
            },
            changeOrigin: true, // 即使是一个跨域请求也支持
          },
        },
      ```
      - 注意：客户端发送请求的地址就是代理服务器地址！！！
      - 优点：开发时配置，比较简单（目标服务器不需要做任何操作）
      - 缺点：只能用于开发阶段，项目上线还是得用 cors/nginx 方案解决
    - 反向代理服务器（nginx）

## vuex

一个用于集中式管理多个组件共享状态数据的工具

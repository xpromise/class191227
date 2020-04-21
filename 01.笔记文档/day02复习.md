# day02 复习

## 样式处理

- class

  - 多个样式
    - 原生 HTML 写法 `<p class="red green">xxx</p>`
    - 数组形式 `<p :class="['red', 'green']">xxx</p>`
  - 单个样式
    - 对象形式 `<p :class="{red: isRed, green: !isRed}">xxx</p>` （样式名确定，需要选择）
    - 字符串形式 `<p :class="className">xxx</p>` （样式名不确定）

- style

  - 原生 HTML 写法 `<p style="font-size: 20px; color: red;">xxx</p>`
  - vue 语法 `<p :style="{fontSize: size + 'px', color: 'red', marginLeft: '20px'}">xxx</p>` (采用小驼峰命名法)

- class 和 style 该选择使用哪个？
  - 默认情况下使用 class
  - 当样式的值是动态确定，用 style

## 条件渲染

- v-if/v-else-if/v-else
- v-show

  v-if 和 v-show 的区别
  作用：都能实现 DOM 元素切换显示
  v-if 在内存中干掉标签对象来实现隐藏，重新显示时会重新创建
  DOM 树中只有要显示的 DOM 元素，没有隐藏的
  v-show 通过样式 display 来控制显示和隐藏的，显示标签没有样式，隐藏标签会加上 display: none
  DOM 树中所有 DOM 元素都有，只是隐藏的 DOM 元素有一个隐藏样式而已

  如果将来要频繁切换样式显示，用哪个性能好？
  v-show 性能好，
  因为 v-if 要进行更多 DOM 操作：删除 DOM 元素，重新创建新的 DOM 元素
  而 v-show 只要切换 style 样式即可

## 列表渲染

- 遍历数组 `v-for="(item, index) in xxx"`
- 遍历对象 `v-for="(value, key) in xxx"`
- 遍历的每一项元素需要有一个唯一的 key 属性，值有 id 用 id，没有 id 考虑使用 index(后面详细讲)

## 事件处理

- `v-on:click="test"`
- `v-on:click="test(123)"`
- `v-on:click="test(123, $event)"`
- `v-on:click="msg = 123"`
- `@click.prevent="xxx"` 禁止默认行为
- `@click.stop="xxx"` 阻止事件冒泡
- `@keyup.13="xxx"` 适用所有键
- `@keyup.enter="xxx"` 只有少部分键可以使用

## 收集表单数据

- v-model 来收集表单数据
- 提交表单 form 标签绑定@submit.prevent 来接受

## 生命周期函数

1. 是什么？
   Vue 的实例从创建到更新到死亡经历的回调函数
   这是函数由 vue 内部自己调用
2. 有哪些生命周期函数？
   https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA

- 初始化渲染阶段（new Vue()产生，只会执行 1 次）
  beforeCreate
  注意：不能创建 vm 之前触发的，此时已经创建了 vm
  在实现数据代理和监听之前调用的~
  所以：不能访问 data/methods 数据
  created
  在实现数据代理和监听之后调用的~
  可以访问所有数据了~
  beforeMount
  在页面挂载（渲染）之前触发
  mounted
  在页面挂载（渲染）之后触发

- 更新阶段（当 data 数据发生变化，就会自动更新, 触发 n 次）
  beforeUpdate
  在更新之前触发
  此时 data 数据已经更新完毕，但是页面没有更新
  updated
  在更新之后触发
  data 数据更新完毕，页面也更新完毕

- 销毁/死亡阶段( this/vm.\$destroy()触发，触发 1 次 )
  beforeDestroy 在销毁之前调用
  destroyed 在销毁之后调用

3. 重要生命周期函数（开发中常用）  
   created / mounted
   发送 AJAX 请求、设置定时器等一次性任务
   created 速度更快一点点~
   beforeDestroy
   做一些收尾工作：取消 AJAX 请求，清除定时器等(防止内存泄漏~)

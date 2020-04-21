# 几个重要概念

## 数据代理

当你定义 `new Vue({ data: { isShow: true } })` 时，当 Vue 内部解析时会对 data 中的数据进行数据代理
Vue 会自动给 vm（this/实例对象）添加一个直接 isShow 属性，并且设置该属性的 getter 和 setter `类似于~ Object.defineProperty(vm, 'isShow', { get() {}, set() {} })`
所以这些数据具备一些特点，本身是没有值的
当你读取 isShow 属性的值时，内部会自动调用 getter 方法并返回值出去（实际得到的是 getter 方法的返回值）
当你设置 isShow 属性的值时，内部会自动调用 setter 方法，更新值并更新模板页面

## 响应式数据

1. 什么是响应式数据？
   数据一旦发生变化，会自动更新页面/数据
   （页面输入数据发生变化，会自动更新 JS 中 data 数据 / data 数据发生变化，会自动更新页面）

2. 哪些数据是响应式数据？
   Vue 中 data 中所有数据都是响应式数据
   分为两种情况探讨：
   数组数据：内部也会 setter 监视，但是会有例外：
      this.persons[0] = { id: 7, name: "jack" };
      解决： this.persons.splice(0, 1, { id: 7, name: "jack" });
   对象数据/其他类型数据：内部都会给属性添加 setter 进行监视，值一旦发生变 化，即会更新值也会触发页面的更新

3. 响应式和非响应式
   响应式数据
      data 中的所有数据（data 对象，data 函数返回的对象）
      通过 vm.$set() / Vue.set() 设置的属性数据
   非响应式数据   
      手动给vm添加属性  
        this.msg2 = xxx
      手动通过 . 方式给data数据添加额外的属性（得使用vm.$set()解决）
        this.person.age = 18

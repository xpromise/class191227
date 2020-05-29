function Watcher(vm, expOrFn, cb) {
  this.cb = cb;
  this.vm = vm;
  this.expOrFn = expOrFn;
  this.depIds = {};

  if (typeof expOrFn === "function") {
    this.getter = expOrFn;
  } else {
    this.getter = this.parseGetter(expOrFn.trim());
  }

  this.value = this.get();
}

Watcher.prototype = {
  constructor: Watcher,
  update: function () {
    this.run();
  },
  run: function () {
    // 读取属性最新的值
    var value = this.get();
    // 读取属性上一次的值
    var oldVal = this.value;
    // 如果值相等，就不更新
    if (value !== oldVal) {
      // 将最新的值保存起来
      this.value = value;
      // 调用更新用户界面的方法cb去更新
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep: function (dep) {
    // 1. 每次调用run()的时候会触发相应属性的getter
    // getter里面会触发dep.depend()，继而触发这里的addDep
    // 2. 假如相应属性的dep.id已经在当前watcher的depIds里，说明不是一个新的属性，仅仅是改变了其值而已
    // 则不需要将当前watcher添加到该属性的dep里
    // 3. 假如相应属性是新的属性，则将当前watcher添加到新属性的dep里
    // 如通过 vm.child = {name: 'a'} 改变了 child.name 的值，child.name 就是个新属性
    // 则需要将当前watcher(child.name)加入到新的 child.name 的dep里
    // 因为此时 child.name 是个新值，之前的 setter、dep 都已经失效，如果不把 watcher 加入到新的 child.name 的dep中
    // 通过 child.name = xxx 赋值的时候，对应的 watcher 就收不到通知，等于失效了
    // 4. 每个子属性的watcher在添加到子属性的dep的同时，也会添加到父属性的dep
    // 监听子属性的同时监听父属性的变更，这样，父属性改变时，子属性的watcher也能收到通知进行update
    // 这一步是在 this.get() --> this.getVMVal() 里面完成，forEach时会从父级开始取值，间接调用了它的getter
    // 触发了addDep(), 在整个forEach过程，当前wacher都会加入到每个父级过程属性的dep
    // 例如：当前watcher的是'child.child.name', 那么child, child.child, child.child.name这三个属性的dep都会加入当前watcher

    // 判断有没有保存过dep（通过id判断）
    if (!this.depIds.hasOwnProperty(dep.id)) {
      // 给dep保存watcher
      // 为什么给dep保存watcher？
      // 因为watcher有更新用户界面的方法，当dep对应的响应式数据发生变化，
      // 就能通过dep找到所有的watcher，从而更新用户界面
      dep.addSub(this);
      // 给watcher保存dep
      // 为什么给watcher保存dep？
      // 防止dep保存多次同一个watcher
      this.depIds[dep.id] = dep;
      // 为什么dep保存watcher用subs数组？而watcher保存dep用depIds对象？
      // this.depIds = { 0: dep0, 1: dep1 } 对象查找属性比数组遍历查找值快的多
      // this.depIds = [0, 1] 就需要遍历，相当于要遍历所有元素
    }
  },
  get: function () {
    Dep.target = this;
    var value = this.getter.call(this.vm, this.vm);
    Dep.target = null;
    return value;
  },
  parseGetter: function (exp) {
    if (/[^\w.$]/.test(exp)) return;
    var exps = exp.split(".");
    return function (obj) {
      for (var i = 0, len = exps.length; i < len; i++) {
        if (!obj) return;
        obj = obj[exps[i]];
      }
      return obj;
    };
  },
};

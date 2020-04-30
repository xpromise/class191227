function Observer(data) {
  // 存储data
  this.data = data;
  // 走你
  this.walk(data);
}

Observer.prototype = {
  constructor: Observer,
  walk: function (data) {
    var me = this;
    // 遍历第一层属性
    Object.keys(data).forEach(function (key) {
      // me.convert(key, data[key]);
      // 将数据重新定义成响应式数据
      me.defineReactive(data, key, data[key]);
    });
  },
  convert: function (key, val) {
    this.defineReactive(this.data, key, val);
  },

  defineReactive: function (data, key, val) {
    // 创建dep对象
    // 所有响应式数据（data）都会有一个唯一的dep对象
    // dep对象会通过闭包的方式保存响应式数据的getter和setter中
    var dep = new Dep();
    // 因为遍历只能遍历第一层属性，如果属性值是对象，还需要再进行响应式处理
    // 进行隐式递归调用
    // 最终结果：data上所有属性都会变成响应式属性
    var childObj = observe(val);

    // 将data上数据定义成响应式
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      get: function () {
        // 判断 Dep.target --> 当前有没有要处理的watcher
        if (Dep.target) {
          // 建立 dep 和 watcher 的联系
          dep.depend();
        }
        return val;
      },
      set: function (newVal) {
        if (newVal === val) {
          return;
        }
        // 更新值
        val = newVal;
        // 新的值是object的话，又要改成响应式数据
        childObj = observe(newVal);
        // 通知订阅者
        // 通过watcher更新用户界面
        dep.notify();
      },
    });
  },
};

function observe(value, vm) {
  // 判断值是否是对象，只有对象才需要变成响应式
  if (!value || typeof value !== "object") {
    return;
  }

  return new Observer(value);
}

var uid = 0;

function Dep() {
  this.id = uid++;
  this.subs = [];
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },

  depend: function () {
    // 给watcher添加dep
    // watcher.addDep(dep)
    Dep.target.addDep(this);
  },

  removeSub: function (sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  },

  notify: function () {
    // 遍历所有watcher
    this.subs.forEach(function (sub) {
      // 调用watcher的更新方法
      sub.update();
    });
  },
};

Dep.target = null;

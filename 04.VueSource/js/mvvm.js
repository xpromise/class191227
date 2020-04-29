/**
 * MVVM相当于Vue
 * @param {Object} options 配置对象
 */
function MVVM(options) {
  // 保存options到vm上
  this.$options = options || {};
  // 保存data数据到vm上 _data
  var data = (this._data = this.$options.data);
  // 保存vm
  var me = this;

  // 数据代理
  // 代理data属性数据到vm上
  // 遍历data数据中所有属性名成一个数组
  Object.keys(data).forEach(function (key) {
    // 进行数据代理
    me._proxyData(key);
  });

  // 代理computed计算属性到vm上
  this._initComputed();

  observe(data, this);

  // 编译模板
  this.$compile = new Compile(options.el || document.body, this);
}

MVVM.prototype = {
  constructor: MVVM,
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  // 代理data属性到vm上
  _proxyData: function (key, setter, getter) {
    var me = this;
    setter =
      setter ||
      Object.defineProperty(me, key, {
        configurable: false, // 不能重新配置
        enumerable: true, // 可以被遍历
        get: function proxyGetter() {
          // 代理属性读操作
          return me._data[key]; // 返回原属性的值
        },
        set: function proxySetter(newVal) {
          // 代理属性写操作
          me._data[key] = newVal; // 设置原属性的值
        },
      });
  },

  // 代理computed计算属性到vm上
  _initComputed: function () {
    var me = this;
    // 获取computed对象
    var computed = this.$options.computed;
    if (typeof computed === "object") {
      Object.keys(computed).forEach(function (key) {
        // 数据代理
        Object.defineProperty(me, key, {
          get:
            typeof computed[key] === "function"
              ? computed[key]
              : computed[key].get,
          // 计算属性不需要设置，计算属性当里面的值发生变化会自动更新
          set: function () {},
        });
      });
    }
  },
};

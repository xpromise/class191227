/**
 * 用来编译模板
 * @param {dom/string} el dom元素/元素选择器
 * @param {object} vm MVVM实例对象
 */
function Compile(el, vm) {
  // 保存vm
  this.$vm = vm;
  // 获取dom元素保存起来
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);

  if (this.$el) {
    // 1. 将元素所有子节点添加到新的创建文档碎片节点中
    this.$fragment = this.node2Fragment(this.$el);
    // 2. 递归编译文档碎片节点所有子节点
    this.init();
    // 3. 将编译好文档碎片节点添加到页面中生效
    this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype = {
  constructor: Compile,
  node2Fragment: function (el) {
    // 创建文档碎片节点
    var fragment = document.createDocumentFragment(),
      child;

    // 将原生节点拷贝到fragment
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }

    return fragment;
  },

  init: function () {
    // 递归编译所有子节点方法
    this.compileElement(this.$fragment);
  },

  compileElement: function (el) {
    // 取出当前元素所有子节点
    var childNodes = el.childNodes,
      me = this;
    // 转换成数组进行遍历
    [].slice.call(childNodes).forEach(function (node) {
      // 获取节点的文本内容
      var text = node.textContent;
      // 定义一个用于匹配插值语法的正则
      var reg = /\{\{(.*)\}\}/;

      // 判断当前元素是否是元素节点
      if (me.isElementNode(node)) {
        me.compile(node);
        // 判断当前元素是否文本节点
        // 并且里面是否有插值语法
      } else if (me.isTextNode(node) && reg.test(text)) {
        // 编译插值语法
        // RegExp.$1.trim() 取出插值语法中的表达式
        me.compileText(node, RegExp.$1.trim());
      }

      // 判断当前节点是否还有子节点
      if (node.childNodes && node.childNodes.length) {
        // 递归编译子节点
        me.compileElement(node);
      }
    });
  },

  compile: function (node) {
    var nodeAttrs = node.attributes,
      me = this;

    [].slice.call(nodeAttrs).forEach(function (attr) {
      var attrName = attr.name;
      if (me.isDirective(attrName)) {
        var exp = attr.value;
        var dir = attrName.substring(2);
        // 事件指令
        if (me.isEventDirective(dir)) {
          compileUtil.eventHandler(node, me.$vm, exp, dir);
          // 普通指令
        } else {
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }

        node.removeAttribute(attrName);
      }
    });
  },

  /**
   * 编译插值语法
   * @param {*} node 节点
   * @param {*} exp expression 表达式
   */
  compileText: function (node, exp) {
    compileUtil.text(node, this.$vm, exp);
  },

  isDirective: function (attr) {
    return attr.indexOf("v-") == 0;
  },

  isEventDirective: function (dir) {
    return dir.indexOf("on") === 0;
  },

  isElementNode: function (node) {
    return node.nodeType == 1;
  },

  isTextNode: function (node) {
    return node.nodeType == 3;
  },
};

// 指令处理集合
var compileUtil = {
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, "text");
  },

  html: function (node, vm, exp) {
    this.bind(node, vm, exp, "html");
  },

  model: function (node, vm, exp) {
    this.bind(node, vm, exp, "model");

    var me = this,
      val = this._getVMVal(vm, exp);
    node.addEventListener("input", function (e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }

      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },

  class: function (node, vm, exp) {
    this.bind(node, vm, exp, "class");
  },

  /**
   *
   * @param {*} node 节点
   * @param {*} vm 实例对象
   * @param {*} exp expression表达式 'wife.name'
   * @param {*} dir directive指令 'text'
   */
  bind: function (node, vm, exp, dir) {
    // 取出要处理的函数 textUpdater
    var updaterFn = updater[dir + "Updater"];
    // 判断函数是否存在并调用
    // this._getVMVal(vm, exp) --> 用来通过vm找到表达式对应的值
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));

    new Watcher(vm, exp, function (value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue);
    });
  },

  // 事件处理
  eventHandler: function (node, vm, exp, dir) {
    var eventType = dir.split(":")[1],
      fn = vm.$options.methods && vm.$options.methods[exp];

    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },

  /**
   * 获取vm上对应表达式的值
   * @param {*} vm
   * @param {*} exp 表达式 'wife.name'
   */
  _getVMVal: function (vm, exp) {
    var val = vm;
    exp = exp.split("."); // ['wife', 'name']
    // 第一次遍历 val = vm['wife'] = {xxx}
    // 第二次遍历 val = {xxx}['name'] = 'rose'
    exp.forEach(function (k) {
      val = val[k];
    });
    return val; // 'rose'
  },

  _setVMVal: function (vm, exp, value) {
    var val = vm;
    exp = exp.split(".");
    exp.forEach(function (k, i) {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  },
};

var updater = {
  textUpdater: function (node, value) {
    // 给node节点设置文本内容
    node.textContent = typeof value == "undefined" ? "" : value;
  },

  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value == "undefined" ? "" : value;
  },

  classUpdater: function (node, value, oldValue) {
    var className = node.className;
    className = className.replace(oldValue, "").replace(/\s$/, "");

    var space = className && String(value) ? " " : "";

    node.className = className + space + value;
  },

  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value == "undefined" ? "" : value;
  },
};

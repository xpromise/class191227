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
        // 编译指令语法
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
    // 获取当前元素所有属性
    var nodeAttrs = node.attributes,
      me = this;

    [].slice.call(nodeAttrs).forEach(function (attr) {
      // 获取当个属性名 v-on:click
      var attrName = attr.name;
      // 判断属性是否是指令属性
      if (me.isDirective(attrName)) {
        // 获取指令属性对应表达式
        var exp = attr.value;
        // 截取指令属性 on:click
        var dir = attrName.substring(2);
        // 事件指令
        if (me.isEventDirective(dir)) {
          // 给元素绑定事件
          compileUtil.eventHandler(node, me.$vm, exp, dir);
          // 普通指令
        } else {
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }

        // 将编译好的属性给删除掉
        // 只会删除指令属性，其他属性进不来
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
    // 给数据进行初始化显示
    // node.value = xxx
    this.bind(node, vm, exp, "model");

    var me = this,
      // 读取当前属性的值 
      val = this._getVMVal(vm, exp);
    // 绑定input事件，监听元素的value的变化
    node.addEventListener("input", function (e) {
      // 获取当前元素最新的值
      var newValue = e.target.value;
      // 如果相等就不更新
      if (val === newValue) {
        return;
      }
      // 更新data数据 --> 触发setter方法，从而更新用户界面
      me._setVMVal(vm, exp, newValue);
      // 将当前值存起来，方便进行下一次比较~
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
    
    /*
      凡是 普通指令语法和插值语法 的元素会有watcher
      watcher都会有一个更新用户界面回调函数
    */
    new Watcher(vm, exp, function (value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue);
    });
  },

  /**
   * 事件处理
   * @param {*} node 元素节点
   * @param {*} vm 实例对象
   * @param {*} exp 指令表达式 show
   * @param {*} dir 指令 on:click
   */
  eventHandler: function (node, vm, exp, dir) {
    // 获取事件类型 ['on', 'click']
    var eventType = dir.split(":")[1],
      // 获取事件回调函数
      fn = vm.$options.methods && vm.$options.methods[exp];

    if (eventType && fn) {
      // 绑定事件监听
      // 改变事件回调函数的this为vm fn.bind(vm)
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

  // 设置vm上对应表达式的值
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
    // 给node节点设置html内容
    node.innerHTML = typeof value == "undefined" ? "" : value;
  },
  /**
   * 处理class方法
   * @param {*} node
   * @param {*} value 表达式的值。font
   */
  classUpdater: function (node, value) {
    // 获取元素上的class属性的值 red
    var className = node.className;
    // 给元素设置新的className
    // 新的className=原来的class + ' ' + v-class设置的class
    node.className = className + " " + value;
  },

  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value == "undefined" ? "" : value;
  },
};

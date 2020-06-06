/**
 * 将虚拟DOM对象渲染到页面真实DOM容器中
 * @param {虚拟DOM对象} vnode
 * @param {页面真实DOM容器} container
 */
export function render(vnode, container) {
  mount(vnode, container);
}

function mount(vnode, container) {
  const { $$typeof } = vnode;
  // 1. 如果是普通虚拟DOM对象
  if ($$typeof === 1) {
    /*
      vnode:
      {
        type: "h1"
        props: { 
          id: "title", 
          className: "title", 
          children: [
            'hello'
          ]
        }
      }
    */
    mountVDOM(vnode, container);
    return;
  }
  // 2. 如果是工厂函数组件
  if ($$typeof === 2) {
    mountFunc(vnode, container);
    return;
  }

  // 3. 如果ES6类组件
  if ($$typeof === 3) {
    mountClass(vnode, container);
    return;
  }

  // 4. 其他~ 文本节点
  mountTextNode(vnode, container);
}

// 处理ES6类组件
function mountClass(vnode, container) {
  const { type, props } = vnode;
  const config = {};
  // 过滤不需要的属性
  Object.keys(props)
    .filter((key) => !key.startsWith("__")) // 过滤不需要的属性
    .forEach((key) => {
      config[key] = props[key];
    });
  // 调用类组件得到实例对象，
  const obj = new type(config);
  // 得到要渲染的虚拟DOM对象
  const vDOM = obj.render();
  // 渲染~
  mount(vDOM, container);
}

// 处理工厂函数组件
function mountFunc(vnode, container) {
  const { type, props } = vnode;
  const config = {};
  // 过滤不需要的属性
  Object.keys(props)
    .filter((key) => !key.startsWith("__")) // 过滤不需要的属性
    .forEach((key) => {
      config[key] = props[key];
    });
  // 调用工厂函数组件，得到要渲染的虚拟DOM对象
  const vDOM = type(config);
  // 渲染~
  mount(vDOM, container);
}

// 处理文本节点
function mountTextNode(vnode, container) {
  // 创建文本节点
  const textNode = document.createTextNode(vnode);
  container.appendChild(textNode);
}

// 处理普通元素
function mountVDOM(vnode, container) {
  // 取出元素节点类型
  const { type, props } = vnode;
  // children 是子元素
  // restProps 是剩下所有属性： id className
  const { children, ...restProps } = props;
  // 创建DOM元素
  const node = document.createElement(type);

  // 添加子元素
  // 因为children可能没有值
  if (Array.isArray(children)) {
    children.forEach((childNode) => {
      // childNode可能还是一个虚拟DOM对象
      mount(childNode, node); // 函数递归调用
    });
  }

  if (restProps) {
    // 添加标签属性
    Object.keys(restProps)
      .filter((key) => !key.startsWith("__")) // 过滤私有属性
      .forEach((key) => {
        if (key === "className") {
          node.setAttribute("class", props[key]);
          return;
        }
        if (key.slice(0, 2) === "on") {
          // 绑定事件
          const eventName = key.slice(2).toLowerCase(); // 事件名得是小写
          node.addEventListener(eventName, props[key]);
          return;
        }
        node.setAttribute(key, props[key]);
      });
  }

  // 统一将元素挂载container上
  container.appendChild(node);
}

export default {
  render,
};

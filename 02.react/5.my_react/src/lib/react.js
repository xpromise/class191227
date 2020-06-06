/**
 * 创建虚拟DOM对象
 * @param {元素类型} type
 * @param {元素属性} props
 * @param  {子元素} children
 * @return 虚拟DOM对象
 */
export function createElement(type, props, ...children) {
  props.children = children;

  /*
    区分普通元素、工厂函数组件、ES6类组件
      普通元素可以直接渲染
      工厂函数组件需要调用才有要渲染的内容
      ES6类组件需要new调用产生实例对象，在调用实例对象的render方法，才能得到要渲染的内容

      如果是普通元素，解析时type类型就是string
      如果是组件，解析时type类型就是function
 */

  let $$typeof; // 元素标识：1代表普通元素 2代表工厂函数组件 3代表ES6类组件

  if (typeof type === "string") {
    $$typeof = 1;
  }

  if (typeof type === "function") {
    // 判断组件
    // isReactComponent属性只有ES6类组件才有
    $$typeof = type.isReactComponent ? 3 : 2;
  }

  // 返回虚拟DOM对象
  return {
    $$typeof, // 元素/组件类型标识
    type, // 元素具体类型
    props, // 元素属性
  };
}

export class Component {
  // 类的静态属性 Component.isReactComponent
  static isReactComponent = {}; // ES6类组件标识

  constructor(props) {
    this.props = props;
  }
}

export default {
  createElement,
  Component,
};

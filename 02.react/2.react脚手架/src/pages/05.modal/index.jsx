import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import "./index.css";

/*
  ReactDOM.createPortal(要渲染的元素, 渲染到哪个容器)
    将某个组件（某些元素）渲染到根节点以外~
    1. constructor 创建DOM元素 
      this.div = document.createElement('div') 
      挂载在this上，方便在组件任意地方访问
    2. render ReactDOM.createPortal(要渲染的元素, this.div)
      将要渲染的元素渲染到div内
    3. componentDidMount document.body.appendChild(this.div)
      将div插入到body中生效，此时就能看到modal了~
    4. 防止组件卸载/重新创建过程中创建多个div
      componentWillUnmount --> this.div.remove()  将自己和自己的子元素全部干掉 

  通常情况下不会使用，一般用于Modal组件  
*/
export default class Modal extends Component {
  // https://react.docschina.org/docs/typechecking-with-proptypes.html
  static propTypes = {
    title: PropTypes.oneOfType([
      // 以下类型的其中一个
      PropTypes.string, // 字符串类型
      PropTypes.element, // React元素类型
    ]).isRequired,
    content: PropTypes.oneOfType([
      // 以下类型的其中一个
      PropTypes.string, // 字符串类型
      PropTypes.element, // React元素类型
    ]).isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
  };

  static defaultValue = {
    onCancel: () => {},
    onOk: () => {},
  };

  constructor() {
    super();
    // 初始化容器 div
    this.div = document.createElement("div");
  }

  componentDidMount() {
    // 在页面渲染完毕时触发的 --> render已经调用了
    // --> ReactDOM.createPortal 已经将Modal渲染到div内
    // 将div元素插入到页面中生效
    document.body.appendChild(this.div);
  }

  componentWillUnmount() {
    // 组件卸载了~ 清除多余元素
    this.div.remove();
  }

  render() {
    // 接受外面传递的数据
    const { title, content, visible, onCancel, onOk } = this.props; // 父组件给子组件传递数据

    // 要渲染的元素
    const Modal = (
      <div className="modal" style={{ display: visible ? "block" : "none" }}>
        <div className="modal-wrap">
          <div className="modal-wrap-header">
            <h3>{title}</h3>
            <button onClick={onCancel}>x</button>
          </div>
          <div className="modal-wrap-content">{content}</div>
          <div className="modal-wrap-footer">
            <button onClick={onCancel}>取消</button>
            <button onClick={onOk}>确认</button>
          </div>
        </div>
        <div className="modal-mask"></div>
      </div>
    );

    // 将 Modal元素渲染到 div 内
    return ReactDOM.createPortal(Modal, this.div);
  }
}

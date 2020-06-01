import React, { Component } from "react";
import PropTypes from "prop-types";

import "./index.css";

export default class Modal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
  };

  state = {
    visible: false, // 决定组件显示/隐藏
  };

  render() {
    // 写死不行
    // const title = "title~~~";
    // const content = (
    //   <div>
    //     <p>content...</p>
    //     <p>content...</p>
    //     <p>content...</p>
    //   </div>
    // );

    // 接受外面传递的数据
    const { title, content } = this.props; // 父组件给子组件传递数据

    const { visible } = this.state;

    return (
      <div className="modal" style={{ display: visible ? "block" : "none" }}>
        <div className="modal-wrap">
          <div className="modal-wrap-header">
            <h3>{title}</h3>
            <button>x</button>
          </div>
          <div className="modal-wrap-content">{content}</div>
          <div className="modal-wrap-footer">
            <button>取消</button>
            <button>确认</button>
          </div>
        </div>
        <div className="modal-mask"></div>
      </div>
    );
  }
}

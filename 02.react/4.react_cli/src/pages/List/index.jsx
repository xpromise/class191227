import React, { Component } from "react";
import { connect } from "react-redux";
import { delComment } from "../../redux/actions";

@connect((state) => ({ comments: state.comments }), { delComment })
class List extends Component {
  handleClick = (id) => {
    return () => {
      if (window.confirm(`您确认要删除当前评论吗~`)) {
        this.props.delComment(id);
      }
    };
  };

  render() {
    // 获取容器组件传递的redux数据
    const { comments } = this.props;

    return (
      <div className="col-md-8">
        <h3 className="reply">评论回复：</h3>
        <h2 style={{ display: comments.length ? "none" : "block" }}>
          暂无评论，点击左侧添加评论！！！
        </h2>
        <ul className="list-group">
          {comments.map((comment) => {
            return (
              <li className="list-group-item" key={comment.id}>
                <div className="handle">
                  <a href="javascript:;" onClick={this.handleClick(comment.id)}>
                    删除
                  </a>
                </div>
                <p className="user">
                  <span>{comment.name}</span>
                  <span>说:</span>
                </p>
                <p className="centence">{comment.content}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default List;

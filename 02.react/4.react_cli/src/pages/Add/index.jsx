import React, { Component } from "react";
import { connect } from "react-redux";
import { addComment } from "../../redux/actions";

// 传递redux添加数据的方法
@connect(null, { addComment })
class Add extends Component {
  state = {
    name: "",
    content: "",
  };

  handleChange = (key) => {
    return (e) => {
      this.setState({
        [key]: e.target.value,
      });
    };
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, content } = this.state;
    if (!name || !content) {
      alert("输入数据不能为空");
      return;
    }
    this.props.addComment({ name, content, id: Date.now() });
    this.setState({
      name: "",
      content: "",
    });
  };

  render() {
    const { name, content } = this.state;

    return (
      <div className="col-md-4">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>用户名</label>
            <input
              type="text"
              className="form-control"
              placeholder="用户名"
              onChange={this.handleChange("name")}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>评论内容</label>
            <textarea
              className="form-control"
              rows="6"
              placeholder="评论内容"
              onChange={this.handleChange("content")}
              value={content}
            ></textarea>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              {/* submit才能触发onSubmit事件 */}
              <button type="submit" className="btn btn-default pull-right">
                提交
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Add;

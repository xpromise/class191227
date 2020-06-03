import React, { Component } from "react";
import { Button, message } from "antd";

// import "antd/dist/antd.min.css";

/*
  问题：
    1. 默认情况下会打包所有样式文件
      所以文件体积比较大
      解决：按需加载 --> 根据要使用组件，选择加载相应的样式

      before
        66.89 KB (+27.5 KB)  build\static\js\2.9562fa41.chunk.js
        63.2 KB              build\static\css\2.62c75a07.chunk.css
        778 B                build\static\js\runtime-main.5e442980.js
        563 B (-591 B)       build\static\js\main.f29778f9.chunk.js 
      after
        66.28 KB (-625 B)    build\static\js\2.ff3f760e.chunk.js
        9.78 KB (-53.42 KB)  build\static\css\2.a22bbdad.chunk.css
        778 B                build\static\js\runtime-main.5e442980.js
        565 B (+2 B)         build\static\js\main.15eb5f51.chunk.js
*/

export default class App extends Component {
  handleClick = () => {
    message.success("hello antd~");
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>默认按钮</Button>
        <Button type="primary">经典按钮</Button>
        <Button type="danger">危险按钮</Button>
      </div>
    );
  }
}

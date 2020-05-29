/*
  注册需要使用elementUI组件
*/

import Vue from "vue";
import { Button, MessageBox, Message } from "element-ui";

// 安装Button --> 注册Button全局组件
Vue.use(Button);
// 注册Button全局组件
// Vue.component(Button.name, Button);

// 给Vue添加全局方法
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

<template>
  <div class="col-md-8">
    <h3 class="reply">评论回复：</h3>
    <!-- 
      comments.length === 0 
      当评论数量等0（没有评论），返回值true，显示
      当评论数量不等于0（有评论），返回值false，不显示/隐藏
     -->
    <h2 v-show="comments.length === 0">暂无评论，点击左侧添加评论！！！</h2>
    <ul class="list-group">
      <!-- 
        以props（标签属性）方式传递comment数据 
        key属性是给vue内部使用，不属于props，组件内部就不能使用
      -->
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </ul>
  </div>
</template>

<script>
import PubSub from "pubsub-js";
import CommentItem from "@comps/CommentItem";

export default {
  data() {
    /*
      数据定义在哪个组件中？
        哪个组件需要数据显示，就定义哪个组件 CommentList
    */
    return {
      comments: [
        { id: 2, name: "jack", content: "I Love Rose" },
        { id: 1, name: "rose", content: "I Love Jack" },
      ],
    };
  },
  created() {
    // 定阅添加评论消息
    PubSub.subscribe("add-comment", (msg, data) => {
      console.log(msg); // 消息名称
      console.log(data); // 消息数据
      /*
        Uncaught TypeError: Cannot read property 'addComment' of undefined
        错误根本原因：this 是 undefined 
        什么场景下this是undefined？
          ES5严格模式下  
            this --> window  --> undefined
          原因：webpack中使用了babel --> ES6语法编译ES5以下语法（此时加上严格模式~）  
        解决：箭头函数
      */
      this.addComment(data);
    });

    PubSub.subscribe("del-comment", (msg, data) => {
      this.delComment(data);
    });
  },
  beforeDestory() {
    // 在组件销毁时，解绑消息
    PubSub.unsubscribe("add-comment");
    PubSub.unsubscribe("del-comment");
  },
  methods: {
    // 添加评论方法
    addComment(comment) {
      // unshift是变异方法，既能更新数据，也能更新页面
      this.comments.unshift(comment);
    },
    // 删除评论方法
    delComment(id) {
      this.comments = this.comments.filter((comment) => comment.id !== id);
    },
  },
  components: {
    CommentItem,
  },
};
</script>

<style scoped>
.reply {
  margin-top: 0px;
}
</style>

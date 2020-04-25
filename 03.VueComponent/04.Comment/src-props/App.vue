<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对Vue的评论</h1>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <!-- 3. 使用组件 -->
      <AddComment :addComment="addComment" />
      <!-- 以props（标签属性）方式传递comments数据 -->
      <CommentList :comments="comments" :delComment="delComment" />
    </div>
  </div>
</template>

<script>
// 1. 引入组件
import AddComment from "@comps/AddComment";
import CommentList from "@comps/CommentList";

export default {
  data() {
    return {
      // 定义数据
      comments: [
        { id: 2, name: "jack", content: "I Love Rose" },
        { id: 1, name: "rose", content: "I Love Jack" },
      ],
    };
  },
  methods: {
    // 数据源在哪里，更新数据的方法就定义在哪
    // 添加评论方法
    addComment(comment) {
      // unshift是变异方法，既能更新数据，也能更新页面
      this.comments.unshift(comment);
    },
    // 删除评论方法
    delComment(id) {
      this.comments = this.comments.filter((comment) => comment.id !== id);
      // this.xxx[0]
      // this.xxx.age
      // this.xxx
    },
  },
  components: {
    // 2. 注册组件
    AddComment,
    CommentList,
  },
};
</script>

<style></style>

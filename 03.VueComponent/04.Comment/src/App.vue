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
      <AddComment />
      <!-- 以props（标签属性）方式传递comments数据 -->
      <CommentList :comments="comments" />
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
        { id: 1, name: "jack", content: "I Love Rose" },
        { id: 2, name: "rose", content: "I Love Jack" },
      ],
    };
  },
  components: {
    // 2. 注册组件
    AddComment,
    CommentList,
  },
};
</script>

<style></style>

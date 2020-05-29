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
      <AddComment />
      <CommentList />
    </div>
  </div>
</template>

<script>
// 1. 引入组件
import AddComment from "@comps/AddComment";
import CommentList from "@comps/CommentList";

export default {
  components: {
    // 2. 注册组件
    AddComment,
    CommentList,
  },
};
</script>

<style></style>

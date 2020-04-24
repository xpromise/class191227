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
        :delComment="delComment"
      />
    </ul>
  </div>
</template>

<script>
import CommentItem from "@comps/CommentItem";
export default {
  // 声明要接受的属性
  // 一旦声明接受comments属性，组件实例对象上就会自动添加comments属性
  props: ["comments", "delComment"],
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

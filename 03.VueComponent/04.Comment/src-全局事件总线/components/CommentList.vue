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
  mounted() {
    // 绑定添加评论事件
    this.$bus.$on("add-comment", this.addComment);
    // 绑定删除评论事件
    this.$bus.$on("del-comment", this.delComment);
  },
  beforeDestory() {
    // 在组件销毁时，解绑事件
    this.$bus.$off("add-comment", this.addComment);
    this.$bus.$off("del-comment", this.delComment);
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

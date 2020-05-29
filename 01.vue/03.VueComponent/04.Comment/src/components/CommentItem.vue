<template>
  <li class="list-group-item">
    <div class="handle">
      <a href="javascript:;" @click.prevent="handleDel">删除</a>
    </div>
    <p class="user">
      <span>{{ comment.name }}</span>
      <span>说:</span>
    </p>
    <p class="centence">{{ comment.content }}</p>
  </li>
</template>

<script>
import PubSub from "pubsub-js";
export default {
  props: {
    /*
      key 要接受的属性名
      value 属性值的类型
    */
    comment: Object,
  },
  methods: {
    handleDel() {
      if (window.confirm(`您确认要删除评论吗?`)) {
        // 触发删除评论的事件
        // this.$bus.$emit("del-comment", this.comment.id);
        PubSub.publish("del-comment", this.comment.id);
      }
    },
  },
};
</script>

<style scoped>
li {
  transition: 0.5s;
  overflow: hidden;
}

.handle {
  width: 40px;
  border: 1px solid #ccc;
  background: #fff;
  position: absolute;
  right: 10px;
  top: 1px;
  text-align: center;
}

.handle a {
  display: block;
  text-decoration: none;
}

.list-group-item .centence {
  padding: 0px 50px;
}

.user {
  font-size: 22px;
}
</style>

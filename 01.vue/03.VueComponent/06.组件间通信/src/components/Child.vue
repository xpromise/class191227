<template>
  <div>
    <!-- 标题 -->
    <!-- 专门接受父组件传递的标签数据~ -->
    <slot name="title" ></slot>
    <div>
      <!-- 
        列表数据 
        强制绑定persons数据 （会将子组件persons数据传递父组件）
      -->
      <slot name="list" :persons="persons"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      persons: [
        { id: 1, name: "jack" },
        { id: 2, name: "rose" },
      ],
    };
  },
};
</script>

<style scoped></style>

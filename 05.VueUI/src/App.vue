<template>
  <div>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success" plain>成功按钮</el-button>
    <el-button type="warning" round @click="open">警告按钮</el-button>
    <el-button type="danger" icon="el-icon-delete" circle></el-button>
  </div>
</template>

<script>
export default {
  methods: {
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped></style>

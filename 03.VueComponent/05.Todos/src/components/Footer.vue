<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isSelectAll" />
    </label>
    <span>
      <span>已完成{{ completedLength }}</span> / 全部{{ todos.length }}</span
    >
    <!-- 
      表达式：
          !!xxx 为了将xxx数据强制转换成布尔值
          !xxx 为了xxx数据强制转换成布尔值并取反

      @click="delCompletedTodo" 可以直接把父组件方法设置上去    
    -->
    <button
      class="btn btn-danger"
      v-show="!!completedLength"
      @click="handleDel"
    >
      清除已完成任务
    </button>
  </div>
</template>

<script>
export default {
  props: {
    todos: Array,
    handleSelectAll: Function,
    delCompletedTodo: Function,
  },
  methods: {
    handleDel() {
      if (window.confirm("你确认要删除已选中的数据吗?")) {
        this.delCompletedTodo();
      }
    },
  },
  computed: {
    // completedLength: {
    //   get() {},
    //   set() {}
    // },
    completedLength() {
      // 属性读取的方法
      let length = 0;
      this.todos.forEach((todo) => {
        if (todo.completed) {
          length++;
        }
      });
      return length;
    },
    isSelectAll: {
      get() {
        // this.completedLength === this.todos.length 当选中数据等于todos长度
        return (
          this.completedLength === this.todos.length && this.completedLength > 0
        );
      },
      set(val) {
        /*
          val值：
            true 代表全选 --> 将todos的completed全改成true
            false 代表全不选 --> 将todos的completed全改成false
        */
        // console.log(val);
        this.handleSelectAll(val);
      },
    },
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>

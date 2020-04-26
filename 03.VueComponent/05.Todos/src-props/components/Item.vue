<template>
  <!-- 
    mouseenter/mouseleave （通常用法）
      进入元素触发mouseover 离开元素触发mouseout
      和子元素无关
    mouseover/mouseout 
      进入元素触发mouseover 离开元素触发mouseout
      如果进入子元素，会触发父元素mouseout / 子元素mouseover
      问题：导致事件触发n次
   -->
  <li
    @mouseenter="handleEnter(true)"
    @mouseleave="handleEnter(false)"
    :style="{ backgroundColor: bgColor }"
  >
    <label>
      <!-- 
          v-model是双向数据绑定，
          导致问题：会直接修改App组件  
          注意：不应该直接修改App组件数据，应该通过App组件的方法来修改
      -->
      <!-- <input type="checkbox" v-model="todo.completed" /> -->
      <input type="checkbox" v-model="isCompleted" />
      <span>{{ todo.name }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="handleDel">
      删除
    </button>
  </li>
</template>

<script>
export default {
  props: {
    todo: Object,
    updateTodo: Function,
    delTodo: Function,
  },
  data() {
    return {
      bgColor: "#fff",
      isShow: false,
    };
  },
  methods: {
    /* handleEnter() {
      // 显示当前元素背景色 #ccc 同时显示删除按钮
      this.bgColor = "#ccc";
      this.isShow = true;
    },
    handleLeave() {
      // 显示当前元素背景色 #fff 同时隐藏删除按钮
      this.bgColor = "#fff";
      this.isShow = false;
    }, */
    handleEnter(isEnter) {
      this.isShow = isEnter;
      this.bgColor = isEnter ? "#ccc" : "#fff";
    },
    handleDel() {
      // 所有删除操作都要给与一定的警告提示（防止用户误操作）
      if (window.confirm("你确认要删除当前todo数据吗?")) {
        this.delTodo(this.todo.id);
      }
    },
  },
  computed: {
    // 计算属性
    isCompleted: {
      get() {
        // 读取属性调用的方法
        return this.todo.completed;
      },
      set(val) {
        // 设置属性调用的方法
        // 调用父组件的方法更新数据
        this.updateTodo(this.todo.id, val);
      },
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>

<template>
  <div>
    <ul>
      <li v-for="item in messages" :key="item.id">
        <!-- 
          /home/message/detail/1?count=123
          /1 -> params参数
          ?count=123 -> query参数
          路由导航链接
         -->
        <!-- <router-link :to="`/home/message/detail/${item.id}?count=123`">
          {{ item.content }}
        </router-link> -->
        <router-link
          :to="{
            name: 'messageDetail',
            params: { id: item.id },
            query: { count: 123 },
          }"
        >
          {{ item.content }}
        </router-link>
        <button @click="push(item.id)">push</button>
        <button @click="replace(item.id)">replace</button>
      </li>
    </ul>
    <button @click="back">back</button>
    <!-- 显示当前路由组件 -->
    <router-view msg="123"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  created() {
    console.log("message created()");
    setTimeout(() => {
      const messages = [
        { id: 1, content: "messages001" },
        { id: 2, content: "messages002" },
        { id: 3, content: "messages003" },
        { id: 4, content: "messages004" },
      ];

      this.messages = messages;
    }, 1000);
  },
  methods: {
    push(id) {
      // console.log(this);
      // 添加一条浏览器历史记录（切换网址）
      // 编程式导航
      // this.$router.push(`/home/message/detail/${id}`);
      this.$router.push({
        // path: `/home/message/detail/${id}`,
        name: "messageDetail",
        params: { id },
        query: { count: 123 },
      });
    },
    replace(id) {
      // 替换一条浏览器历史记录
      this.$router.replace(`/home/message/detail/${id}`);
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style></style>

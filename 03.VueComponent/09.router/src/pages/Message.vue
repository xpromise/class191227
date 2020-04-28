<template>
  <div>
    <ul>
      <li v-for="item in messages" :key="item.id">
        <!-- <router-link :to="`/home/message/detail/${item.id}`"> -->
        <router-link :to="'/home/message/detail/' + item.id">
          {{ item.content }}
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
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
  beforeDestroy() {
    console.log("message beforeDestroy()");
  },
};
</script>

<style></style>

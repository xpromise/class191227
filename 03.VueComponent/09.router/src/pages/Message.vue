<template>
  <ul>
    <li v-for="item in messages" :key="item.id">
      {{ item.content }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  created() {
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
};
</script>

<style></style>

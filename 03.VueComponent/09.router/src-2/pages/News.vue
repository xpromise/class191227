<template>
  <ul>
    <li v-for="item in news" :key="item.id">
      {{ item.content }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      news: [],
    };
  },
  created() {
    console.log("news created()");

    setTimeout(() => {
      const news = [
        { id: 1, content: "news001" },
        { id: 2, content: "news002" },
        { id: 3, content: "news003" },
        { id: 4, content: "news004" },
      ];

      this.news = news;
    }, 1000);
  },
  beforeDestroy() {
    console.log("news beforeDestroy()");
  },
};
</script>

<style></style>

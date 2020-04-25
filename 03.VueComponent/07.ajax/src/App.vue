<template>
  <div>
    <h1 v-if="isLoading">loading...</h1>
    <h1 v-else>
      most star repo is <a :href="repo.url">{{ repo.name }}</a>
    </h1>
  </div>
</template>

<script>
// axios不是vue插件，必须引入使用
import axios from "axios";

export default {
  data() {
    return {
      isLoading: false,
      repo: {
        name: "",
        url: "",
      },
    };
  },
  created() {
    // 发送请求之前 切换isLoading
    this.isLoading = true; // 代表正在请求中

    // 发送ajax请求
    // vue-resource
    // const url = `https://api.github.com/search/repositories?q=v&sort=stars`;
    const url = `http://localhost:3000/search`;
    /* this.$http
      .get(url)
      .then((response) => {
        // console.log(response.data); // 响应数据
        const { name, url } = response.data.data[0];
        // 请求成功 切换isLoading为false
        this.repo = {
          name,
          url,
        };
        this.isLoading = false; // 代表请求结束了
      })
      .catch((error) => {
        console.log(error);
        // 请求成功 切换isLoading为false
        this.isLoading = false; // 代表请求结束了
      }); */

    axios
      .get(url)
      .then((response) => {
        const { name, url } = response.data.data[0];
        // 请求成功 切换isLoading为false
        this.repo = {
          name,
          url,
        };
        this.isLoading = false; // 代表请求结束了
      })
      .catch((error) => {
        console.log(error);
        // 请求成功 切换isLoading为false
        this.isLoading = false; // 代表请求结束了
      });
  },
};
</script>

<style></style>

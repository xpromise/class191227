<template>
  <!-- 必须有根标签 -->
  <div>
    <p v-if="isFirstView">请输入搜索内容</p>
    <p v-else-if="isLoading">Loading...</p>
    <div class="row" v-else-if="users">
      <div class="card" v-for="(user, index) in users" :key="index">
        <a :href="user.html_url" target="_blank">
          <img :src="user.avatar_url" style="width: 100px" />
        </a>
        <p class="card-text">{{ user.login }}</p>
      </div>
    </div>
    <p v-else>{{ errorMsg }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isFirstView: true, // 决定是否初始化显示
      isLoading: false, // 决定是否在请求中
      users: null, // 决定请求成功的数据
      errorMsg: "", // 决定请求失败的信息
    };
  },
  created() {
    // 绑定事件
    this.$bus.$on("search-name", this.reqUsersData);
  },
  methods: {
    async reqUsersData(searchName) {
      // 请求之前，切换data
      this.isFirstView = false;
      this.isLoading = true;

      /*
        请求失败怎么捕获async函数的错误？ 
        try{
          // 防止可能出错代码（异步代码）
        } catch(e) {
          // 一旦try里面出错了，后面代码（try出错代码的后面代码）就不会执行了
          // 会直接执行catch中代码
          // 处理try的异常
        }
      */

      try {
        // 发送请求
        const response = await axios.get(
          // `http://localhost:9527/api/search/users?q=${searchName}`
          `/api/search/users?q=${searchName}`
        );

        // 只想保留三个数据：login/html_url/avatar_url
        // 长度不变值变 --> map
        // 对数据进行处理
        const users = response.data.items.map((user) => {
          return {
            login: user.login,
            html_url: user.html_url,
            avatar_url: user.avatar_url,
          };
        });

        // 更新data
        this.users = users;
        this.isLoading = false;
      } catch (e) {
        console.log(e);

        // 更新data
        this.isLoading = false;
        this.errorMsg = "网络出现故障，请刷新试试~";
      }
    },
  },
};
</script>

<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>

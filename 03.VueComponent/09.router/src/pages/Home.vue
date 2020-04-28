<template>
  <div>
    <h1>Home组件</h1>
    <ul class="nav nav-tabs">
      <li>
        <router-link to="/home/news">News</router-link>
      </li>
      <li>
        <router-link to="/home/message">Message</router-link>
      </li>
    </ul>
    <!-- 显示当前路由组件 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style></style>

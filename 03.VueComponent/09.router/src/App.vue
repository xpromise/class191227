<template>
  <div>
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">
          <h2>Vue Router Demo</h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!-- 
            vueRouter 除了给实例对象添加属性，还添加了两个全局组件
              <router-link></router-link> 路由链接
                相当于a标签
                特点：不会发送请求，不会刷新页面，只会更新浏览器地址
                点击功能：
                  1. 改变浏览器地址
                  2. 给当前a标签添加一些类名：
                    .router-link-exact-active 
                    .router-link-active

              <router-view></router-view>
                显示当前路由组件
                当前路由组件是哪个？ 
                  路由配置中的path是否匹配上当前浏览器地址，
                  匹配上了，component就是当前路由组件
           -->
          <router-link class="list-group-item" to="/about">About</router-link>
          <router-link class="list-group-item" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <!-- 显示当前路由组件 -->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.router-link-active {
  color: red !important;
}
</style>

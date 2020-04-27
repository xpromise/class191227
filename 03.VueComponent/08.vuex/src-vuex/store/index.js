import Vue from "vue";
import Vuex from "vuex";

// 安装插件
Vue.use(Vuex);

/*
  用来集中式管理state数据的对象
*/
const state = {
  count: 0, // 管理App组件count数据
};

/*
  用来触发更新（间接更新）的方法对象
*/
const actions = {
  increment(context) {
    // 触发mutaion调用（传入标识名称）
    context.commit("INCREMENT");
  },
  // {commit} 对函数传入的第一个参数，进行结构赋值
  decrement({ commit }) {
    // 触发mutaion调用（传入标识名称）
    commit("DECREMENT");
  },
  incrementIfOdd({ commit, state }) {
    // 判断是否是奇数
    // state 之前state数据（未更新的state）
    if (state.count % 2 === 1) {
      commit("INCREMENT");
    }
  },
  incrementAsync({ commit }) {
    setTimeout(() => {
      commit("INCREMENT");
    }, 1000);
  },
};

/*
  用来直接更新state数据的方法对象
*/
const mutations = {
  INCREMENT(state) {
    state.count++;
  },
  DECREMENT() {
    state.count--;
  },
};

/*
  store就是管理vuex的对象
    有读取state数据的方法
    有触发更新的方法（acions/mutaions）
*/
const store = new Vuex.Store({
  state,
  actions,
  mutations,
});

export default store;

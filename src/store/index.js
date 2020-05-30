import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'; // 避免页面刷新之后，数据清空

Vue.use(Vuex)

export default new Vuex.Store({
  // 状态
  state: {
    submenu: {}
  },
  // 操作
  mutations: {
    SAVE_SUBMENU (state, submenu) {
      state.submenu = submenu
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    // vuex持久化插件
    createPersistedState({
      key: 'vuex',
      storage: window.localStorage,
    }),
  ]
})

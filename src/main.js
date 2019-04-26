// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  // 全局状态
  state: {
    player: {
      id: '',
      name: '',
      singer: '',
      album: '',
      filename: '',
      image: '',
      url: '',
      time: ''
    }
  },
  getters: {

  },
  mutations: {
  },
  actions: {

  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

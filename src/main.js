// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import 'common/stylus/index.styl'
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
const store = new Vuex.Store({
  // 全局状态
  state: {
    // 封面名称、图片
    coverList: {
      name: '',
      url: ''
    },
    // 播放界面歌曲名称、作者、id、
    player: {
      id: '',
      name: '',
      singer: '',
      image: '',
      time: '',
      sequenceList: [],
      playlist: []
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

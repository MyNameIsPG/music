import Vue from 'vue'
import Router from 'vue-router'

const player = () => import('components/player/player')
const playlist = () => import('components/playlist/playlist')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'player',
      component: player
    },
    {
      path: '/player',
      name: 'player',
      component: player
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: playlist
    }
  ]
})

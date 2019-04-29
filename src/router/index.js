import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('components/login/login')
const player = () => import('components/player/player')
const playlist = () => import('components/playlist/playlist')
const myusers = () => import('components/myusers/myusers')
const recommend = () => import('components/recommend/recommend')
const found = () => import('components/found/found')
const playlistDetail = () => import('components/playlist-detail/playlist-detail')
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/playlist/recommend' },
    { path: '/login', name: 'login', component: login },
    {
      path: '/playlist',
      name: 'playlist',
      component: playlist,
      children: [
        { path: '/playlist', redirect: '/playlist/recommend' },
        { path: '/playlist/myusers', name: 'myusers', component: myusers },
        { path: '/playlist/recommend',
          name: 'recommend',
          component: recommend,
          children: [
            { path: ':id', component: playlistDetail }
         ]},
        { path: '/playlist/found', name: 'found', component: found }
     ]},
    { path: '/player', name: 'player', component: player }
  ]
})

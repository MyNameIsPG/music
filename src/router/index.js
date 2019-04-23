import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('components/login/login')
const player = () => import('components/player/player')
const playlist = () => import('components/playlist/playlist')
const myusers = () => import('components/myusers/myusers')
const recommend = () => import('components/recommend/recommend')
const found = () => import('components/found/found')
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: 'login', component: login },
    {
      path: '/player',
      name: 'player',
      component: player,
      children: [
        { path: '/player', redirect: '/player/recommend' },
        { path: '/player/myusers', name: 'myusers', component: myusers },
        { path: '/player/recommend', name: 'recommend', component: recommend },
        { path: '/player/found', name: 'found', component: found }
     ]},
    { path: '/playlist', name: 'playlist', component: playlist }
  ]
})

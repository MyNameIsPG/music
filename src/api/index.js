import axiosTokenPost from 'common/js/axiosToken'
import axiosTokenGet from 'common/js/axiosTokenGet'
const path = 'http://localhost:3000'

// 手机登录
export function loginCellphone (params) {
  const url = path + '/login/cellphone'
  return new Promise((resolve, reject) => {
    axiosTokenGet.get(url, {params: params}).then(data => {
      resolve(data.data)
    })
  })
}

// 邮箱登录
export function login (params) {
  const url = path + '/login'
  return new Promise((resolve, reject) => {
    axiosTokenGet.get(url, {params: params}).then(data => {
      resolve(data.data)
    })
  })
}

// 刷新登录
export function loginRefresh () {
  const url = path + '/login/refresh'
  return new Promise((resolve, reject) => {
    axiosTokenGet.get(url).then(data => {
      resolve(data.data)
    })
  })
}

// 退出登录
export function logout () {
  const url = path + '/logout'
  return new Promise((resolve, reject) => {
    axiosTokenGet.get(url).then(data => {
      resolve(data.data)
    })
  })
}

// banner
export function banner () {
  const url = path + '/banner'
  return new Promise((resolve, reject) => {
    axiosTokenGet.get(url).then(data => {
      resolve(data.data)
    })
  })
}

// 获取每日推荐歌单
export function personalized () {
  const url = path + '/personalized'
  return new Promise((resolve, reject) => {
    axiosTokenGet.get(url).then(data => {
      resolve(data.data)
    })
  })
}

// 获取歌单详情 id
export function playlistDetail (params) {
  const url = path + '/playlist/detail'
  return new Promise((resolve, reject) => {
    axiosTokenGet.get(url, {params: params}).then(data => {
      resolve(data.data)
    })
  })
}

// 获取音乐 id
export function songUrl (params) {
  const url = path + '/song/url'
  return new Promise((resolve, reject) => {
    axiosTokenGet.get(url, {params: params}).then(data => {
      resolve(data.data)
    })
  })
}

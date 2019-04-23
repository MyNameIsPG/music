import axios from 'axios'
const path = 'http://localhost:3000'

// 手机登录
export function loginCellphone (params) {
  const url = path + '/login/cellphone'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 邮箱登录
export function login (params) {
  const url = path + '/login'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 刷新登录
export function loginRefresh () {
  const url = path + '/login/refresh'
  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  })
}

// 退出登录
export function logout () {
  const url = path + '/logout'
  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  })
}

// banner
export function banner () {
  const url = path + '/banner'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取每日推荐歌单
export function personalized () {
  const url = path + '/personalized'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

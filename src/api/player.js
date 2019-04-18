import axios from 'axios'

export function getPlaylist () {
  const url = 'https://music.163.com/weapi/v3/playlist/detail'
  const data = {
    params: 'upgE51fE2sTI2Xda5YaxbpqtWCBmcef1Z8Z7hJBQhCDTcpLoboKix8ag2qv3eeqYQBszO0BsubsHEHtnnoJCm+WhbRVjYnNfeRzQua8ae+3Z59bRDHrEl5ssavh4LZaIFrzJSt85eiw+7lzIEwg6aNN4DjlQss9UbrwSxhwojVxymwfG8IiouWgQAevqpJ/4oxRZy7A7zmlVGSf76FzxDykOxElT0pjsLeAo0b0W22c=',
    encSecKey: '69ac004c92be0cddc53495af0ae7efa2441765e7a69dda05408c00c53295996929d3f190f735874d430aee33b1752d4133aaa40c76cf7e837ecb8cd455f2f1537ae7014c9c74cbd302cdedd0ea31daf67ee1e165c364c39a75fc1b35491ea161a62c354a7129e9c667943c22ce10030773f9b6f87d156512d99baa9f38e57eeb',
    csrf_token: '182aa88112b28674d6d5cf153d28fd68'
  }
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    'Referer': 'https://music.163.com',
    'X-Real-IP': '118.88.88.88',
    'Cookie': '_ntes_nnid=e6b01b6fc3dbf05042d899f59160a804,1542001388105; _ntes_nuid=e6b01b6fc3dbf05042d899f59160a804; JSESSIONID-WYYY=fAz6fxI98N7kN2QrHZgJwnhGqVB6Ygz%5C4U5NwCDrgH2%2FCga%2FGmfhNr%2B3c7WzmRk%2Fy%5C%5C8mdF9Q4vqFvxK%2FY6M4cOQUfnYo7VsrzBY0MOTbSGxAJcpiYSxTCpGidR2rGo4MSquT%5CqD12BSrf3EHoY6gBmAuGzlHGBij2UfY3%2ByTJtYDmvt%3A1555555732576; _iuqxldmzr_=32; WM_NI=7P%2F1P4Y2XqsyYKhn%2BX0VBaDwMVTt9jccsVlNVp90MY5WofmWZfJZELKFAAtpSTa7fNwcanSvOIqIIWlhCDyS4J1vkTwvN5i99ko7XA1IbesnpOGe8Wj9C9F%2B6JAvVpMWVnM%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eeb7c64fb4bebfa9f565aa8e8ea3d84e868f8fabb83987eebcafcf54f8ec97b8cc2af0fea7c3b92af590e1d2d3409bee9892f2739b95a88faa54f48a8e82c77d8f8a9c95bc62a1bdbdb7ef4696b0f7d1d053f789a187f05d9aba86bbc848899a8fa2f77c918cafd8e546b5bdaf8fd27e8d97bfaacc5db0b88da5fc59f896ff97ea60b5aa82d6ec33fbb5a1d8db4bf397ae86f266b4918986bb5daae78ddac521f6968f97d57c8f899a8fd037e2a3; WM_TID=KYa%2F7oz%2BLdVBAUBVRRY4gZBKr6RwBKIw; P_INFO=m18588773304@163.com|1551680963|1|study|00&99|hun&1548402587&cloudmusic#hun&430100#10#0#0|185304&1||18588773304@163.com; NTES_SESS=u3gwXbcNxJMFyPtOaGY2td9DEKbFM804FwmIEXClCs1YsHBnse9N0vWQf4M8118VsSFnPUBqW7OVXAgPv8paLRAd.1VcndVJj4CvFLDjr4f6NRpQ.hbNFqoZ1.hYF.xcMhrQ3_m0pIolRYYiDV55lrICoL5kuzaZXOOXamZqN8g6X17gNNdBa5vHTdsZnxVITHPiGiJg74by8i7ubdNtRSWqi; S_INFO=1551680963|0|3&80##|m18588773304; playerid=11291172; MUSIC_U=80d0cee7d5becd1451eacd70d7aaa199d8bd495a42524c94ee4c5ae30cb0d4e99625857b82918f1874094d7288b41b73af9e62a8590fd08a; __remember_me=true; __csrf=b41bb20703d27394b373cdd5653cb88b'
  }
  return axios.post(url, {
    headers: headers,
    params: data
  }).then((res) => {
    return Promise.resolve(res)
  })
}

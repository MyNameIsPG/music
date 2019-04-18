import axios from 'axios'

export function getPlaylist () {
  const url = '/api/getDiscList'
  const data = {
    params: 'upgE51fE2sTI2Xda5YaxbpqtWCBmcef1Z8Z7hJBQhCDTcpLoboKix8ag2qv3eeqYQBszO0BsubsHEHtnnoJCm+WhbRVjYnNfeRzQua8ae+3Z59bRDHrEl5ssavh4LZaIFrzJSt85eiw+7lzIEwg6aNN4DjlQss9UbrwSxhwojVxymwfG8IiouWgQAevqpJ/4oxRZy7A7zmlVGSf76FzxDykOxElT0pjsLeAo0b0W22c=',
    encSecKey: '69ac004c92be0cddc53495af0ae7efa2441765e7a69dda05408c00c53295996929d3f190f735874d430aee33b1752d4133aaa40c76cf7e837ecb8cd455f2f1537ae7014c9c74cbd302cdedd0ea31daf67ee1e165c364c39a75fc1b35491ea161a62c354a7129e9c667943c22ce10030773f9b6f87d156512d99baa9f38e57eeb',
    csrf_token: '182aa88112b28674d6d5cf153d28fd68'
  }
  return axios.post(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res)
  })
}

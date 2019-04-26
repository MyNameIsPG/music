import * as axios from 'axios'

let options = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

export default axios.create(options)

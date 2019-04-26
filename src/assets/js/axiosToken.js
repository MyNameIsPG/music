import * as axios from 'axios'

let options = {
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
}

export default axios.create(options)

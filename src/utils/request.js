import axios from 'axios'
const instance = axios.create({
  baseURL: '/api'
  // timeout: 5000
})
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
instance.interceptors.response.use(
  (res) => {
    //看处理，需要啥返回啥
    return res.data
  },
  (err) => {
    //看看响应回来的内容以及状态码，是否需要做一些数据处理，最后return出去
    //err.response
    return Promise.reject(err)
  }
)
//导出封装好的axios
export default instance

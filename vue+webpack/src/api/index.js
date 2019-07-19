const axios = require('axios')
const apis = require('./config-api-vue')
// axios.defaults.baseURL = 'http://127.0.0.1:7001';
let api
// let headers = { 'Content-Type': 'application/json;charset=UTF-8' }
// axios.interceptors.request.use(function (config) {
//   config.headers['Content-Type'] = 'application/json;charset=UTF-8'
// })
axios.interceptors.response.use(
  res => {
    if (res.status >= 200 && res.status < 300) {
      return res
    }
    return Promise.reject(res)
  },
  err => {
    // 网络异常
    return Promise.reject(err)
  }
)
// urlKey
api = {
  /**
   * post 请求
   * @param {*vue实例} vm 
   * @param {*请求的数据参数  urlKey data} resData 
   * @param {*请求成功的回调函数} cb 
   */
  async post(urlName, data, cb, errCb) {
    let target = apis[urlName].url
    try {
      let result = await axios.post(target, data)
      if (result.data.retCode === 'success') {
        cb && cb(result.data)
      } else {
        errCb && errCb(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  },
  /**
   * 多请求并发
   * @param {*} resData 
   * @param {*} cb 
   */
  async postAll(resData, cb) {
    let reqList = []
    let resList = []
    resData.map(item => {
      reqList.push(axios.post(apis[item['urlKey']].url, item.data || {}))
    })

    let res = await Promise.all(reqList)
    res.map(item => {
      resList.push(item.data)
    })
    //  具体的判断 code 为哪种  才返回真正的函数
    cb && cb(resList)
  }
}
export default api

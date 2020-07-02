import axios from 'axios'
import qs from 'qs'
const axiosInstance = axios.create({
  baseURL: window.location.origin,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
    // 'Access-Control-Expose-Headers': 'Authorization'
  }
})
// axiosInstance.interceptors.request.use(function (config) {
//   alert.log(JSON.parse(config))
//   // 在发送请求之前做些什么
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });

axiosInstance.interceptors.response.use(
  response => {
    const { data } = response
    // Token过期
    // 做处理
    console.log('data', data)

    return response
  },
  error => {
    return Promise.reject(error) // 返回接口返回的错误信息
  })

export async function get (url, params = {}, options = {}) {
  const signParams = _addSign()
  params = _addCommonParams(params)
  _setAxiosHeader(signParams)

  try {
    const resp = await axiosInstance.get('/api' + url, { params })
    let data = resp.data
    return handleResponse({
      type: 'get',
      url,
      data
    })
  } catch (err) {
    err.message = '请稍后重试'

    return [false, err]
  }
}

export async function post (url, params = {}, options = {}) {
  const signParams = _addSign()
  params = _addCommonParams(params)
  _setAxiosHeader(signParams, url)
  url = '/api' + url
  try {
    const resp = await axiosInstance.post(url, qs.stringify(params))
    let data = resp.data
    return handleResponse({
      type: 'post',
      url,
      data
    })
  } catch (err) {
    err.message = '请稍后重试'

    return [false, err]
  }
}

function handleResponse ({ type, url, data }) {
  if (data.code === 1) {
    // console.log('request api post result:', url, data);
    return [true, data.data, data.message]
  } else if (data.code === code.EXPIRE) {
    // 退出登录到login

    return [false, data]
  } else {
    // Notification.error(data.message);
    return [false, data]
  }
}
function _replaceSingleParamInUrl (url, params) {
  let urlArr = url.split('/')
  urlArr[urlArr.length - 1] = Object.values(params)[0]
  url = urlArr.join('/')
  return url
}
// 添加公共参数
function _addCommonParams (params) {
  params = params || {}

  // return { ...params, device };
  return { ...params }
}

function _addSign () {
  const timestamp = Date.parse(new Date())
  const signParams = {}

  signParams['os_type'] = 1// isIOS ? 2 : (isAndroid ? 3 : 1);
  signParams['timestamp'] = timestamp
  signParams['version'] = '1.0'
  const urlStr = urlEncode(signParams).substr(1)

  return signParams
}

// 设置AXIOS头信息
function _setAxiosHeader (signParams, url) {
  let headers = {}
  // 如果登录了，就再头信息里添加id,token
  const axiosCommon = axios.defaults.headers.common || {}
  const { accessToken, uid } = { accessToken: '1224wewewe', uid: '11223' }
  signParams['appType'] = 0
  if (accessToken) {
    headers['Authorization'] = 'Bearer ' + accessToken
    signParams['token'] = accessToken
    signParams['uid'] = uid
  }
  headers['Accept-Language'] = 'zh-cn'

  axios.defaults.headers.common = { ...axiosCommon, ...headers, ...signParams }
}

async function _httpGet (url, params) {
  const resp = await axiosInstance.get(url, { params })
  let data = resp.data
  handleResponse(data)
}

async function _httpPut (url, params) {
  let resp = {}
  if (params.length === 1) {
    const _key = Object.Keys(params)[0]
    const re = new RegExp(_key, 'g')
    url = url.replace(re, params[_key])
    resp = await axiosInstance.put(url)
  } else {
    resp = await axiosInstance.put(url, { params })
  }
  let { data } = resp
  handleResponse(data)
}

function urlEncode (param, key, encode) {
  if (param == null) return ''
  var paramStr = ''
  var t = typeof (param)
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param)
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
      paramStr += urlEncode(param[i], k, encode)
    }
  }
  return paramStr
}

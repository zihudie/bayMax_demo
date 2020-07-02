import Mock from 'mockjs'
import api from '@/const/api'
import financeApi from './finnace'
// import financeApi from './finnace'

Mock.setup({
  timeout: '150-400'
})

const toMockUrl = (apiUrl) => {
  if (!apiUrl) return
  try {
    return new RegExp(apiUrl.replace(/\//gi, '\/'))
  } catch (e) {
    console.log(apiUrl)
    throw e
  }
}

/**
 * 全局Api
 */

// Mock.mock(toMockUrl(api.USER_CAPTCHA), 'post', userApi[api.USER_CAPTCHA])
// Mock.mock(toMockUrl(api.USER_REGISTER), 'post', userApi[api.USER_REGISTER]);

// Mock.mock(toMockUrl(api.GAME_BALANCE), 'post', financeApi[api.GAME_BALANCE])
// Mock.mock(toMockUrl(api.GAME_TRANSFER), 'post', financeApi[api.GAME_TRANSFER])

export default Mock

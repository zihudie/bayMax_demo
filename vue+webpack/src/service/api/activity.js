
import * as apiService from '@/service/api.js'
import { default as api } from '@/const/api'

const getGameList = async ({ isHot }) => {
  const [result, data] = await apiService.post(api.GAME_LIST, { isHot })
  return [result, data]
}
export {
  getGameList
}

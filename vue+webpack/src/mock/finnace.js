import { default as api } from '@/const/api'
// 钱包列表
let gameBalances = [
  {
    channelName: '中心钱包',
    channelId: 0,
    type: 0,
    balance: 100,
    amount: 100
  },
  {
    channelName: 'AG',
    channelId: 1,
    type: 1,
    balance: 100,
    amount: 100
  },
  {
    channelName: 'EBET',
    channelId: 2,
    type: 2,
    balance: 20,
    amount: 0
  },
  {
    channelName: 'PT',
    channelId: 4,
    type: 4,
    balance: 50,
    amount: 0
  },
  {
    channelName: '体育11',
    channelId: 7,
    type: 7,
    balance: 800,
    amount: 0
  }
]

export default {
  [api.GAME_LIST]: config => {
    console.log('config.body', config)
    const list = gameBalances
    return {
      data: list,
      code: 1
    }
  }
}

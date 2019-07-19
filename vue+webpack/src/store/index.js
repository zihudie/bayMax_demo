import Vuex from 'vuex'
import Vue from 'vue'
import getters from './getters'

export function createStore() {
  Vue.use(Vuex)
  return new Vuex.Store({
    state: {
      module1: 'module1',
      module2: 'module2'
    },
    getters,
    mutations: {
      increment(state, val) {
        state.module1 = `${state.module1}${val}`
      }
    },
    actions: {
      incrementAsync({
        commit,
        state
      }, val) {
        return new Promise((resolve) => {
          setTimeout(() => {
            commit('increment', val)
            resolve()
          }, 1000)
        })
      }
    }
  })
}

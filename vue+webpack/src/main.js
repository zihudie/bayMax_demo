// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/index.scss'
import {
  createStore
} from './store'
import apis from '@/api/index'

Vue.config.productionTip = false
let store = createStore()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

Vue.prototype.$post = function (...params) {
  apis.post(...params)
}
Vue.prototype.$postAll = function (...params) {
  apis.postAll(...params)
}

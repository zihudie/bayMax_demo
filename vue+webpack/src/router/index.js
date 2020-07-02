import Vue from 'vue'
import Router from 'vue-router'
import module1Router from './module1'

Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [
    ...module1Router,
    {
      path: '/',
      name: 'HelloWorld',
      component: resolve => require(['@/views/HelloWorld'], resolve)
    },
    {
      path: '/linkTest',
      name: 'linkTest',
      component: resolve => require(['@/views/linkTest'], resolve)
    },
    {
      path: '/list',
      name: 'list',
      component: resolve => require(['@/views/list'], resolve)
    },
    {
      path: '/server',
      name: 'helloServer',
      component: resolve => require(['@/views/firstServer'], resolve)
    },
    {
      path: '/study',
      name: 'study',
      component: resolve => require(['@/views/study/index'], resolve)
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('totototot.......', to)
  if (to.name === 'HelloWorld' && to.query.actId === '12345') {
    next({
      path: '/linkTest',
      query: {
        redirect: to.fullPath
      } // 将要跳转路由的path作为参数，传递到登录页面
    })
  } else {
    next()
  }
})
export default router

const moduleRouter = [{
    path: '/module1/test',
    name: 'test1',
    component: resolve => require(['@/views/module1/test1'], resolve)
  },
  {
    path: '/module1/test2',
    name: 'test2',
    component: resolve => require(['@/views/module1/test2'], resolve)
  }
]
module.exports = moduleRouter

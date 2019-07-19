'use strict';

module.exports = app => {
  app.router.get('/demo', app.controller.common.demo);
  app.router.get('/model1', app.controller.common.model1);
  app.router.get('/mvvm', app.controller.common.mvvm);
  app.router.get('/*', app.controller.common.demo);


};
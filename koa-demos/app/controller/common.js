'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async demo() {
    const ctx = this.ctx;
    await ctx.render('index.html', {
      title: 'demo'
    });
  }
  async model1() {
    const ctx = this.ctx;
    await ctx.render('vh.html', {
      title: 'model1'
    });
  }
  async mvvm() {
    const ctx = this.ctx;
    await ctx.render('mvvm.html', {
      title: 'mvvm'
    });
  }


}

module.exports = HomeController;
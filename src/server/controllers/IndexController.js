/**
 * 首页 IndexController
 */
const Index = require('../models/index');
const FormData = require('form-data');
const axios  = require('axios');
const qs = require('qs');
class IndexController {
  constructor(){}
  actionIndex(){
    return async (ctx, next) => {
      const index = new Index();
      const result = await index.getData();
      console.log(result.data.data)
      const data = result.data.data;
      const title = "图书管理";
      ctx.body = await ctx.render('index', {
        title,
        data
      })
    }
  }
  actionAdd(){
    return async (ctx, next) => {
      const title = '添加图书'
      ctx.body = await ctx.render('add', {
        title
      })
    }
  }
  actionAddPost(){
    return async (ctx, next) => {
      const data = ctx.request.body;
      // const params = new FormData();
      // params.append('Book[name]', 'aaa');
      // params.append('Book[author]', 'uuu');
      // const index = new Index();
      // const result = await index.saveData({
      //   params
      // });
      let result = await axios('http://localhost/basic/web/index.php?r=book/add',{
        data: qs.stringify(data),
      });
      console.log(result.data)
      ctx.body = result.data;
    }
  }
}
module.exports = IndexController;

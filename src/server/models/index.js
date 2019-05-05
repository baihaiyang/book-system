/**
 * @fileoverview 实现Index的数据模型
 * @author 13261909995@163.com
 */

const SafeRequest = require('../utils/SafeRequest');

/**
 * Index类 获取书籍数据
 * @class
 */
class Index {
  /**
   * @contructor
   * @param {string} app koa2的上下文
   */
  constructor(app){}
  /**
   * 获取后台全部图书数据的方法
   * @param {*} options 配置项
   * @example
   * return new Promise
   * getData(options)
   */
  getData(options){
    const safeRequest = new SafeRequest('book/index');
    return safeRequest.fetch({});
  }
  /**
   * 把用户传过来的数据保存进入接口
   * @param {*} options 配置项
   * @example
   * return new Promise
   * saveData(opitons)
   */
  saveData(options){
    const safeRequest = new SafeRequest('book/add');
    return safeRequest.fetch({
      method: 'POST',
      params: options.params
    })
  }
}

module.exports = Index;

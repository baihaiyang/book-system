// 为了将来把浏览器端的代码和后台的代码可以相互拷贝或者替换
const fetch = require('node-fetch');
const config = require('../config');
class SafeRequest {
  constructor(url){
    this.url = url;
    this.baseUrl = config.baseUrl;
  };
  fetch(options){
    // 产生一个完整的连接，发起一个promise的结果
    let ydfetch;
    if(options.method){
      ydfetch = fetch(this.baseUrl + this.url, {
        method: options.method,
        body: options.params
      });
    }else{
      ydfetch = fetch(this.baseUrl + this.url);
    }

    return new Promise((resolve, reject) => {
      let result = {
        code: 0,
        message: "",
        data: []
      }
      ydfetch
      .then(res => {
        let _json = {};
        try{
          _json = res.json();
        }catch(error){
          // 发邮件
        }
        return _json;
      }).then(json => {
        result.data = json;
        resolve(result);
      }).catch(err => {
        console.log(err)
        result.code = 1;
        result.message = "node-fetch和后端通讯出现一丝丝问题❌❌❌";
        reject(result);
      });
    })

  }
}
module.exports = SafeRequest;

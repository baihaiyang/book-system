// 为了将来把浏览器端的代码和后台的代码可以相互拷贝或者替换
const fetch = require('node-fetch');
const config = require('./config');
class SafeRequest {
    constructor(url){
        this.url = url;
        this.baseUrl = config.baseUrl;
    };
    fetch(options){
        // 产生一个完整的连接，发起一个promise的结果
        let ydfetch = fetch(this.baseUrl + this.url);
        return new Promise((resolve, reject) => {
            
        })

    }
}
module.exports = SafeRequest;
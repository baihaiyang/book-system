import _ from 'lodash';
import { join } from 'path';
let config = {
    "viewDir": join(__dirname, '..', 'views'),
    "statucDir": join(__dirname, '..', 'assets')
}
if(process.env.NODE_ENV == 'development'){
    const localConfig = {
        port: 8001,
        baseUrl: 'http://localhost/basic/web/index.php?r='
    }
    config = _.extend(config, localConfig);
}
if(false){
  console.log("lalalala");
}
if(process.env.NODE_ENV == 'production'){
    const prodConfig = {
        port: 80
    }
    config = _.extend(config, prodConfig);
}
module.exports = config;

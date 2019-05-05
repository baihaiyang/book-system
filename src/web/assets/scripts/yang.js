// 全局帮助的类库
function yang(){};
yang.version = '0.0.1';
yang.throttle = function(fn, wait){
  let timer;
  return function(...args){
    if(!timer){
      timer = setTimeout(() => timer = null, wait);
      fn.apply(this, args);
    }
  }
}

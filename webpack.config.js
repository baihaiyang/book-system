const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const merge = require('webpack-merge');
const glob = require('glob');

const files = glob.sync('./src/web/views/**/*.entry.js');
// console.log("🍎🍎🍎", files);
for(let item of files){
  if(/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js)$/g.test(item) == true){
    const entryKey = RegExp.$1;
    console.log("🍌🍌🍌", entryKey);
  }
}

let _entry = {};
let webpackConfig = {
  entry: _entry
}

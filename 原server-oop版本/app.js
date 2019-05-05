const Koa = require('koa');
const render = require('koa-swig');
const co = require('co');
const serve = require('koa-static');
const log4js = require('log4js');
const koaBody = require('koa-body');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config');
log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'logs/yang.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');


const app = new Koa();
// post body 处理
app.use(koaBody());
// 错误处理
errorHandler.error(app, logger);
app.use(serve(config.statucDir));

app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    // cache: 'memory', // 性能优化的一部分，渲染的内容存到内存里
    cache: false,
    ext: 'html',
    writeBody: false,
    varControls: ["[[" ,"]]"]
  }));
require('./controllers/index')(app);
app.listen(config.port, () => {
    console.log('服务启动成功🍺');
})

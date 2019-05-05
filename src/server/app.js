import Koa from 'koa';
import render from 'koa-swig';
import co from 'co';
import serve from 'koa-static';
import log4js from 'log4js';
import koaBody from 'koa-body';
import errorHandler from './middleware/errorHandler';
import config from './config';
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
    console.log('Server address: http://localhost:' + config.port);
})

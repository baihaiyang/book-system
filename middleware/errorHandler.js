const errorHandler = {
    error(app, logger){
        app.use(async (ctx, next) => {
            try{
                await next();
            }catch(err){
                // 电话  微信  邮件  报警。。。
                logger.error(err);
                ctx.status = 500;
                ctx.body = '😭哇偶网站出错了';
            }
        })
        app.use(async (ctx, next) => {
            await next();
            if(404 !== ctx.status){
                return;
            }
            // 很多项目即使出现了404请求 hander 200
            ctx.status = 404;
            ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="http://yoursite.com/yourPage.html" homePageName="回到我的主页"></script>';
        })
    }
}
module.exports = errorHandler;
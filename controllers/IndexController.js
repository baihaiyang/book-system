/**
 * 首页 IndexController
 */
class IndexController {
    constructor(){}
    actionIndex(){
        return async (ctx, next) => {
            // ctx.body = 'hello world';
            const title = "图书管理";
            ctx.body = await ctx.render('index', {
                title
            })
        }
    }
    actionAdd(){
        return async (ctx, next) => {
            ctx.body = await ctx.render('add')
        }
    }
}
module.exports = IndexController;
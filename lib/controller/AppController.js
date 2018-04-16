/**
 * Created by xufeng.yang on 2016/4/22.
 */
'use strict';
var BaseController = require("./BaseController");
var AppService = require("../service/AppService");
var Util = require("../utils/Util");
const send = require('koa-send');

class AppController extends BaseController {
    constructor(logger, router, uriPrefix) {
        super(logger);
        this.router = router;
        this.appService = new AppService(logger, uriPrefix);
        this.routerPrefix = "/";
        this.token = "";
        this.initRouter();
    }

    initRouter() {
        let that = this;

        //跳转到主页面
        this.router.get(this.routerPrefix, async(ctx, next) =>{
            await ctx.render("index")
        });

        this.router.get(this.routerPrefix+"download", async(ctx, next) =>{
            // let resBody = {"success": true, "description": "下载表单"};
            // try{
                let body = ctx.query;
                // 为了方便演示，这里直接下载index页面
                var fileName = 'docker_practice.pdf';
                ctx.attachment(fileName);
                await send(ctx, fileName, { root: __dirname + '../../../src/images' });

            // }catch (e){
            //     resBody.success = false;
            //     resBody.description = (typeof e == "string") ? e : e.message;
            // }
            // ctx.body = resBody
        });
    }
}

module.exports = AppController;
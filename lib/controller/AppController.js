/**
 * Created by xufeng.yang on 2016/4/22.
 */
'use strict';
var BaseController = require("./BaseController");
var AppService = require("../service/AppService");
var Util = require("../utils/Util");

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

    }
}

module.exports = AppController;
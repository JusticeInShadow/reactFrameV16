/**
 * Created by peng.xue on 2017/8/1.
 */
'use strict';
var NODE_ENV = process.env.NODE_ENV || "product";//默认开发目录

var config = require("./lib/config/Config.js")[NODE_ENV];

/**
 * KOA 主模块
 *
 * @type {Application}
 */
var koa = require('koa');

/**
 * 已经执行的KOA的模块入口
 */
var app = new koa();

/**
 * 静态服务器模块
 *
 * @type {serve}
 */
var staticServer = require('koa-static');

//路由
var router = require('koa-router')();

//获取post请求的参数
var bodyParse = require("koa-bodyparser");

//ejs模板引擎
var render = require('koa-ejs');

//nodejs 内置模块
var path = require('path');

//日志模块初始化
var Log = require("./lib/utils/Log");
var logger = new Log();

//HTML 片段缓存   重复的请求直接返回304，提升请求的性能
var conditional = require('koa-conditional-get');
var etag = require('koa-etag');

//数据查询缓存    session储存，提升请求的性能
var session = require("koa-session2");
var Store = require("./lib/store/Store");

//支持对请求的response进行压缩
var compress = require('koa-compress');

//“/”路由
var AppController = require("./lib/controller/AppController");
new AppController(logger, router, config.apiUrl);

let leiUtils = require("lei-utils");
leiUtils.bugfree();

for(let i in config){
    console.log(i + ":" + config[i])
}

render(app, {
    root: path.join(__dirname, config.tmplsPath),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
});

//https过滤
let httpsFilter = function () {
    return async (ctx,next) => {
        let url = ctx.req.url;//访问的url
        let isFetch = ctx.request.accept.headers.fetch;
        if (isFetch == 1) {
            await next()
        } else {
            let proto = ctx.req.headers["X-Forwarded-Proto"] || ctx.req.headers["x-forwarded-proto"];
            console.log("httpsFilter proto:" + proto);
            logger.info("httpsFilter proto:" + proto);
            if ((url == "/login" || url == "/app" || url == "/") && proto == "http") {
                ctx.response.redirect("https://passport.harmontronics.com" + url);
            } else {
                await next()
            }
        }
    }
};

//登录过滤
let loginFilter = function () {
    return async (ctx,next)=> {
        let url = ctx.req.url;//访问的url
        let isFetch = ctx.request.ctx.headers.fetch;
        let token = "";//默认token为空
        if (isFetch == 1) {//如果是ajax请求则忽略
            token = ctx.req.headers.token;
            if (undefined === token || null === token || "" === token) {
                ctx.body = {
                    "success": false,
                    "data": "error100000",
                    "description": "无效的token"
                }
            } else {
                await next();
            }
        } else if (url.indexOf("/css") > -1 || url.indexOf("/js") > -1 || url.indexOf("/images") > -1 || url.indexOf("/download") > -1 || url.indexOf("/purchasePDF") > -1) {//资源文件和login 不需要验证token
            await next();
        } else {
            token = ctx.cookies.get("token");
            logger.info("token:" + token);
            let flag = true;//已经登录了
            if (undefined === token || null === token || "" === token) {//还未登录
                flag = false;
            }
            if (!flag) {
                ctx.response.redirect(config.loginUrl);
            } else {
                await next();
            }
        }

    }
};

//跳转filter
let redirectFilter = function () {
    return async (ctx,next) => {
        let url = ctx.req.url;
        if (url.indexOf("/css") > -1 || url.indexOf("/js") > -1 || url.indexOf("/images") > -1) {
            await next();
            return;
        }
        let status = ctx.res.statusCode;//返回状态码
        let isFetch = ctx.request.ctx.headers.fetch;
        if (404 == status) {
            await ctx.render("404");
        } else if (500 == status && isFetch != 1) {
            //重定向到500页面
            await ctx.render("500");
        } else {
            await next();
        }
    }
};

//中间件排队
if (NODE_ENV == 'product') {
    app.use(httpsFilter());//正式环境启用http转https
}
app.use(loginFilter()).use(session({
    store:new Store()
})).use(compress({
    threshold: 2048       //要压缩的最小响应字节
})).use(bodyParse({
    jsonLimit:'10mb'
})).use(conditional()).use(etag()).use(staticServer(path.join(__dirname, config.staticPath)))
    .use(logger.logFilter())
    .use(router.allowedMethods())
    .use(router.routes())
    .use(redirectFilter());

var server = app.listen(config.serverPort);
console.log("服务已开启,端口：" + config.serverPort);
logger.info("服务已开启,端口：" + config.serverPort);

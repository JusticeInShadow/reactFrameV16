/**
 * Created by xufeng.yang on 2016/5/23.
 */
'use strict';
var log4js = require("log4js");
var Util = require("./Util");
class Log {
    constructor() {
        this.logger = null;
        this.dateStr = Util.getCurrentDateStr();
        this.configure = {
            "appenders": [
                {
                    "type": "file",
                    "filename": Util.getLogsPath() + "log_" + this.dateStr + ".log",
                    "category": "dateFileLog"
                }
            ]
        };
        this.levelMap = new Map([[0, true], [1, true], [2, true], [3, true], [4, true], [5, true]]);//默认全部输出 0trace 1debug 2info 3warn 4errr 5fatal
        this.DEFAULT_FORMAT = ':remote-addr - -' +
            ' ":method :url HTTP/:http-version"' +
            ' :status :content-length ":referrer"' +
            ' ":user-agent"';
        this.init();

    }

    init() {
        log4js.configure(this.configure);
        this.logger = log4js.getLogger('dateFileLog');
    }

    /**
     * 设置level
     * @param level
     */
    setLevel(level) {
        let that = this;
        if (!Util.isNumber(level)) {
            return;
        }
        if (!that.levelMap.has(level)) {
            return;
        }

        for (let key of that.levelMap.keys()) {
            console.log(key);
            if (key < level) {
                that.levelMap.set(key, false);
            } else {
                that.levelMap.set(key, true);
            }
        }
    }

    /**
     * 判断是否需要重命名文件日期
     */
    filterLog() {
        let currentDateStr = Util.getCurrentDateStr();
        if (this.dateStr !== currentDateStr) {
            this.dateStr = currentDateStr;
            this.configure = {
                "appenders": [
                    {
                        "type": "file",
                        "filename": Util.getLogsPath() + "log_" + this.dateStr + ".log",
                        "category": "dateFileLog"
                    }
                ]
            };
            log4js.configure(this.configure);
            this.logger = log4js.getLogger('dateFileLog');
        }

    }

    trace(msg) {
        if (!this.levelMap.get(0)) {
            return false;
        }
        this.filterLog();
        this.logger.trace(msg);
    }

    debug(msg) {
        if (!this.levelMap.get(1)) {
            return false;
        }
        this.filterLog();
        this.logger.debug(msg);
    }

    info(msg) {
        if (!this.levelMap.get(2)) {
            return false;
        }
        this.filterLog();
        this.logger.info(msg);
    }

    warn(msg) {
        if (!this.levelMap.get(3)) {
            return false;
        }
        this.filterLog();
        this.logger.warn(msg);
    }

    error(msg) {
        if (!this.levelMap.get(4)) {
            return false;
        }
        this.filterLog();
        this.logger.error(msg);
    }

    /**
     * 致命错误
     * @param msg
     * @returns {boolean}
     */
    fatal(msg) {
        if (!this.levelMap.get(5)) {
            return false;
        }
        this.filterLog();
        this.logger.fatal(msg);
    }

    /**
     * 请求日志添加
     * @param req
     * @param res
     * @param next
     */
    logFilter() {
        let that = this;
        return async (ctx,next)=> {
            that.info(that.format(that.DEFAULT_FORMAT, ctx.req, ctx.res));
            await next();
        }
    }

    /**
     * 日志格式转换
     * @param str
     * @param req
     * @param res
     * @returns {XML|string}0
     */
    format(str, req, res) {
        return str
            .replace(':url', req.originalUrl)
            .replace(':method', req.method)
            .replace(':status', res.__statusCode || res.statusCode)
            .replace(':response-time', res.responseTime)
            .replace(':date', new Date().toUTCString())
            .replace(':referrer', req.headers.referer || req.headers.referrer || '')
            .replace(':http-version', req.httpVersionMajor + '.' + req.httpVersionMinor)
            .replace(
                ':remote-addr',
                req.socket &&
                (req.socket.remoteAddress || (req.socket.socket && req.socket.socket.remoteAddress))
            )
            .replace(':user-agent', req.headers['user-agent'] || '')
            .replace(
                ':content-length',
                (res._headers && res._headers['content-length']) ||
                (res.__headers && res.__headers['Content-Length']) ||
                '-'
            )
            .replace(/:req\[([^\]]+)\]/g, function (_, field) {
                return req.headers[field.toLowerCase()];
            })
            .replace(/:res\[([^\]]+)\]/g, function (_, field) {
                return res._headers ?
                    (res._headers[field.toLowerCase()] || res.__headers[field])
                    : (res.__headers && res.__headers[field]);
            });
    }

}
module.exports = Log;
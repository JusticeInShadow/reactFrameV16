/**
 * Created by xufeng.yang on 2016/4/27.
 */
'use strict';
var querystring = require("querystring");
var util = require("util");
var moment = require("moment");
var uuid = require("uuid");
var path = require("path");
var fs = require("fs");
module.exports = class Util {
    /**
     * 获取get请求参数
     * @param queryString
     * @returns {null}
     */
    static parseGetParam(queryString) {
        if (util.isNullOrUndefined(queryString) || "" === queryString) {
            return null;
        } else {
            return querystring.parse(queryString);
        }
    }

    /**
     * 是否是日期
     * @param d
     * @returns {*}
     */
    static isDate(d) {
        return util.isDate(d);
    }

    /**
     * 日期时间格式转换 YYYY-MM-DD hh:mm:ss
     * @param d
     * @returns {string}
     */
    static formatDate(d) {
        if (this.isDate(d)) {
            return moment(d).format("YYYY-MM-DD hh:mm:ss");
        } else {
            return "";
        }
    }

    /**
     * 获取当前日志的 字符串格式 YYYY-MM-DD
     */
    static getCurrentDateStr() {
        return moment(new Date()).format("YYYY-MM-DD");
    }

    /**
     * null 或者 undefined
     * @param obj
     * @returns {*}
     */
    static isNullOrUndefined(obj) {
        return util.isNullOrUndefined(obj);
    }

    /**
     * 是否为null undefined ""
     * @param str
     * @returns {boolean}
     */
    static isNotBlank(str) {
        if (!this.isNullOrUndefined(str) && "" !== str) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 是否是数组
     * @param arr
     */
    static isArray(arr) {
        return util.isArray(arr);
    }

    /**
     * 是否为null
     * @param obj
     * @returns {*}
     */
    static isNull(obj) {
        return util.isNull(obj);
    }

    /**
     * 获取随机数
     * @returns {*}
     */
    static getUUIDByV1() {
        return uuid.v1()
    }

    /**
     * 获取文件扩展名
     * @param str
     * @returns {Array|{index: number, input: string}}
     */
    static getFileExt(str) {
        var r = /\.[^\.]+$/.exec(str);
        if (this.isArray(r) && r.length > 0) {
            return r[0].substring(r[0].indexOf(".") + 1, r[0].length);
        } else {
            return "";
        }
    }

    /**
     * 获取文件上传路径
     * @returns {*}
     */
    static getUploadPath() {
        let filePath = __dirname.split("lib")[0] + "/develop/images/avatars/";
        console.log("uploadPath:" + filePath);
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }
        return filePath;
    }

    /**
     * 是否是数字
     * @param d
     * @returns {*}
     */
    static isNumber(d) {
        return util.isNumber(d);
    }

    /**
     * 获取日志目录
     * @returns {*}
     */
    static getLogsPath() {
        let filePath = __dirname.split("lib")[0] + "/logs/";
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }
        return filePath;
    }

    /**
     * 获取分隔符前半段
     * @param str
     * @param splitStr
     * @returns {*}
     */
    static getBeforeStrWidthLastIndexOfSplit(str, splitStr) {
        let indexOf = str.lastIndexOf(splitStr);
        if (indexOf < 0) {
            return str;
        }
        return str.substring(0, str.indexOf(splitStr));
    }

    /**
     * 获取分隔符后半段
     * @param str
     * @param splitStr
     * @returns {*}
     */
    static getAfterStrWidthLastIndexOfSplit(str, splitStr) {
        let indexOf = str.indexOf(splitStr);
        if (indexOf < 0) {
            return str;
        }
        return str.substring(str.indexOf(splitStr), str.length + 1);
    }

    /**
     *返回统一解析
     * @param data
     * @returns {*}
     */
    static parseServerAjaxData(res) {
        if (res.statusCode === 200) {
            let data = res.body;
            if (data.response == 'success') {//成功
                return data.result;
            } else {
                throw data.response + " " + data.message;
            }
        } else {
            throw res.statusCode;
        }
    }

    /**
     * 验证是否是字符串
     * @param name
     * @param str
     * @returns {error || null}
     */
    static validString(name,str){
        let flag = util.isString(str);
        if(!flag){
            throw new Error(name+"="+str+",it's incorrect,please check it!")
        }
    }

    /**
     * 验证是否是对象
     * @param name
     * @param str
     * @returns {error || null}
     */
    static validObject(name,str){
        let flag = util.isObject(str);
        if(!flag){
            throw new Error(name+"="+str+",it's incorrect,please check it!")
        }
    }

    /**
     * 验证是否是数组
     * @param name
     * @param str
     * @returns {error || null}
     */
    static validArray(name,str){
        let flag = util.isArray(str);
        if(!flag){
            throw new Error(name+"="+str+",it's incorrect,please check it!")
        }
    }

    /**
     * 验证是否是数字
     * @param name
     * @param str
     * @returns {error || null}
     */
    static validNumber(name,str){
        let flag = util.isNumber(str);
        if(!flag){
            throw new Error(name+"="+str+",it's incorrect,please check it!")
        }
    }
};


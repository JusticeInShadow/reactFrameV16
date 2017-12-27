/**
 * Created by Xufeng.Yang on 2016/9/30.
 */
'use strict';
let Util = require("./Util");
let rp = require("request-promise");
let Log = require("./Log");
let logger = new Log();

class HttpClientUtil {
    /**
     *post form请求
     * @param url
     * @param params
     * @returns {*}
     */
    static postBodyJSON(url, params, token, locale) {
        let that = this;
        return new Promise((resolve,reject) => {
            let headers = {
                'terminal': 'web',
                'locale': locale || 'zh_CN',
                'content-type': "application/json",
                'accept': 'application/json'
            };
            if (Util.isNotBlank(token)) {
                headers["token"] = token;
            }
            let options = {
                uri: url,
                method: "POST",
                headers: headers,
                body: JSON.stringify(params)
            };
            logger.info("postBodyJSON url:" + url + " token:" + token + " params:" + JSON.stringify(options) + " locale:" + locale);
            rp(options).then(function (res) {
                let body =JSON.parse(res);
                if(body.success == "1"){
                    resolve(body.data)
                }else {
                    reject(body.errorMessage)
                }
            }).catch(function (err) {
                reject (err)
            });
        });
    }


    /**
     *post form请求
     * @param url
     * @param params
     * @returns {*}
     */
    static postFormJSON(url, params, token, locale) {
        let that = this;
        return new Promise((resolve,reject) => {
            let headers = {
                'terminal': 'web',
                'locale': locale || 'zh_CN',
                'content-type': "application/json"
            };
            if (Util.isNotBlank(token)) {
                headers["token"] = token;
            }
            var options = {
                uri: url,
                method: "POST",
                headers: headers,
                form: params
            };
            logger.info("postFormJSON url:" + url + " token:" + token + " params:" + JSON.stringify(options) + " locale:" + locale);
            rp(options).then(function (res) {
                let body =JSON.parse(res);
                if(body.success == "1"){
                    resolve(body.data)
                }else {
                    reject(body.errorMessage)
                }
            }).catch(function (err) {
                reject (err)
            });
        });
    }

    /**
     *put form请求
     * @param url
     * @param params
     * @returns {*}
     */
    static putFormJSON(url, params, token, locale) {
        let that = this;
        return new Promise((resolve,reject) => {
            let headers = {
                'terminal': 'web',
                'locale': locale || 'zh_CN',
                'content-type': "application/json"
            };
            if (Util.isNotBlank(token)) {
                headers["token"] = token;
            }
            var options = {
                uri: url,
                method: "PUT",
                headers: headers,
                form: params
            };
            logger.info("putFormJSON url:" + url + " token:" + token + " params:" + JSON.stringify(options) + " locale:" + locale);
            rp(options).then(function (res) {
                let body =JSON.parse(res);
                if(body.success == "1"){
                    resolve(body.data)
                }else {
                    reject(body.errorMessage)
                }
            }).catch(function (err) {
                reject (err)
            });
        });
    }


    /**
     *delete form请求
     * @param url
     * @param params
     * @returns {*}
     */
    static deleteFormJSON(url, params, token, locale) {
        let that = this;
        return new Promise((resolve,reject) => {
            let headers = {
                'terminal': 'web',
                'locale': locale || 'zh_CN',
                'content-type': "application/json"
            };
            if (Util.isNotBlank(token)) {
                headers["token"] = token;
            }
            var options = {
                uri: url,
                method: "DELETE",
                headers: headers,
                form: params
            };
            logger.info("deleteFormJSON url:" + url + " token:" + token + " params:" + JSON.stringify(options) + " locale:" + locale);
            rp(options).then(function (res) {
                let body =JSON.parse(res);
                if(body.success == "1"){
                    resolve(body.data)
                }else {
                    reject(body.errorMessage)
                }
            }).catch(function (err) {
                reject (err)
            });
        });
    }

    /**
     *get form请求
     * @param url
     * @param params
     * @param token
     * @returns {*}
     */
    static getFormJSON(url, token, locale) {
        let that = this;
        return new Promise((resolve,reject) => {
            let headers = {
                'terminal': 'web',
                'content-type': "application/json",
                'locale': locale || 'zh_CN'
            };
            if (Util.isNotBlank(token)) {
                headers["token"] = token;
            }
            var options = {
                uri: url,
                method: "GET",
                headers: headers
            };
            logger.info("grtFormJSON url:" + url + " token:" + token + " params:" + JSON.stringify(options) + " locale:" + locale);
            rp(options).then(function (res) {
                let body =JSON.parse(res);
                if(body.success == "1"){
                    resolve(body.data)
                }else {
                    logger.error(body.errorMessage);
                    reject(body.errorMessage)
                }
            }).catch(function (err) {
                logger.error(err.message);
                reject (err)
            });
        });
    }

    /**
     *返回统一解析
     * @param data
     * @returns {*}
     */
    static parseServerAjaxData(res) {
        console.log(res);
        if (res.statusCode === 200 || res.statusCode === 500 || res.statusCode === 401 || res.statusCode === 400) {
            let data = JSON.parse(res.body);
            if (data.success == '1') {//成功
                return data.data;
            } else {
                if (data.errorCode == '100000') {//如果是token失效 --特定的description
                    throw "error" + data.errorCode;
                } else {
                    throw data.errorMessage;
                }
            }
        } else {
            throw res.statusCode;
        }
    }

    /**
     * 获取get请求
     * @param param
     * @returns {string}
     */
    static getGetUrl(url, param) {
        if (url.indexOf("?") > -1) {
            return url + "&" + param;
        } else {
            return url + "?" + param;
        }
    }

}
module.exports = HttpClientUtil;
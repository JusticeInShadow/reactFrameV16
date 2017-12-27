/**
 * ra service接口调用
 * Created by xufeng.yang on 2016/5/17.
 */
'use strict';
var BaseService = require("./BaseService");
var Util = require("../utils/Util");
var HttpClientUtil = require("../utils/HttpClientUtil");

class AppService extends BaseService {
    constructor(logger, uriPrefix) {
        super(logger);
        this.uriPrefix = uriPrefix;
    }

    /**
     * 获取用户信息
     * @param token
     * @returns {*}
     */
    getCurrentUserByToken(token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/user/";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //公共数据-- 获取所有可选币别
    getCurrency(token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/inquiry-price/get-all-currencies";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //公共数据-- 获取所有可选发运至
    getFyz(token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/inquiry-price/get-all-shippingAddr";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //公共数据-- 获取所有可选供应商
    getAllSupplier(token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/provider/get-code-nameEmailTaxPayConPayDays";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //公共数据-- 获取所有可选付款条件
    getAllFktj(token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/inquiry-price/get-all-payConditions";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //公共数据-- 获取所有可选表头账期   --暂时还没用到
    getAllPayDays(token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/inquiry-price/get-all-payDays";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //公共数据-- 获取所有币别
    getAllCrcd(token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/inquiry-price/get-all-currencies";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    /**
     * 获取侧边栏各个栏目统计数字
     * @param workcode
     * @param token
     * @returns {*}
     */
    getSiderTotal(work_code,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/pending/total?work_code="+work_code;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    /**
     * 保存未处理申请需求的column
     * @param workcode
     * @param type
     * @param token
     * @returns {*}
     */
    saveColumns(workcode,type,customJson,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/table-custom/kv/save";
            let params = {
                workcode:workcode,
                type:type,
                customJson:customJson
            };
            resolve(HttpClientUtil.postBodyJSON(url,params, token));
        });
    }

    /**
     * 获取未处理申请需求的column
     * @param workcode
     * @param type
     * @param token
     * @returns {*}
     */
    getColumns(workcode,type,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/table-custom/kv/get?workcode="+workcode+"&type="+type;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    /**
     * 获取未处理申请需求的表格参数
     * @param token
     * @returns {*}
     */
    getParams(token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/display-rule/";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    /**
     * 获取未处理申请需求的表格参数
     * @param workcode
     * @param branchCode
     * @param orderType
     * @param materielType
     * @param token
     * @returns {*}
     */
    getParamsSummy(workcode,branchCode,orderType,materielType,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/request-order/total?work_code="+workcode+"&branch_code="+branchCode+"&order_type="+orderType+"&materiel_type="+materielType;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    /**
     * 获取未处理申请单需求的数据
     * @param workcode
     * @param branchCode
     * @param orderType
     * @param materielType
     * @param urgency
     * @param token
     * @returns {*}
     */
    getRequestOrders(workcode,branchCode,orderType,materielType,urgency,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/request-order/get-request-orders?work_code="+workcode+"&branch_code="+branchCode+"&order_type="+orderType+"&material_type="+materielType+"&urgency="+urgency;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }


    //获取表格扩展行数据，定价估价
    getExpandRowsData(request_orders,token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/material/get-fix-estimate-price";
            resolve(HttpClientUtil.postBodyJSON(url,request_orders, token));
        });
    }


    //询价-- 点击询价时检查申请单是否被锁
    checkLock(work_code,request_orders,token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/lock/check";
            resolve(HttpClientUtil.postBodyJSON(url,request_orders, token));
        });
    }

    //询价-- 解锁申请单
    release(request_orders,token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/lock/release";
            resolve(HttpClientUtil.postBodyJSON(url,request_orders, token));
        });
    }


    //询价-- 发送询价第一步：获取询价单号
    getInquiryNo(company_code, gs, token){
        let that = this;
        console.log("1111"+gs+typeof(gs));
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/jde/num/inquiry?company_code="+company_code+"&gs="+ gs;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //询价-- 发送询价第二步
    sendInquiry(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/inquiry-order/save";
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }



    //采购-- 采购第一步：获取采购单号
    getPurchaseNo(company_code, gs, token){
        let that = this;
        console.log("1111"+gs+typeof(gs));
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/jde/num/purchase?company_code="+company_code+"&gs="+ gs;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }


    //采购-- 采购第二步
    sendPurchase(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/purchase-order/save";
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    /**
     * 获取询价处理的表格参数
     * @param workcode
     * @param branchCode
     * @param orderType
     * @param materielType
     * @param token
     * @returns {*}
     */
    getInquiryParamsSummy(workcode,branchCode,orderType,materielType,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/inquiry-order/inquiry-total?work_code="+workcode+"&branch_code="+branchCode+"&order_type="+orderType+"&materiel_type="+materielType;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    /**
     * 获取询价处理的数据
     * @param workcode
     * @param branchCode
     * @param orderType
     * @param materielType
     * @param urgency
     * @param token
     * @returns {*}
     */
    getInquiryRequestOrders(workcode,branchCode,orderType,materielType,urgency,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/inquiry-order/get-inquiry-orders?work_code="+workcode+"&branch_code="+branchCode+"&order_type="+orderType+"&material_type="+materielType+"&urgency="+urgency;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    /**
     * 移库
     * @param params
     * @param token
     * @returns {*}
     */
    transfer(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/move/transfer";
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    /**
     * 获取图纸下载的任务id
     * @param token
     * @returns {*}
     */
    getDownloadID(token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/plm-download/getTaskId";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    /**
     * 根据任务id获取任务进度
     * @param task_id
     * @param token
     * @returns {*}
     */
    getDownloadStatus(task_id,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/plm-download/getTaskStatus?task_id="+task_id;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    /**
     * 获取移库详情信息
     * @param order_number
     * @param order_type
     * @param order_company
     * @param order_line
     * @param token
     * @returns {*}
     */
    getTransferData(order_number,order_type,order_company,order_line,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/move/get-movement-info?order_number="+order_number+"&order_type="+order_type+"&order_company="+order_company+"&order_line="+order_line;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }


    /**
     * 取消移库
     * @param token
     * @returns {*}
     */
    cancelTransfer(params,token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/move/cancel--moveLib";
            resolve(HttpClientUtil.postBodyJSON(url,params, token));
        });
    }

    /**
     * 获取询价详情信息
     * @param dh
     * @param djlx
     * @param gs
     * @param token
     * @returns {*}
     */
    getInquiryDetailsData(dh,djlx,gs,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/inquiry-order/inquiry-info?dh="+dh+"&djlx="+djlx+"&gs="+gs;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    /**
     * 获取未处理申请需求的表格参数
     * @param token
     * @returns {*}
     */
    cancelInquiry(params,token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/inquiry-order/cancel";
            resolve(HttpClientUtil.postBodyJSON(url,params, token));
        });
    }

    /**
     * 获取更多定价信息
     * @param material_number
     * @param currency_code
     * @param token
     * @returns {*}
     */
    getMoreFixedPrice(material_number,currency_code,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/material/get-fix-price-byCode?material_number="+material_number+"&currency_code="+currency_code;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }



    //报价信息查询 --请求头部各条件合计数
    getQuoteSum(workcode,branchCode,orderType,materielType,urgency,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/inquiry-order/quotation-total?work_code="+workcode+"&branch_code="+branchCode+"&order_type="+orderType+"&materiel_type="+materielType+"&urgency="+urgency;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //报价信息查询 --请求表格数据
    getQuoteTableData(workcode,branchCode,orderType,materielType,urgency,status,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/inquiry-order/quotations?work_code="+workcode+"&branch_code="+branchCode+"&order_type="+orderType+"&material_type="+materielType+"&urgency="+urgency+"&bidding="+status;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    /**
     * 获取未处理申请需求的表格参数
     * @param token
     * @returns {*}
     */
    sendQuoteEmails(params,token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/excel/inquiry-excel";
            resolve(HttpClientUtil.postBodyJSON(url,params, token));
        });
    }

    /**
     * 获取未处理申请需求的表格参数
     * @param token
     * @returns {*}
     */
    getPurchaseParams(token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/display-rule/purchase";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    /**
     * 待提交采购单 --请求头部各条件合计数
     * @param workcode
     * @param branchCode
     * @param orderType
     * @param materielType
     * @param stateType
     * @param hdType
     * @param token
     * @returns {*}
     */
    getSubmittingPurchaseParamsSummy(workcode,branchCode,orderType,materielType,stateType,hdType,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let params = {
                work_code:workcode,
                branch_code:branchCode,
                order_type:orderType,
                materiel_type:materielType,
                state_type:stateType,
                hd_type:hdType
            };
            let url = that.uriPrefix + "/api/purchase-order/pay-total";
            resolve(HttpClientUtil.postFormJSON(url,params,token));
        });
    }

    //待提交采购单 --请求表格数据
    getSubmittingPurchaseRequestOrders(body,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/purchase-order/pay-search";
            resolve(HttpClientUtil.postBodyJSON(url,body, token));
        });
    }

    /**
     * 获取采购单PDF的数据
     * @param token
     * @param orderNum
     * @param orderType
     * @param orderCompany
     * @param providerCode
     * @returns {*}
     */
    getPurchaseOrderDetails(orderNum,orderType,orderCompany,providerCode,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/purchase-order/get-print-info?orderNum="+orderNum+"&orderType="+orderType+"&orderCompany="+orderCompany+"&providerCode="+providerCode;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    /**
     * 采购单记录页面的数据
     * @param token
     * @returns {*}
     */
    getPurchaseRecord(order_no,company,order_type,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/user-action-log/get?order_no="+order_no+"&company="+company+"&order_type="+order_type;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //待提交采购单：批量提交审核(采购执行这边要传参tag=1,采购审核不用)
    batchAudit(searchPOList,tag, workCode, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/auditRecord/accept?workCode="+workCode+"&tag="+tag;
            resolve(HttpClientUtil.postBodyJSON(url, searchPOList,token));
        });
    }

    //已完成采购单：检查是否可以退换货
    checkChangeOrBack(params,token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/purchase-order/checkChangeOrBack";
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    //采购单详情弹窗 --请求初始化数据
    getPdDetailsInfo(dh,djlx,gs,token){
        let that = this;
        return new Promise((resolve,reject) =>{
            let url = that.uriPrefix + "/api/purchase-order/purchase-info?dh="+dh+"&djlx="+djlx+"&gs="+gs;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }


    //采购单详情弹窗 --保存按钮
    pdSaveDetail(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/purchase-order/update";
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    //采购单详情弹窗 --发送按钮
    pdSendDetail(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/pdf/send";
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    //采购单 --批量确认按钮
    groupConfirm(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/purchase-order/confirm";
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    //采购单详情弹窗 --返回初始化
    pdGoBack(params, token){
        let that = this;
        return new Promise((resolve,reject) =>{
            let url = that.uriPrefix + "/api/purchase-order/back-init?dh="+params.dh+"&djlx="+params.djlx+"&gs="+params.gs;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    /**
     * 获取锁单数据
     * @param token
     * @returns {*}
     */
    getReleaseOrders(token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/lock/get";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }


    //管理员配置页 --检查用户是否是管理员
    checkAdmin(appFlag, workcode,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/passport-user/isAdmin?app_flag="+appFlag+"&work_code="+workcode;
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //管理员配置页 --请求所有配置项数据
    getAllUdc(token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/udc/udc-all";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //全部单据页 --获取参数接口
    getAllOrdersParams(token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/order/rule";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //全部单据页 --请求表格数据
    getAllOrders(body,token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/order/search";
            resolve(HttpClientUtil.postBodyJSON(url,body, token));
        });
    }



    //管理员配置页 --请求所有人员数据
    getAllUsers(token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/passport-user/users";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //管理员配置页 --请求表格数据
    getAdminDeployData(token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/display-rule/get";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

    //管理员配置页 --根据工号查询用户配置项
    getUserUdc(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/display-rule/get-by-workCode";
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }


    //管理员配置页 --根据工号删除选中人员的配置信息
    deleteByWorkcode(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/display-rule/delete";
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

    //管理员配置页 --保存新增或修改
    adminSaveEdit(params, token){
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/display-rule/add-edit";
            resolve(HttpClientUtil.postBodyJSON(url, params, token));
        });
    }

}
module.exports = AppService;
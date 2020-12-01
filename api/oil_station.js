import request from '@/common/requests.js'
import Vue from 'vue'
//MD5加密
import { addSecret } from '@/common/secret.js'
// 公用前缀
var prx = 'v1_1_1/'
 

/**
 * 获取油站详情
 * @param {stjid} 油站会员号
 * @return {function}
 */
export function getOilStationDetail(stjid) {
 
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'npoil/getoildetails',
		type: 0,
		data: {'stjid':stjid},
		auth: true
	})

	
}

/**
 * app扫码校验
 * 自营油站加油员扫码校验二维码、司机信息、加油站信息是否合法
 * @param {Object} param
 */
export function oilticketValidateorder(qRcode) {
 
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'oilticket/validateorder',
		type: 0,
		data: {'qRcode':qRcode},
		auth: true
	})
}

/**
 * 获取首页数据
 * @param {Object} param
 * @return {function}
 */
export function getIndexData(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'/oilticket/querystatisticstodayearnings',
		type: 0,
		data: param,
		auth: true
	})
}
/**
 * 获取油站数据
 * @param {Object} param
 * @return {function}
 */
export function getgridData(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'/oilticket/queryoperatingstatistics',
		type: 0,
		data: param,
		auth: true
	})
}


/**
 * 换班
 * @param {Object} param
 * @return {function}
 */
export function getshiftsbutton(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'/ticketprint/doshift',
		type: 0,
		data: param,
		auth: true
	})
}
/**
 * 获取班次统计
 * @param {Object} param
 * @return {function}
 */
export function getshiftsData(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'/ticketprint/getshiftstatistics',
		type: 0,
		data: param,
		auth: true
	})
}
/**
 * 获取油站基本资料
 * @param {Object} param
 * @return {function}
 */

export function getpagedetails(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'/stationmanager/querystationinfo',
		type: 0,
		data: param,
		auth: true
	})
}
/**
 * 获取当前班次
 * @param {Object} param
 * @return {function}
 */
export function getshifts(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'/ticketprint/getshiftstatistics',
		type: 0,
		data: param,
		auth: true
	})
}
/**
 * 获取换班记录详情
 * @param {Object} param
 * @return {function}
 */
export function getrelief(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'/ticketprint/getshiftrecordlist',
		type: 0,
		data: param,
		auth: true
	})
}
/**
 * 获取当前班次统计
 * @param {Object} param
 * @return {function}
 */
export function getdetails(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'/ticketprint/getshiftdetails',
		type: 0,
		data: param,
		auth: true
	})
}
	
	
	


/**
 * 获取反馈列表
 * @param {pagenum} 当前页
 * @return {function}
 */
export function getFeedbackList(param) {
 
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'feedbackinfo/getfeedbackinfolist',
		type: 0,
		data: param,
		auth: true
	})

	
}

 
/**
 * 油站查询
 * @return {function}
 */
export function queryOilstationinfo() {
 
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'stationmanager/querystationinfo',
		type: 0,
		auth: true
	})

	
}
/**
 * 加油订单列表查询
 * @param {Object} param
 * @return {function}
 */
export function getoilsList(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'/oilticket/queryorderlist',
		type: 0,
		data: param,
		auth: true
	})
}
/**
 * 加油订单详情查询
 * @param {Object} param
 * @return {function}
 */
export function getoilsDetail(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'/oilticket/queryorderdetail',
		type: 0,
		data: param,
		auth: true
	})
}
/**
 * 加油订单详情油站加油撤销
 * @param {Object} param
 * @return {function}
 */
export function oilsRevoke(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'/oilticket/revoke',
		type: 0,
		data: param,
		auth: true
	})
}
/**
 * 扫码加油
 * @param {Object} param
 * @return {function}
 */
export function consumer(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'/oilticket/consumer',
		type: 0,
		data: param,
		auth: true
	})
}


/**
 * 获取百度语音token
 * @param {Object} param
 * @return {function}
 */
export function getBaiduTTSToken() {
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'/baidu/getttstoken',
		type: 0,
		data: {},
		auth: true
	})
}

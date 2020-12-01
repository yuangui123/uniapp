import request from '@/common/requests.js'
import Vue from 'vue'
//MD5加密
import { addSecret } from '@/common/secret.js'
// 公用前缀
var prx = 'v1_1_1/'
 

/**
 * 获取反馈列表
 * @param {pagenum} 当前页
 * @return {function}
 */
export function getFeedbackList(pagenum) {
 
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'feedbackinfo/getfeedbackinfolist',
		type: 0,
		data: {'pagenum':pagenum},
		auth: true
	})

	
}
/**
 * 添加反馈
 * @param {pagenum} 当前页
 * @return {function}
 */
export function addFeedback(param) {
	let data = {
		feedbacktypes: param.feedbacktypes,
		feedbackinfo: param.feedbackinfo,
		feedbackphoto: param.feedbackphoto,
	}
	
	return request.post({
		url: Vue.prototype.$requestUrl.oilServerUrl + prx +'feedbackinfo/addfeedbackinfo',
		type: 0,
		data: param,
		auth: true
	})
}

/**
 * 获取修改登录密码验证码
 * @param {tel} 手机号
 * @return {function}
 */
export function getSendsms(param) {
	
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl + 'message/sendsms',
		type: 1,
		data: param,
		isResponseStr: true
	})

	
}



/**
 * 修改登录密码(不加密)
 * @param {tel} 手机号
 * @return {function}
 */
export function  LoginPassWord(param) {
	
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl + 'user/unencrypt/updatepassword',
		type: 1,
		data: param,
	   	isResponseStr: true
	})
}
/**
 * 修改登录密码
 * @param {tel} 手机号
 * @return {function}
 */
export function changeLoginPassWord(param) {
	
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl + 'user/app/updatepassword',
		type: 0,
		data: param,
		auth: true
	})
}

/**
 * 获取修改支付密码验证码
 * @param {tel} 手机号
 * @return {function}
 */
export function getSendsms2(param) {
	
	return request.post({
		url: Vue.prototype.$requestUrl.payServerUrlV2 + 'account/self/sendverifycode',
		type: 0,
		data: param,
		auth: true
	})

	
}
/**
 * 验证验证短信验证码
 * @param {tel} 手机号
 * @return {function}支付密码验证成功之后 修改支付密码
 */
export function verifysmscode(param) {
	
	return request.post({
		url: Vue.prototype.$requestUrl.payServerUrlV2 + 'account/self/verifysmscode',
		type: 0,
		data: param,
		auth: true
	})
}

/**
 * 支付密码验证成功之后 修改支付密码
 * @param {tel} 手机号
 * @return {function}
 */
export function Updatepaypass(param) {
	
	return request.post({
		url: Vue.prototype.$requestUrl.payServerUrlV2 + 'account/self/modifynewpass',
		type: 0,
		data: param,
		auth: true
	})
}



import request from '@/common/requests.js'
import Vue from 'vue'
//MD5加密
import { addSecret } from '@/common/secret.js'
// 公用前缀
var prx = 'v1_1_1/'
 

/**
 * 获取修改登录密码验证码
 * @param {tel} 手机号
 * @return {function}
 */
export function getSendsms(param) {
	let data = {
		type: param.type,
		mobile: param.mobile
	}
	
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl + 'message/sendsms',
		type: 0,
		data: param,
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
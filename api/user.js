import request from '@/common/requests.js'
import Vue from 'vue'

import { addSecret } from '@/common/secret.js'
import cookies from 'vue-cookie'
 
	
var prx = 'v1_1_1/'

/**
 * 登录超时
 */
export function reLogin(istoast){
	cookies.set('sessionId', '');
	cookies.set('sessionKey', '');
	uni.removeStorageSync('users');
	uni.removeStorageSync('location-host');
	if(istoast){
		uni.showToast({
				icon:'none',
				title:'登录超时，请重新登录！'
			})
	}
	
		
	uni.navigateTo({
		url: '/pages/login'
	});
}

/**
 * 重置密码
 * @param {Object} param
 * @return {function}
 */
export function reset(param) {
	let data = {
		mobile: param.mobile,
		password: addSecret(param.password),
		yzm: param.yzm
	}
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl + 'user/unencrypt/updatepassword',
		type: 1,
		data: data
	})
}

/**
 * 获取用户信息
 * @param {Object} param
 * @return {function}
 */
export function getuserinfotopaye(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl + 'user/getuserinfotopay',
		type: 0,
		data: param,
		auth: true
	})
}

/**
 * 获取用户信息
 * 《油票转出》
 * @param {Object} param
 * @return {function}
 */
export function see(param){
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl + 'user/see',
		type: 0,
		data: param,
		auth: true
	})
}

/**
 * 通过手机号 获取用户信息
 * 《油票转出》
 * @param {Object} param
 * @return {function}
 */
export function baseuserbytel(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl + 'user/baseuserbytel',
		type: 0,
		data: param,
		auth: true
	})
} 

/**
 * 发送短信
 * 加密
 * @param {Object} param
 * @return {function}
 */
export function send2sms(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl + 'message/send2sms',
		type: 0,
		data: param,
		auth: true
	})
}

/**
 * @param {Object} param
 * @return {function}
 */
export function updatemyphonenum(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl +'user/updatemyphonenum',
		type: 1,
		data: param,
		auth: true
	})
}

/**
 * @description 实名认证
 * @param {Object} param
 * @return {function}
 */
export function auth(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl +'customer/auth/real',
		type: 0,
		data: param,
		auth: true
	})
}

/**
 * @description 实名认证查询
 * @param {Object} param
 * @return {function}
 */
export function queryReal() {
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl +'/customer/auth/queryreal',
		type: 0,
		auth: true
	})
}

/**
 * @description 图片上传7牛云
 * @param {Object} param
 * @return {function}
 */
export function uploadbase64(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl +'res/uploadbase64',
		type: 0,
		data: param,
		auth: true
	})
}

/**
 * @description 7牛云token
 * @param {Object} param
 * @return {function}
 */
export function getSevenToken(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl +'res/token',
		type: 0,
		data: param,
		auth: true
	})
}
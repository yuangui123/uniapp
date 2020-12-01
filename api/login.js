import request from '@/common/requests.js'
import Vue from 'vue'
// MD5加密
import { addSecret } from '@/common/secret.js'

// 公用前缀
var prx =  'optmzd/'

/**
 * 登录
 * @param {Object} param
 * @return {function}
 */
export function login(param) {
	let data = {
		mobile: param.tjid,
		password: param.logintype==1?addSecret(param.password) : param.password,
		logintype: param.logintype,
		// 加密请求需要
		publickey: param.publickey
	}
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl+prx +'web/login',
		type: 1,
		data: data,
		secret: true,
		isResponseStr: true,
	})
}


/**
 * 验证码登陆
 * @param {Object} param
 */
export function smsLogin(param) {
	let data = {
		tel: param.tjid,
		pass: param.password,
		apptype: param.logintype
	}
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl+prx +'unencrypt/regloginpublic',
		type: 1,
		data: data,
		secret: true,
		isResponseStr: true
	})
}

/**
 * 注册
 * @param {Object} param
 * @return {function}
 */
export function regist(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl+prx +'unencrypt/reg',
		type: 1,
		data: param,
		isResponseStr: true
	})
}

/**
 * 发送短信
 * @param {Object} param
 * @return {function}
 */
export function smsSend(param) {
	return request.post({
		url: Vue.prototype.$requestUrl.baseServerUrl+'message/sendsms',
		type: 1,
		data: param,
		isResponseStr: true
	})
}
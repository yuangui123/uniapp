import request from '@/common/requests.js'
import Vue from 'vue'
//MD5加密
import { addSecret } from '@/common/secret.js'
import {getStores} from '@/common/utils.js';

var prx = 'v1_1_1/'

/**
 * 零钱 查询用户信息
 */
export function getUserInfo(){
	return request.post({
		url:Vue.prototype.$requestUrl.payServerUrlV2+'account/self/query/info',
		type:0,
		auth:true
	})
}

/**
 * 查询余额
 */
export function getBalance(){
	let user = getStores('users');
	console.log(user.tjid);
	return request.post({
		url:Vue.prototype.$requestUrl.oilPayServerUrl+'oil/cash/v4/balance',
		type:0,
		auth:true,
		data:{'tjid':user.tjid}
	})
}


/**
 * 获取银行卡信息
 * 
 */
export function getBankList(type){
	return request.post({
		url:Vue.prototype.$requestUrl.payServerUrlV2+'account/self/querybind',
		type:0,
		data:{'type':type},
		auth:true
	})
}

/**
 * 获取认证信息
 */


export function getAuthenInfo(){
	return request.post({
		url:Vue.prototype.$requestUrl.baseServerUrl+'customer/auth/factory/getmainreal',
		type:0,
		auth:true
	})
}


/**
 * 获取银行信息
 */
export function getBankInfo(cardNo){
	return request.post({
		url:Vue.prototype.$requestUrl.payServerUrlV2+'account/self/bankinfo',
		type:0,
		auth:true,
		data:{'cardNo':cardNo}
	})
}



/**
 *  绑卡第一步
 */
export function bindBankCardStepFirst(param){
	return request.post({
		url:Vue.prototype.$requestUrl.payServerUrlV2+'account/self/bindstep1/automatic',
		type:0,
		auth:true,
		data:param
	})
}


/**
 * 获取所有的银行
 */
export function getAllBank(keyword){
	return request.post({
		url:Vue.prototype.$requestUrl.payServerUrlV2+'account/self/allbankinfo',
		type:0,
		auth:true,
		data:{'bankname':keyword}
	})
}

/**
 * 小额鉴权 
 */
export function bindBankCardStepSecond(param){
	return request.post({
		url:Vue.prototype.$requestUrl.payServerUrlV2+'account/self/bindstep2/transfer',
		type:0,
		auth:true,
		data:param
	})
}

/**
 * 绑卡第二步 
 */
export function bindBankCardStepSecondForSMS(param){
	return request.post({
		url:Vue.prototype.$requestUrl.payServerUrlV2+'account/self/bindstep2/sms',
		type:0,
		auth:true,
		data:param
	})
}


/**
 * 提现
 */
export function companyWithdrawDeposit(param){
	return request.post({
		url:Vue.prototype.$requestUrl.oilServerUrl+prx+'smallchange/applyforwithdraw',
		type:0,
		auth:true,
		data:param
	})
}

/**
 * 验证密码
 */
export function verifyOldPassword(oldpass){
	return request.post({
		url:Vue.prototype.$requestUrl.payServerUrlV2+'account/self/verifyoldpass',
		type:0,
		auth:true,
		data:{'oldpass':oldpass}
	})
}


 
/**
 * 解绑银行卡 
 */

export function unbindBankCard(param){
	return request.post({
		url:Vue.prototype.$requestUrl.payServerUrlV2+'account/self/unbind',
		type:0,
		auth:true,
		data:param
	})
}

/**
 * 查询交易记录
 */
export function gettradelist(param){
	return request.post({
		url:Vue.prototype.$requestUrl.oilServerUrl+prx+'smallchange/findlist',
		type:0,
		auth:true,
		data:param
	})
}

/**
 * 查询交易记录详情
 */
export function gettradelistdetail(tradeid){
	return request.post({
		url:Vue.prototype.$requestUrl.oilServerUrl+prx+'smallchange/finddetail',
		type:0,
		auth:true,
		data:{'id':tradeid}
	})
}

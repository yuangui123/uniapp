import {
	addHeaders,
	addHeadersSign,
	encodeBase64,
	decodeBase64,
	encryptWith3DesAndEncodeBase64,
	produceSessionKey,
	decodeBase64AndDecryptWith3Des
} from '@/common/secret.js'
import {
	getStores,
	setStores
} from '@/common/utils.js'
import Vue from 'vue'
import {  BaseApiUrl } from '@/common/enum/api.ts'


const request = {}

const globRequest = (url, data, type, method, auth, secret, isResponseStr) => {
	
	//判断session共享问题
	if(auth){
		let host = getStores("location-host");
		if(host=='' || BaseApiUrl.serverapp != host){
			resolveReponse(401);
			return ;
		}
	}
	
	
	// 设置文本头
	let headers = {}
	headers['content-type'] = getContentType(type)
	let crypted = data;
	if(secret) {
		headers = addHeaders(headers)
	}
	if (auth) {
		// 数据加密
		crypted = createAuthData(data);
		// 请求头加密
		headers = getAuthHead(headers,crypted)
	}
	return uni.request({
		url: url,
		data: crypted,
		method: method,
		header: headers,
		withCredentials: auth,
		crossDomain: auth,
	}).then(res => {
		if (res[1].statusCode != 200) {
			return resolveReponse(res[1].statusCode)
		}
		
		if(isResponseStr) {
			return resolveReponseData(res[1].data)
		}
		let obj = res[1].data
		if (auth && obj.data != undefined) {
			var decoded = decodeBase64(obj.data);
			var plainText = decodeBase64AndDecryptWith3Des(produceSessionKey(getStores('users').sessionkey), decoded);
			obj.data = JSON.parse(plainText);
		}
		return resolveReponseData(obj)
	}).catch(res => {
		Vue.prototype.$kami.showKToast({
			content: '网络异常，请稍后再试',
			duration: 3
		})
		toNotFound()
		return {
			code: 500
		}
	})
}


request.get = (obj) => {
	return globRequest(obj.url, obj.data, obj.type, 'get', obj.auth, obj.secret, obj.isResponseStr)
}

request.post = (obj) => {
	return globRequest(obj.url, obj.data, obj.type, 'post', obj.auth, obj.secret, obj.isResponseStr)
}

request.put = (obj) => {
	return globRequest(obj.url, obj.data, obj.type, 'put', obj.auth, obj.secret, obj.isResponseStr)
}

// 请求文本头
function getContentType(type) {
	let headType = 'application/x-www-form-urlencoded'
	switch (type) {
		case 0:
			headType = 'application/json'
			break;
		case 1:
			headType = 'application/x-www-form-urlencoded'
			break;
		case 2:
			break;
	}
	return headType
}
// 创建请求数据
function createAuthData(data) {
	let crypted = ''
	let sessionid = getStores('users').sessionid
	let sessionkey = getStores('users').sessionkey
	if (data != null && data != undefined) {
		crypted = JSON.stringify(data)
		crypted = encodeBase64(encryptWith3DesAndEncodeBase64(produceSessionKey(sessionkey), crypted));
	}
	return crypted
}

// 加密请求头
function getAuthHead(headers, crypted) {
	let sessionid = getStores('users').sessionid
	let sessionkey = getStores('users').sessionkey
	headers = addHeaders(headers)
	headers = addHeadersSign(headers, sessionid, crypted, sessionkey)
	return headers
}
// 解析返回结果状态
function resolveReponse(statusCode) {
	switch(statusCode) {
		case 401:
			setTimeout(function() {
				uni.redirectTo({
					url: '/pages/login'
				})
			}, 1000)
			showAlarm('登录超时，请重新登录！') 
			break;
		case 500:
			toNotFound()
			// showAlarm('未能连接到服务器，请稍后再试') 
			break;
		case 404:
			toNotFound()
			// showAlarm('请求的接口不存在,请联系开发人员') 
			break;
	}
	return statusCode
}

function toNotFound() {
	Vue.prototype.$kami.showError()
}

function resolveReponseData(res) {
	if(res.code == 1) {
		return res;
	}
	Vue.prototype.$kami.showKToast({
		content: res.msg,
		duration: 3
	})
	return {
		code: res.code,
		msg: res.msg
	}
}

function showAlarm(title) {
	Vue.prototype.$kami.showKToast({
		content: title,
		duration: 3
	})
}

export default request

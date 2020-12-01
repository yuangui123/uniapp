import request from '@/common/requests.js'
import Vue from 'vue'

import {
	encryptWith3DesAndEncodeBase64
} from '@/common/secret.js'

export function generateKey(param) {
	return request.get({
		url: Vue.prototype.$requestUrl.baseServerUrl + 'gen/key',
		type: 0,
		data: param,
	})
}

/**
 * 对服务端返回的secretKey进行解密，目前通过与服务端交互实现
 * @param secretKey
 */
export function decryptSecretKey(param) {
	var crypted = encryptWith3DesAndEncodeBase64(param.sessionkey, param.secretKey);
	return request.get({
		url: Vue.prototype.$requestUrl.baseServerUrl + 'gen/unc',
		type: 0,
		data: {
			tjid: param.tjid,
			crypted: crypted
		}
	})
}

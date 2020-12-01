const request = {}

const globRequest = (url, data, headers, method) => {
	if(headers != undefined) {
		headers['content-type'] = headers.contentType
	}
	return uni.request({
		url: url,
		data: data,
		method: method,
		header: headers,
		crossDomain: true
	}).then(res => {
		if (res[1].statusCode == 200 && res[1].data.statusCode != 403) {
			return res[1].data
		} else if (res[1].data.statusCode == 403) {
			Vue.prototype.ToLogin()
			uni.showToast({
				title: '登录超时，请重新登录！',
				icon: 'none',
				duration: 3000
			})
			return 403
		} else {
			uni.showToast({
				title: '网络异常',
				icon: 'none',
				duration: 3000
			})
			return {
				code: '404'
			}
		}

	}).catch(res => {
		uni.showToast({
			title: '网络异常',
			icon: 'none',
			duration: 10000
		})
		return {
			code: '404'
		}
	})
}


request.get = (obj) => {
	return globRequest(obj.url, obj.data, obj.headers, 'get')
}

request.post = (obj) => {
	return globRequest(obj.url, obj.data, obj.headers, 'post')
}

request.put = (obj) => {
	return globRequest(obj.url, obj.data, obj.headers, 'put')
}

export default request

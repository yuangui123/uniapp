/***
 * 截取小数点  不四舍五入
 * @param num  数字
 * @param decimal 需要截取的小数点位数
 * @returns {string}
 */

export function formatDecimal(num, decimal) {
	num = num.toString()
	let index = num.indexOf('.')
	if (index !== -1) {
		num = num.substring(0, decimal + index + 1)
	} else {
		num = num.substring(0)
	}
	return parseFloat(num).toFixed(decimal)
}


export function showToast(title, icon, position, time, type) {
	switch (type) {
		case "normal":
			time = time == "" ? 3000 : time,
				icon = icon == "" ? "loading" : icon
			uni.showToast({
				title: title,
				icon: icon,
				duration: time
			})
			break;
		case "toast":
			position = position == "" ? "bottom" : position
			uni.showToast({
				title: title,
				position: position
			})
			break;
		case "noicon":
			uni.showToast({
				title: title,
				icon: 'none',
				duration: time
			})
			break;
	}
}

export function hideToast() {
	uni.hideToast()
}

export function toPage(type, url) {
	switch (type) {
		case "navigateTo":
			uni.navigateTo({
				url: url
			})
			break;
		case "redirectTo":
			uni.redirectTo({
				url: url
			})
			break;
		case "reLaunch":
			uni.reLaunch({
				url: url
			})
			break;
		case "navigateBack":
			uni.navigateBack({
				delta: url
			})
			break;
	}
}

export function setStores(key, val) {
 
	uni.setStorageSync(
		key,
		val
	);
}
export function getStores(key) {

	let temp = uni.getStorageSync(key);
	return temp
}
export function removeStores(key) {
	uni.removeStorageSync(key);
}
export function formatTxLocationToBd(longitude, latitude) {
	let bd_lat;
	let bd_lon;
	let x_pi = 3.14159265358979324;
	let x = longitude,
		y = latitude;
	let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
	let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
	bd_lon = z * Math.cos(theta) + 0.0065;
	bd_lat = z * Math.sin(theta) + 0.006;
	let arr = new Array();
	arr.push(bd_lat)
	arr.push(bd_lon)
	return arr;
}

export function isPoneAvailable(phoneNumber) {
	var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
	if (!myreg.test(phoneNumber)) {
		return false
	}
	return true
}

export function isIdCardAvailable(card) {
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if (reg.test(card) === false) {
		return false;
	}
	return true
}

export function cutChinese(val) {
	var reg = /[\u4e00-\u9fa5]/;
	let index = val.length
	for (let i = 0, arrLen = val.length; i < arrLen; i++) {
		if (reg.test(val.charAt(i))) {
			index = i
			break
		}
	}
	return val.substring(0, index)
}

export function isPassword(val) {
	let isEn = false
	let isNum = false
	var reg = /[a-zA-Z]/
	var reg2 = /[0-9]/
	for (let i = 0, arrLen = val.length; i < arrLen; i++) {
		if (reg.test(val.charAt(i))) {
			isEn = true
			if (isNum) {
				break;
			}
		}
		if (reg2.test(val.charAt(i))) {
			isNum = true
			if (isEn) {
				break;
			}
		}
	}
	return isEn && isNum
}

export function isEmpty(str) {
	if (str == null || str == '' || str == undefined || str.length == 0) {
		return true
	}
	return false
}

export function formatDateTime(date, type) {

	let temp = ''
	if (type == 'date') {
		temp = date.getFullYear() + '-' + disDate(date.getMonth() + 1) + '-' + disDate(date.getDate())
	} else if (type == 'all') {
		temp = date.getFullYear() + '-' + disDate(date.getMonth() + 1) + '-' + disDate(date.getDate()) + ' ' + disDate(date.getHours()) +
			':' + disDate(date.getMinutes()) + ':' + disDate(date.getSeconds())
	}
	return temp
}

export function formatDateTime2(date) {
	let temp = date.getFullYear() + '-' + disDate(date.getMonth() + 1) + '-' + disDate(date.getDate()) + ' ' + disDate(
		date.getHours()) + ':' + disDate(date.getMinutes()) + ':' + disDate(date.getSeconds())
	return temp
}


function disDate(val) {
	if (val < 10) {
		return '0' + val
	} else {
		return val
	}
}

export function getDistance(la2, lo2, la1, lo1) {
	var La1 = la1 * Math.PI / 180.0;
	var La2 = la2 * Math.PI / 180.0;
	var La3 = La1 - La2;
	var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 /
		2), 2)));
	s = s * 6378.137;
	s = Math.round(s * 10000.0) / 10000.0;
	s = s
	if (s > 1) {
		s = (parseFloat(s)).toFixed(2) + 'km'
	} else {
		s = (parseFloat((s) * 1000)).toFixed(2) + 'm'
	}
	return s
}

export function getDistance2(la2, lo2, la1, lo1) {
	var La1 = la1 * Math.PI / 180.0;
	var La2 = la2 * Math.PI / 180.0;
	var La3 = La1 - La2;
	var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 /
		2), 2)));
	s = s * 6378.137;
	s = Math.round(s * 10000.0) / 10000.0;
	return s
}

export function bd_encrypt(gg_lng, gg_lat) {
	var X_PI = Math.PI * 3000.0 / 180.0;
	var x = gg_lng,
		y = gg_lat;
	var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
	var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
	var bd_lng = z * Math.cos(theta) + 0.0065;
	var bd_lat = z * Math.sin(theta) + 0.006;
	return {
		lat: bd_lat,
		lng: bd_lng
	};
}

export function formatDateTimeFull(date, type) {
	// yyyyMMddHHm_mss
	if (date instanceof Object) {
		date = formatDateTime2(date)
	}
	let temp = ''
	if (type.indexOf("yyyy") != -1) {
		temp += date.slice(0, 4)
	}
	if (type.indexOf("MM") != -1) {
		if (temp.length > 0) {
			temp += '-'
		}
		temp += date.slice(5, 7)
	}
	if (type.indexOf("dd") != -1) {
		if (temp.length > 0) {
			temp += '-'
		}
		temp += date.slice(8, 10)
	}
	if (type.indexOf("HH") != -1) {
		if (temp.length > 0) {
			temp += ' '
		}
		temp += date.slice(11, 13)
	}
	if (type.indexOf("m_m") != -1) {
		if (temp.length > 0 && type.indexOf("HH") != -1) {
			temp += ':'
		}
		temp += date.slice(14, 16)
	}
	if (type.indexOf("ss") != -1) {
		if (temp.length > 0 && type.indexOf("m_m") != -1) {
			temp += ':'
		}
		temp += date.slice(17, 19)
	}
	return temp
}

export function getCurrentMonthFirst(dateStr) {
	var date = new Date(dateStr);
	date.setDate(1);
	return date;
}
/**
 * 获取当前月的最后一天
 */
export function getCurrentMonthLast(dateStr) {
	var date = new Date(dateStr);
	var currentMonth = date.getMonth();
	var nextMonth = ++currentMonth;
	var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
	var oneDay = 1000 * 60 * 60 * 24;
	var nDate = new Date(nextMonthFirstDay - oneDay)
	return nDate.getFullYear() + '-' + disDate(nDate.getMonth() + 1) + '-' + disDate(nDate.getDate())
}

export function outMapList() {
	return [{
		name: '高德',
		url: '',
		icon: '/static/resource/svg/gaode.svg',
		color: 'blue',
		type: 'gaode'
	}, {
		name: '百度',
		url: '',
		icon: '/static/resource/svg/baidu.svg',
		color: 'red',
		type: 'baidu'
	}]
}

export function randomString(length) {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
	if (!length) {
		length = Math.floor(Math.random() * chars.length);
	}

	var str = '';
	for (var i = 0; i < length; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}

	return str;
}
//搜索路径规划
export function searchPoint(locationInfo, isWechat, wechat, wx) {
	setTimeout(() => {
		let waypoints = ''
		let waypointsname = ''
		locationInfo.pointList.forEach((item, index) => {
			if (item.location != undefined && item.location.lat != undefined) {
				waypoints += (item.location.lng + "") + ',' + (item.location.lat + "") + '|'
				waypointsname += item.name + ';'
			}
		})
		waypoints = waypoints.substring(0, waypoints.length - 1)
		waypointsname = waypointsname.substring(0, waypointsname.length - 1)

		// console.log("waypointsname-----------------",waypointsname);
		let url = '/pages/road/map?' +
			'beginLocationName=' + locationInfo.start.name + '&' +
			'endLocationName=' + locationInfo.end.name + '&' +
			`destination=` + (locationInfo.end.location.lng + "") + `,` + (locationInfo.end.location.lat + "") + `&` +
			`oilname=0&` +
			`pagenum=1&` +
			`waypoints=` + waypoints + `&` +
			`waypointsname=` + waypointsname + `&` +
			`pagesize=9999&`
		if (locationInfo.start.location != undefined) {
			url += `origin=` + (locationInfo.start.location.lng + "") + `,` + (locationInfo.start.location.lat + "")
		} else {
			url += 'origin=null'
		}
		// uni.navigateTo({
		// 	url: url
		// })
		// console.log(url,typeof(url))
		// return;
		uni.redirectTo({
			url: url,
			success() {
				let page = getCurrentPages().pop(); //跳转页面成功之后
				if (!page) return;
				location.reload()
			}
		})
		/*if(wechat!=null && wx!=null){
			wechat.onConfig({
				apiList: ['getLocation'],
				success: () => {
					wx.getLocation({
						type: 'gcj02',
						success: (res) => {
							let lat = parseFloat(res.latitude) + 0.002257;
							let lng = parseFloat(res.longitude) + 0.0023;
							url += (`&currentLon=${lng}` + `&currentLat=${lat}`)
							uni.navigateTo({
								url: url
							})
						},
						fail:   this.locationFailed(url)
					});
				},
				error:   this.locationFailed(url)
			});
		}
		*/
	}, 100)
}

/**
 * 获取当前月份
 */
export function doHandleMonth() {
     var myDate = new Date();
        var tYear = myDate.getFullYear();
        var tMonth = myDate.getMonth();
     
        var m = tMonth + 1;
        if (m.toString().length == 1) {
            m = "0" + m;
        }
        return tYear +'-'+ m;
}

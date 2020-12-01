

/**
 * @description 接口请求路径前缀
 * @author kami
 */
export enum BaseApiUrls {
	server24 = 'http://120.26.80.24:8769',
	server47 = 'http://47.97.35.47:8769',
	serverNp = 'https://nynew.ny256.net'
}

/**
 * @description 部署路径
 * @author kami
 */
export enum NPUri {
	server24 = 'http://24.ny256.cn/ny-station/',
	server47 = 'http://47.ny256.cn/ny-station/',
	serverNp = 'http://np.ny256.cn/ny-station/'
}

export enum BaseApiUrl {
	server = BaseApiUrls.server24,
	serverapp = NPUri.server24
}


/**
 * @description 服务路径
 * @author kami
 */
export enum ServerUrl {
	batch = 'v1_1_1/',
	oilServerUrl =  '/oil-service/',
	userServerUrl =  '/user-service/',
	baseServerUrl =  '/wlhy-base-service/',
	commServerUrl =  '/comm-service/',
	qrcodeServerUrl =  '/qrcode-service/',
	payServerUrlV2 =  '/pay2-service-v2/',
	oilPayServerUrl =  '/oil-pay-service/',
	niuYunServerUrl = '/niuyun-service/',
	testUrl = 'http://192.168.1.184:8769/oil-service/',
 
	appUrl = 'http://56.ny256.com/newhtml/sp.html'
}

{
 
	if(
	BaseApiUrl.server==BaseApiUrls.server24 ||
	BaseApiUrl.server==BaseApiUrls.server47){
		//24和47环境显示 调试vConsole工具
		document.write('<script src="https://cdn.bootcss.com/vConsole/3.3.0/vconsole.min.js"><\/script>');
		document.write('<script>new VConsole()<\/script>');
	}
	
}
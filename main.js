import Vue from 'vue'
import App from './App'

import store from './store'
import cookies from 'vue-cookie'
import kglobal from '@/components/kami/kglobal/index.vue'
// import beforeLoad from '@/common/kami-chaos/before-load'
import mixinsChaos from '@/common/mixins.js'
import { ServerUrl, BaseApiUrl } from '@/common/enum/api.ts'
import * as math from 'mathjs'



import uView from "uview-ui";
Vue.use(uView);




// import pageAnimation from '@/components/kami/page-animation'
// beforeLoad.init({
// 	// 性能上传路径
// 	loadUrl: 'https://www.redkami.com/performance/performance/recordApp',
// 	// 错误上传路径
// 	errorUrl: 'https://www.redkami.com/performance/performance/recordAppPerformance',
// 	// 应用名称
// 	app: '牛运公众号',
// 	// 平台 h5 app
// 	platform: 'h5',
// 	// 开发框架 移动端暂只支持uniapp web端不能填uni-app 未测试
// 	dev: 'uni-app',
// 	// appid
// 	appId: '22eb777587e544efa258-173753bc58b1'
// })
// Vue.mixin(beforeLoad.mixins)
Vue.mixin(mixinsChaos)
// Vue.mixin(notFound)
// Vue.mixin(pageAnimation)

Vue.config.productionTip = false

   
Vue.prototype.$math = math

 


Vue.prototype.$requestUrl = {
	oilServerUrl:  BaseApiUrl.server + ServerUrl.oilServerUrl,
	userServerUrl: BaseApiUrl.server + ServerUrl.userServerUrl,
	baseServerUrl: BaseApiUrl.server + ServerUrl.baseServerUrl,
	commServerUrl: BaseApiUrl.server + ServerUrl.commServerUrl,
	qrcodeServerUrl: BaseApiUrl.server + ServerUrl.qrcodeServerUrl,
	payServerUrlV2: BaseApiUrl.server + ServerUrl.payServerUrlV2,
	oilPayServerUrl: BaseApiUrl.server + ServerUrl.oilPayServerUrl,
	niuYunServerUrl: BaseApiUrl.server + ServerUrl.niuYunServerUrl,
	testUrl: 'http://192.168.1.184:8769/oil-service/',
 
	appUrl: BaseApiUrl.appUrl
}
Vue.prototype.$isWechat = false
Vue.prototype.$isWIOS = false
Vue.prototype.$cookies = cookies; 
Vue.prototype.$store = store
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}

Vue.prototype.PlayAudio = function(url) {
	var music = null;
	music = uni.createInnerAudioContext(); //创建播放器对象
	music.src = url; //选择播放的音频
	music.play(); //执行播放
}

let kglobalClass = Vue.component('kglobal',kglobal)

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
Vue.prototype.$kami = new kglobalClass()
// #ifdef H5
document.body.appendChild(Vue.prototype.$kami.$mount().$el)
// #endif


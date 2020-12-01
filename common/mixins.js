const mixins= {
	data() {
		return {
			// 屏幕可视高宽
			windowHeight: 0,
			windowWidth: 0,
			// 微信定位 公共返回
			wechatLocationError: undefined,
			keyBoardHold: false
		}
	},
	filters: {
		/**
		 * 文字长度过滤 超出部分...替代
		 * 数据
		 * @param {Object} data
		 * 最长长度
		 * @param {Object} length
		 */
		filterPublicTextLength(data,length) {
			if (data == undefined) {
				return data
			}
			if (data.length > length) {
				return data.substring(0, length-1) + '...'
			}
			return data
		},
		/**
		 * 数字小数点过滤
		 * 数据
		 * @param {Object} data
		 * 保留长度
		 * @param {Object} length
		 */
		filterPublicNumberFloat(data,length){
			if (data == undefined) {
				return data
			}
			return parseFloat(data).toFixed(length)
		},
		/**
		 * 距离长度转换
		 * 数据
		 * @param {Object} data
		 */
		filterPublicKm(data) {
			if(data == undefined) {
				return ''
			}
			return data > 1000? (data / 1000).toFixed(2) + '公里': data +'米'
		}
	},
	methods: {
		// 获取屏幕高宽
		publicWindowHeight() {
			const res = uni.getSystemInfoSync();
			this.windowHeight = res.windowHeight
			this.windowWidth = res.windowWidth
			if(res.system.toLocaleUpperCase().indexOf('IOS') != -1) {
				this.windowHeight -= uni.upx2px(20)
				this.$isWIOS = true
			} else {
				this.$isWIOS = false
			}
		},
		// 返回上一页
		forback(backPath) {
			if(backPath == null) {
				uni.navigateBack()
			} else {
				if(getCurrentPages().length <= 1) {
					uni.redirectTo({
						url: backPath
					})
					return
				} 
				uni.navigateBack()
			}
		},
		watchWindow() {
			let that = this
			let heights = this.windowHeight
			uni.onWindowResize((res) => {
				let pag = getCurrentPages()[getCurrentPages().length - 1].route
				if (res.size.windowHeight != heights && pag.indexOf('login') != -1) {
					uni.pageScrollTo({
					    scrollTop: ((heights - res.size.windowHeight) /2),
					    duration: 100
					});
				} 
				if (res.size.windowHeight == heights && pag.indexOf('toiling') != -1) {
					let next = that.isGenerate()
					if (!next) {
						return
					}
					that.curCoupon = {}
					that.createorder(null)
				} 
				if(res.size.windowHeight != heights && pag.indexOf('toiling') != -1) {
					uni.pageScrollTo({
					    scrollTop: ((heights - res.size.windowHeight) /2),
					    duration: 100
					});
				}
				if (res.size.windowHeight == heights && pag.indexOf('noiling') != -1) {
					let next = that.isGenerate()
					if (!next) {
						return
					}
					that.curCoupon = {}
					that.appcheckoil()
				} 
				if(res.size.windowHeight != heights && pag.indexOf('noiling') != -1) {
					uni.pageScrollTo({
					    scrollTop: ((heights - res.size.windowHeight) /2),
					    duration: 100
					});
				}
			})
		},
		closeWindowWatch() {
			uni.offWindowResize(() => {
			})
		}
	},
	onLoad() {
		this.publicWindowHeight()
		this.keyBoardHold = false
		this.wechatLocationError = () => {
			this.$kami.showKToast({
				content: '获取定位失败，请确认是否开启定位再刷新页面重试',
				duration: 3
			})
		}
		// #ifdef H5
		// 是否是在微信环境
		this.$isWechat = /micromessenger/.test(navigator.userAgent.toLowerCase())
		// 重载页面事件监听
		uni.$on('reload',function(e){
			window.location.reload()
		})
		// #endif
	},
	created(){
		this.$isWechat = /micromessenger/.test(navigator.userAgent.toLowerCase())
		this.publicWindowHeight()
	},
	onHide() {
		this.closeWindowWatch()
	},
	onUnload() {
		this.closeWindowWatch()
	}
}
export default mixins

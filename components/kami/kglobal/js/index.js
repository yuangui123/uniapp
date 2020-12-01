import {getStores} from '@/common/utils.js'
import error from '../../error/index.vue'
import toast from '../../toast/index.vue'
import loading from '../../k-loading/index.vue'
export default {
	data() {
		return {
			// ***********页面参数*************
			info: {
				
			},
			showErrorLoding: false,
			showCover: false,
			showToast: false,
			toastContent: '',
			toastDuration: 3,
			timeOutLock: false,
			showLoading: false,
		}
	},
	components: {
		error,
		toast,
		loading
	},
	computed: {},
	filters: {
	},
	watch: {
	},
	methods: {
		closeError(e) {
			if(e == 1) {
				this.showErrorLoding = false
				//#ifdef H5
				uni.$emit('reload')
				// #endif
			}
			this.showCover = false
		},
		showKToast(e,type) {
			// uni.showLoading( {
				
			// 	title: e.content,
			// 	  duration: 2000
			// })
			
			// uni.hideToast()
			
			let typename = 'none';
			if(type == 1){
				typename = 'success';
			}else if(type == 2){
				typename = 'loading';
			}else if(type == 3){
				typename = 'none';
			}
			
			uni.showLoading({
			    title: e.content,
				icon:typename
			});
			
			setTimeout(function () {
			    uni.hideLoading();
			},2000);
			//alert( e.content)
			//this.toastContent = e.content
			
			// this.toastDuration = e.duration == undefined?3:e.duration
			// this.showCover = true
			// this.showToast = true
			// this.timeOutLock = true
			// if(this.timeOutLock) {
			// 	this.localTimeOut()
			// }
		},
		localTimeOut() {
			let that = this
			setTimeout(function() {
				let temp = that.toastDuration 
				that.toastDuration = --temp
				if(that.toastDuration > 0 && that.showToast) {
					that.localTimeOut()
				} else {
					if(!that.showErrorLoding) {
						that.showCover = false
					}
					that.showToast = false
					that.timeOutLock = false
				}
			},1000)
		},
		closeAll() {
			this.showToast = false
			this.timeOutLock = false
			this.showLoading = false
			if(!this.showErrorLoding) {
				this.showCover = false
			}
		},
		closeToast() {
			/*this.showToast = false
			this.timeOutLock = false
			if(!this.showErrorLoding && !this.showLoading) {
				this.showCover = false
			}*/
			uni.hideToast()
		},
		showError() {
			this.showCover = true
			this.showErrorLoding = true
		},
		showLoaded() {
			this.showCover = true
			this.showLoading = true
		},
		hideLoaded() {
			this.showCover = false
			this.showLoading = false
		}
	},
	created() {
		let that = this
		uni.$on('showGlobal',function(e){
			if(e.type == 1) {
				that.showCover = true
			}
			that.showErrorLoding = true
		})
	}
};

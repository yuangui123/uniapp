 


<style lang="scss">

@import "uview-ui/index.scss";
@import './common/uni.css';
@import './static/css/font.css';

/* 隐藏高德地图图标 */
.amap-logo {
    display: none !important;
}

/* 以下样式用于 hello uni-app 演示所需 */
// page {
// 	background-color: #f4f5f6;
// 	height: 100%;
// 	font-size: 28rpx;
// 	line-height: 1.8;
// }
// .u-buttom-line-active{   
// 	background:#333333 !important 
// }

// .uni-header-logo {
// 	padding: 30rpx;
// 	flex-direction: column;
// 	justify-content: center;
// 	align-items: center;
// 	margin-top: 10rpx;
// }

.uni-header-image {
	width: 100px;
	height: 100px;
}


/* 全局组件样式 */
view{
	    font-family: PingFangSC !important;
 
}
/* 全局页面样式 */
page { 
	background-color: #f4f5f6;
	font-family: PingFangSC  !important;
 
}


</style>


<script>
export default {
	onLaunch: function() {
	},
	onShow: function() {},
	onHide: function() {
		console.log('App Hide');
	},
	globalData: {
		test: '',
		oilSound:true,
	}
};
</script>
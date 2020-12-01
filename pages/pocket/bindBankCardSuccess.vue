<template>
	<view style="background-color: #FFFFFF;height: 100%;width: 100%;">
		<u-navbar title="绑定银行卡" :is-back="false" title-color="#333333"></u-navbar>
		<view style="display:flex;justify-content:center;">
			<view>
				<u-image src="/static/img/bind_success.png" height="220rpx" width="160rpx" style="margin-top: 80rpx;"></u-image>

				<view style="color: #333333;font-size: 30upx;margin-top: 30rpx;">绑定银行卡成功</view>


			</view>


		</view>


		<u-button :plain="true" type="success" shape="square" style="margin: 80rpx;" @click="back">返回</u-button>

	</view>




</template>

<script>
	export default {

		methods: {
			back() {
				this.$router.go(-3);
				// uni.navigateTo({
				// 	url:'./loose_change',
				// 	success() {
				// 		let page = getCurrentPages().pop(); //跳转页面成功之后
				// 		if (!page) return;
				// 		page.onLoad(); //如果页面存在，则重新刷新页面
				// 	}
				// })
			}
		}

	}
</script>

<style>
</style>

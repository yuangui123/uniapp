<template>
	<view style="background-color: #FFFFFF;height: 100%;width: 100%;" class="wrap">
		<u-navbar title="零钱提现" :is-back="false" title-color="#333333"></u-navbar>
		<u-line color="#ededed"></u-line>
		<u-time-line style="margin: 55rpx;" :list="stepList" :current="1" active-color="#2ecc71" direction="column">
			<u-time-line-item>
				<template v-slot:node>
					<view class="circle"  ></view>
					
				</template>
				<template v-slot:content>
					<view style="color: #999999;">发起提现申请</view>
				</template>

			</u-time-line-item>
			<u-time-line-item style="margin-top: 70rpx;">
				<template v-slot:node>
					<u-icon size="40" name="/static/img/txxqicon2.png"></u-icon>
				</template>
				<template v-slot:content>
					<view style="color: #333333;font-size: 36upx;">银行处理中</view>

				</template>

			</u-time-line-item>
			<u-time-line-item style="margin-top: 75rpx;" nodeTop="24">
				<template v-slot:node>
					<view class="circle-gray"></view>
				</template>
				<template v-slot:content>
					<view style="color: #999999;">到账成功</view>

				</template>

			</u-time-line-item>

		</u-time-line>

		<u-line color="#ededed" style="margin-top: 30rpx;"></u-line>

		<view style="margin-left: 24rpx;margin-right: 24rpx;margin-top: 40rpx;">
			<u-row gutter="12">
				<u-col span="4">交易类型</u-col>
				<u-col span="8" text-align="right">提现</u-col>
			</u-row>
			<u-row gutter="12">
				<u-col span="4">提现金额</u-col>
				<u-col span="8" text-align="right">¥{{fee}}</u-col>
			</u-row>
			<u-row gutter="12">
				<u-col span="4">到账银行卡</u-col>
				<u-col span="8" text-align="right">{{bankcard}}</u-col>
			</u-row>

		</view>
		
		<u-button type="success" style="margin: 80rpx;" @click="onfinish">完成</u-button>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				fee:'',
				bankcard:''
			}

		},
		methods:{
			onfinish(){
				uni.$emit("updatebalance")
				// uni.navigateTo({
				// 	url:'./loose_change'
				// })
				this.$router.go(-2);
				// uni.navigateBack({
				// 	delta:3
				// })
			}
		},
		onLoad(e) {
			if(e != null){
				this.fee = e.withdrawfee;
				this.bankcard = e.bankname;
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.circle {
		border-radius: 50%;
		width: 25rpx;
		height: 25rpx; 
		background-color: #00CD79;
	}
	.circle-gray {
		border-radius: 50%;
		width: 25rpx;
		height: 25rpx; 
		background-color: #CCCCCC;
	}
</style>

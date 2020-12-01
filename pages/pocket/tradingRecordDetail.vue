<template>
	<view style="background-color: #FFFFFF;padding: 24rpx;">
		<view style="height: 180rpx;">
			<view style="font-size: 32upx;color: #333333;">交易金额</view>
			<view style="text-align: center;font-size: 60upx;font-weight: bold;">{{tradebean.smallChangeMoney == null ? '' : tradebean.smallChangeMoney}}</view>
		</view>
		
		<u-line color="#ededed" style="margin-top: 30rpx;"></u-line>

		<u-time-line v-if="isShowStep" style="margin: 55rpx;"  :current="1" active-color="#2ecc71" direction="column">
			<u-time-line-item>
				<template v-slot:node>
					<view class="circle-gray"></view>
					
				</template>
				<template v-slot:content>
					<view style="color: #999999;">发起提现申请</view>
				</template>
		
			</u-time-line-item>
			<u-time-line-item style="margin-top: 70rpx;">
				<template v-slot:node>
					<view class="circle-gray"></view>
					
				</template>
				<template v-slot:content>
					<view style="color: #999999;">银行处理中</view>
		
				</template>
		
			</u-time-line-item>
			<u-time-line-item style="margin-top: 75rpx;" nodeTop="24">
				<template v-slot:node>
					<u-icon size="40" name="/static/img/icon_withdraw_suc.png"></u-icon>
				</template>
				<template v-slot:content>
					<view style="color: #333333;font-size: 36upx;">到账成功</view>
		
				</template>
		
			</u-time-line-item>
		
		</u-time-line>
		
		<u-time-line v-if="isShowStep2" style="margin: 55rpx;"  :current="1" active-color="#2ecc71" direction="column">
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
		
	
		
		<u-line color="#ededed" style="margin-top: 30rpx;" v-if="isShowStep || isShowStep2"></u-line>
		<u-row gutter="12" style="margin-top: 30rpx;">
			<u-col span="3" class="text-left">交易类型</u-col>
			<u-col span="9" class="text-right" text-align="right" style="font-size: 28rpx;">{{tradebean.transactionTypeName}}</u-col>
		</u-row>
		<u-row gutter="12" style="margin-top: 20rpx;">
			<u-col span="3" class="text-left">交易时间</u-col>
			<u-col span="9" class="text-right" text-align="right" style="font-size: 28rpx;">{{tradebean.createTime}}</u-col>
		</u-row>
		
		<u-row gutter="12" style="margin-top: 20rpx;">
			<u-col span="2" class="text-left">流水号</u-col>
			<u-col span="10" class="text-right" text-align="right" style="font-size: 28rpx;">{{tradebean.transId}}</u-col>
		</u-row>
		<u-row gutter="12" style="margin-top: 20rpx;">
			<u-col span="3" class="text-left">余额</u-col>
			<u-col span="9" class="text-right" text-align="right" style="font-size: 28rpx;">{{tradebean.balance}}</u-col>
		</u-row>
		<u-row gutter="12" style="margin-top: 20rpx;">
			<u-col span="3" class="text-left">说明</u-col>
			<u-col span="9" class="text-right" text-align="right" style="font-size: 28rpx;">{{tradebean.remark}}</u-col>
		</u-row>
	</view>


</template>

<script>
	import {
		gettradelistdetail
	} from '@/api/payservice.js';
	import {
		isEmpty,formatDateTime
	} from '@/common/utils.js';

	import Vue from 'vue'

	export default {
		data() {
			return {
				tradebean: null,
				id:'',
				isShowStep:false,
				isShowStep2:false
			}
		},
		methods:{
			getdetail(id){
				this.$kami.showLoaded()
				gettradelistdetail(id).then(res => {
					if (res.code == 1) {
						this.tradebean = res.data;
						this.tradebean.createTime = formatDateTime(new Date(parseInt(this.tradebean.createTime)), 'all');
					
						if (this.tradebean.transactionType == 2 ) {
							if (this.tradebean.status == 1) {
								this.isShowStep = true;
								this.isShowStep2 = false;
							}else if(this.tradebean.status == 0){
								this.isShowStep2 = true;
								this.isShowStep = false;
							}else{
								this.isShowStep = false;
								this.isShowStep2 = false;
							}
							
						}else {
							this.isShowStep = false;
							this.isShowStep2 = false;
						}
						console.log(res.data);
					}
					this.$kami.hideLoaded()
				})
			}
		},
		onLoad(opstion) {
			console.log("id="+opstion.id);
			this.getdetail(opstion.id);
		},
	}
</script>

<style lang="scss" scoped>
	.text-right {
		font-size: 32upx;
		color: #333333;
	}

	.text-left {
		font-size: 30upx;
	}
	.circle-gray {
		border-radius: 50%;
		width: 25rpx;
		height: 25rpx; 
		background-color: #CCCCCC;
	}
	.circle {
		border-radius: 50%;
		width: 25rpx;
		height: 25rpx; 
		background-color: #00CD79;
	}
</style>

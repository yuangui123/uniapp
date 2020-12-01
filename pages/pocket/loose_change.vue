<template>
	<view style="margin-left: 24rpx;margin-right: 24rpx;">

		<view class="u-top-area">

			<u-row>
				<u-col style="color: #FFFFFF; font-size: 36upx; margin-top: 30rpx;margin-left: 36rpx;">零钱余额（元）</u-col>
			</u-row>
			<u-row>
				<u-col span="12" style="color: #FFFFFF; font-size: 72upx; margin-left: 36rpx;">{{balance}}</u-col>
			</u-row>
		</view>

		<u-cell-group style="margin-top: 59rpx;">
			<u-cell-item class="u-center-area" title="零钱提现" index="0" @click="click">
				<u-icon :size="36" slot="icon" name="/static/img/icon-tixian.png" style="margin-right: 24rpx;"></u-icon>
			</u-cell-item>

			<view style="background-color: #F4F5F6;height: 24rpx;"></view>
			<u-cell-item class="u-center-area" title="交易记录" index="1" @click="click">
				<u-icon :size="36" slot="icon" name="/static/img/icon-jyjl.png" style="margin-right: 24rpx;"></u-icon>

			</u-cell-item>
			<view style="background-color: #F4F5F6;height: 24rpx;"></view>
			<u-cell-item class="u-center-area" title="银行卡" :value="isbind ? '已绑定':'未绑定'" :value-style="{'color':isbind ? '#333333':'#FB4760'}"
			 index="2" @click="click">
				<u-icon :size="36" slot="icon" name="/static/img/icon-yinhangqia.png" style="margin-right: 24rpx;"></u-icon>
			</u-cell-item>


		</u-cell-group>

		<u-modal @confirm="comfirmClick" v-model="isshow" :content="content" :cancel-text="cancel" :confirm-text="comfirm"
		 confirm-color="#2ecc71" :show-cancel-button="true"></u-modal>



	</view>
</template>

<script>
	import {
		getUserInfo,
		getBalance
	} from '@/api/payservice.js'
	import Vue from 'vue'

	export default {
		data() {
			return {
				balance: '0',
				isDefaultpass: true,
				isbind: false,
				isshow: false,
				content: '您目前还没有设置支付密码，这将会影响您的充值、提现和转账，建议您设置支付密码',
				comfirm: '立即设置',
				cancel: '稍后操作',
				isRefresh: false

			}
		},
		methods: {
			click(index) {
				if (index == 0) {
					if (!this.isDefaultpass) {
						uni.navigateTo({
							url: './withdrawMoney'
						});
					} else
						this.isshow = true;

				} else if (index == 1) {
					uni.navigateTo({
						url: './tradingRecordList'
					});
				} else if (index == 2) {

					if (!this.isDefaultpass) {
						uni.navigateTo({
							url: './bankCard'
						});

					} else
						this.isshow = true;

				}

			},
			getCardInfo() {
				if (!this.isRefresh)
					this.$kami.showLoaded()
				getBalance().then(res => {
					if (res.code == 1) {
						this.balance = res.data.balance;
						console.log(this.balance);
					}
					if (this.isRefresh) {
						this.isRefresh = false;
						uni.stopPullDownRefresh();
					} else
						this.$kami.hideLoaded()

				})

			},
			getUserInfo() {
				//this.$kami.showLoaded()
				getUserInfo().then(res => {
					if (res.code == 1) {
						this.isDefaultpass = res.data.isdefaultpass == 1; //1:默认密码，2:非默认密码",
						//	console.log(res.data.isdefaultpass);
						this.isbind = res.data.isbind;
					}
					//this.$kami.hideLoaded()
					if (this.isRefresh) {
						this.isRefresh = false;
						uni.stopPullDownRefresh();
					}
				})
			},

			comfirmClick() {
				uni.navigateTo({
					url: '../baseSetting/setting/updatePayPassword'
				})
			}

		},
		created() {
			this.getCardInfo();
			this.getUserInfo();
		},
		onLoad() {
			uni.$on('updatebalance', (res) => {
				this.getCardInfo();
			})
			uni.$on('bindsuc', (res) => {
				if (!this.isbind) {
					this.isbind = true;
				}
			})
			uni.$on('unbind', res => {
				this.getUserInfo();
			})
			uni.$on('setpaypwd', res => {
				if (this.isDefaultpass) {
					this.isDefaultpass = false;
				}
				if (this.isshow) {
					this.isshow = false;
				}
			})

		},
		onUnload() {
			uni.$off('updatebalance');
			uni.$off('bindsuc');
			uni.$off("unbind");
			uni.$off('setpaypwd');
		},
		onPullDownRefresh() {
			this.isRefresh = true;
			this.getCardInfo();
			this.getUserInfo();
		}
	}
</script>

<style lang="scss" scoped>
	.u-top-area {
		margin-top: 62rpx;
		height: 246rpx;
		background-image: url(../../static/img/bg_money_lq.png);
		background-size: 100% 100%;
	}

	.u-center-area {
		background-color: #FFFFFF;
		height: 129rpx;
		padding-left: 24rpx;
		border-radius: 4rpx;
		padding-right: 24rpx;
	}
</style>

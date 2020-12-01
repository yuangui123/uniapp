<template>
	<view>
		<u-navbar title="选择银行卡" title-color="#333333">
			<u-row gutter="12" style="width: 100%;">
				<u-col span="9"></u-col>

				<u-col span="3">
					<view @click="rightClick">添加银行卡</view>

				</u-col>
			</u-row>
			<!-- <view style="width: 100%;text-align: end;margin-right: 24rpx;color: #333333;" >添加银行卡</view> -->
		</u-navbar>


		<view>
			<t-nodata v-if="bankCardList.length ==0"></t-nodata>


			<view style="margin: 12px;position: relative;height: 240rpx;display: flex;flex-direction: column;" v-for="(item,i) in bankCardList"
			 @longpress="unbind(item)">
				<view style="position: absolute;z-index: 1;height: 240rpx;width: 100%;">

					<u-image :src="(item.backpic == null || item.backpic == '') ? '/static/img/default_bank_bg.png' : item.backpic"
					 height="100%" width="100%"></u-image>

				</view>

				<view style="position: absolute;z-index: 2;height: 240rpx;width: 100%;">
					<u-row style="padding-top: 30rpx; padding-left: 24rpx;">
						<u-col span="1">
							<u-image :src="(item.logopic == null || item.logopic == '') ? '/static/img/ic_default_bank_logo.png' : item.logopic"
							 shape="circle" style="width: 24px;height: 24px;" src="/static/img/ic_default_bank_logo.png" mode="aspectFill">
								<u-loading slot="loading"></u-loading>
							</u-image>
						</u-col>
						<u-col span="10" style="margin-left: 15px;color: #FFFFFF; font-size: 34upx;">{{item.bankname}}</u-col>
					</u-row>
					<u-row justify="end" style="margin-top: 45rpx; padding-right: 12px;">
						<u-col span="12" style="color: #FFFFFF; font-size: 40upx; " text-align="right">{{item.accountno|handleBankNumber}}</u-col>
					</u-row>

				</view>

				<view @click="continueBind(item)" v-if="item.status== 1 ? true :false" style="background-color: #000000;opacity: 0.4;height: 240rpx;width: 100%;display: flex;justify-content: center;align-items: center;position: absolute;z-index: 3;">
					<u-row>
						<u-col style="color: #FFFFFF;">点击继续完成绑卡</u-col>
					</u-row>
				</view>


			</view>

			<u-modal v-model="isshow" content="是否解绑当前绑定的银行卡" :content-style="{color:'#333333','font-size':'18px'}"
			 :show-cancel-button="true" confirm-color="#2ecc71" @confirm="oncomfirm"></u-modal>

		</view>


	</view>

</template>

<script>
	import {
		getBankList,
		bindBankCardStepFirst
	} from '@/api/payservice.js';
 
	import Vue from 'vue'

	export default {
		data() {
			return {
				bankCardList: [],
				isRefresh: false,
				isshow: false,
				selectitem:null

			}
		},
		methods: {
			t() {
				alert(1)
			},
			getBankCardList() {
				if (!this.isRefresh)
					this.$kami.showLoaded()
				getBankList(0).then(res => {
					if (res.code == 1) {
						this.bankCardList = res.data;
						console.log(this.bankCardList.length);
					}
					if (this.isRefresh) {
						this.isRefresh == false;
						uni.stopPullDownRefresh();
					} else
						this.$kami.hideLoaded()
				})
			},
			rightClick() {
				uni.navigateTo({
					url: './addBankCard'
				})
			},
			continueBind(item) {
				this.$kami.showLoaded()
				let param = {
					accountno: item.accountno,
					mobile: item.mobile,
					bankname: item.bankname
				};
				// uni.navigateTo({
				// 	url:'./accountVerification?khh='+encodeURIComponent(this.model.bank)
				// 	  +'&khm='+ encodeURIComponent(this.model.name)
				// 	  +'&yhzh='+encodeURIComponent(this.model.idcard)
				// 	  +'&identify=111111'
				// })
				bindBankCardStepFirst(param).then(res => {
					if (res.code == 1) {
						let type = res.data.verifyType;
						if (type == 2) {
							uni.navigateTo({
								url: './accountVerification?khh=' + encodeURIComponent(item.bankname) +
									'&khm=' + encodeURIComponent(item.accountname) +
									'&yhzh=' + encodeURIComponent(item.accountno) +
									'&identify' + res.data.identify
							})
						}else if(type == 1){
							uni.navigateTo({
								url:'./verificationCode?identify='+encodeURIComponent(res.data.identify)
								  +'&mobile='+encodeURIComponent(item.mobile)
								  +'&account='+encodeURIComponent(item.accountno)
								  +'&bankname='+encodeURIComponent(item.bankname)
							})
							
							
						} else {
							this.$kami.showKToast({
								content: '未知的验证方式，请联系客服',
								duration: 2
							});
						}
					}

					this.$kami.hideLoaded()
				});


			},
			unbind(item) {
				if (item.status == 2) {
					this.isshow = true;
					this.selectitem = item;
				}	

			},
			oncomfirm() {
				if (this.selectitem != null) {
					if (this.selectitem.status == 2) {
						uni.navigateTo({
							url: './unbindBankCard?accountno=' + this.selectitem.accountno
						})
					}
				}
				
			}

		},
		filters: {
			handleBankNumber(num) {
				if (num != '' && num.length >= 8) {
					return "**** **** **** **** " + num.substring(num.length - 4, num.length);
				}
				return num;
			}
		},
		created() {
			this.getBankCardList();
		},
		onLoad() {
			uni.$on('unbind', res => {
				this.getBankCardList();
			})
			uni.$on('bindsuc',res => {
				this.getBankCardList();
			})
		},
		onUnload() {
			uni.$off('unbind')
			uni.$off('bindsuc')
		},
	 
		onPullDownRefresh() {
			this.isRefresh = true;
			this.getBankCardList();
		}
	}
</script>

<style lang="scss" scoped>
	.bank-card-bg {
		background-image: url(../../static/img/default_bank_bg.png);
	}
</style>

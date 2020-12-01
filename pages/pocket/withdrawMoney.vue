<template>
	<view>
		<view style="background-color: #FFFFFF;margin-top: 24rpx;">
			<u-row gutter="12" style="padding-left: 24rpx;padding-right: 24rpx;height: 98rpx;">
				<u-col span="4">到账银行卡</u-col>
				<u-col span="1"></u-col>
				<u-col span="7" >
					<u-input type="select"  placeholder="请选择银行卡" placeholderStyle="text-align: end;" style="text-align: end;" v-model="selectbankAndNo" :select-open="isselectbank" @click="isselectbank = true"></u-input>
				</u-col>

			</u-row>
			<u-line color="#ededed"></u-line>
			<view style="color: #666666;font-size: 28upx;margin-left: 24rpx;margin-top: 10rpx;">提现金额(10元~5万元)</view>

			<u-row gutter="12" style="padding-left: 24rpx;margin-top: 20rpx;">
				<u-col span="1" style="font-size: 60upx;color: #333333;">¥</u-col>
				<u-col span="10">
					<u-input placeholder-style="font-size: 36upx;color: #999999;" placeholder="请输入提现金额" style="font-size: 60upx;color: #333333;"
					 v-model="withdrawfee" :trim="true"></u-input>
				</u-col>
			</u-row>
			<u-line color="#ededed"></u-line>
			<u-row gutter="12" style="padding: 10rpx;">
				<u-col span="9" style="color: #333333;font-size: 30upx;">可提现余额{{ye}}</u-col>

				<u-col span="3">
					<view style="text-align: end;color: #2ecc71;font-size: 30upx;" @click="all">全部提现</view>
				</u-col>
			</u-row>

		</view>

		<!-- <view style="color: #F45252;margin: 10rpx;font-size: 26upx;">注：当日充值或到账的零钱需24小时提现</view>
 -->
		<u-button type="success" style="margin: 50rpx;" @click="commit">下一步</u-button>

		<u-modal v-model="isshow" :show-confirm-button="false" :show-title="false">
			<view>
				<u-row gutter="12" style="height: 98rpx;">
					<u-col span="1.5"></u-col>
					<u-col span="9" style="text-align: center;color: #333333;font-size: 36upx;">请输入支付密码</u-col>
					<u-col span="1.5">
						<u-icon name="close" @click="onClose"></u-icon>
					</u-col>
				</u-row>
				<u-line color="#ededed"></u-line>
				<view style="text-align: center;color: #333333;font-size: 34upx;margin-top: 30rpx;">提现金额：¥{{withdrawfee}}</view>
				<u-message-input @finish="onfinish" width=70 style="width: 100%;margin-bottom: 60rpx;margin-top: 28rpx;" mode="bottomLine"
				 :maxlength="6" :dot-fill="true" :value="pass"></u-message-input>
			</view>

		</u-modal>

		<u-popup v-model="isselectbank" mode="bottom" border-radius="14" height="60%">
			<u-row gutter="12" style="height: 98rpx;">
				<u-col span="1.5"></u-col>
				<u-col span="9" style="text-align: center;color: #333333;font-size: 36rpx;">选择银行卡</u-col>
				<u-col span="1.5">
					<u-icon name="close" @click="closed"></u-icon>
				</u-col>

			</u-row>
			<u-line color="#2ECC71"></u-line>

			<view @click="selectBank(item,i)" v-for="(item,i) in bankList">
				<u-row gutter="12" style="height: 108rpx;padding-left: 24rpx;padding-right: 24rpx;">
					<u-col span="1">
						<u-image :src="(item.logopic == null || item.logopic == '') ? '/static/img/ic_default_bank_logo.png' : item.logopic"
						 shape="circle" style="width: 24px;height: 24px;" mode="aspectFill">
							<u-loading slot="loading"></u-loading>
						</u-image>

					</u-col>
					<u-col span="9" style="font-size: 30rpx;color: #333333;margin-left: 24rpx;">{{item.bankname| banksplit(item.accountno)}}</u-col>
					<u-col span="1">
						<u-icon size="40" name="/static/img/icon_select.png" v-if="(selectkey == i) ? true :false"></u-icon>
					</u-col>
				</u-row>

				<u-line color="#ededed"></u-line>
			</view>

			<view @click="add">

				<u-row gutter="12" style="height: 98rpx;padding-left: 24rpx;">
					<u-col span="1">
						<u-icon size="40" name="/static/img/icon_add.png"></u-icon>
					</u-col>
					<u-col span="11" style="font-size: 32rpx;color: #333333;">添加银行卡</u-col>
				</u-row>
			</view>

		</u-popup>




	</view>
</template>

<script>
	import {
		verifyOldPassword,
		companyWithdrawDeposit,
		getBalance,
		getBankList
	} from '@/api/payservice.js';
	import {
		setStores,
		getStores,
		isEmpty,
		isPoneAvailable,
		cutChinese
	} from '@/common/utils.js';
	import md5Libs from "uview-ui/libs/function/md5";

	import Vue from 'vue'

	export default {
		data() {
			return {
				withdrawfee: '',
				ye: '',
				isshow: false,
				pass: '',
				identify: '',
				isselectbank: false,
				bankList: [],
				selectkey: 0,
				selectbank: '',
				selectbanmo: '',
				selectbankAndNo:''

			}
		},
		methods: {
			getye() {
				this.$kami.showLoaded()
				getBalance().then(res => {
					if (res.code == 1) {
						this.ye = res.data.balance;
						//console.log(this.ye);
					}
					this.$kami.hideLoaded()
				})
			},
			all() {
				this.withdrawfee = this.ye;
			},
			commit() {
				this.isshow = true;
			},
			onfinish(value) {
				this.$kami.showLoaded()
				let param = {
					paypassword: md5Libs.md5(value),
					bankName: this.selectbank,
					bankNumber: this.selectbanmo,
					money: this.withdrawfee
				}
			//	console.log(value + '---' + md5Libs.md5(value));
				companyWithdrawDeposit(param).then(res => {
					console.log(res.code + "---" + res.data);
					if (res.code == 1) {

						this.isshow = false;
						let item = res.data;
						uni.navigateTo({
							url: './withdrawFinish?withdrawfee=' + item.money + '&bankname=' + item.remark
						})
					} else {

					}
					this.$kami.hideLoaded()
				})
			},

			getBankList() {
				this.$kami.showLoaded()
				getBankList(0).then(res => {
					if (res.code == 1) {
						this.bankList = res.data;
						if (this.bankList.length > 0) {
							this.selectkey = 0;
							this.selectbank = this.bankList[0].bankname;
							this.selectbanmo = this.bankList[0].accountno;
							this.selectbankAndNo = this.selectbank+'('+this.selectbanmo.substring(this.selectbanmo.length-4)+')'
							
						}
					}
					this.$kami.hideLoaded()
				})
			},

			selectBank(item, i) {
				this.isselectbank = false;
				this.selectkey = i;
				this.selectbank = item.bankname;
				this.selectbanmo = item.accountno;
				this.selectbankAndNo = this.selectbank+'('+this.selectbanmo.substring(this.selectbanmo.length-4)+')'
				
				
			},
			closed() {
				this.isselectbank = false;
			},
			add() {
				uni.navigateTo({
					url: './addBankCard'
				})
			},
			onClose(){
				this.isshow = false
			}


		},
		created() {
			this.getye();
			this.getBankList();
		},
		onLoad() {
			uni.$on('bindsuc',res => {
				this.getBankList();
			})
		},
		onUnload() {
			uni.$off('bindsuc')
		},
		filters:{
			banksplit(value,number){
				return value+'('+number.substring(number.length-4)+')'
			}
		}
	}
</script>

<style>
</style>

<template>
	<view style="width: 100%;height: 100%;background-color: #FFFFFF;">
		<u-line color="#ededed"></u-line>

		<view style="text-align: center;margin-top: 80rpx;color: #333333;font-size: 32upx;">验证码已发送至 +{{this.phone}}</view>
		<view style="text-align: center;margin-top: 20rpx;color: #666666;font-size: 24upx;">本次交易需要进行短信确认</view>
		<u-row gutter="12" style="margin-top: 30rpx;margin-left: 25rpx;margin-right: 25rpx;">
			<u-col span="2" style="font-size: 32upx;color: #333333;">验证码</u-col>
			<u-col span="7">
				<u-input maxlength="6" type="number" v-model="yzm" placeholder="请输入验证码" />
			</u-col>
			<u-col span="3">
				<u-verification-code :keep-running="true" :seconds="seconds" ref="uCode" @change="codeChange" :startText="startText"
				 :changeText="changeText" :endText="endText"></u-verification-code>
				<u-button size="mini" type="success" @click="getCode">{{tips}}</u-button>
			</u-col>
		</u-row>
		<u-row gutter="12" style="margin-top: 12rpx;">
			<u-col span="2"></u-col>
			<u-col span="10">
				<u-line color="#ededed"></u-line>
			</u-col>
		</u-row>

		<u-button type="success" style="margin: 70rpx;" @click="onNext">下一步</u-button>

	</view>
</template>

<script>
	import {
		bindBankCardStepFirst,
		bindBankCardStepSecondForSMS
	} from '@/api/payservice.js';
	import {
		setStores,
		getStores,
		isEmpty
	} from '@/common/utils.js';

	import Vue from 'vue'
	export default {
		data() {
			return {
				tips: '',
				seconds: 60,
				refCode: null,
				startText: '获取验证码',
				changeText: 'X秒重新获取',
				endText: '重新获取',

				phone: '',
				account: '',
				identify: '',
				yzm: '',
				bankname:''
			}
		},
		onReady() {
			// 注意这里为错误示例，目前微信小程序最新稳定版开发工具如此
			// 赋值会报错，很诡异，其他端无此问题
			// this.refCode = this.$refs.uCode;
		},
		methods: {
			codeChange(text) {
				// console.log(text);
				this.tips = text;
			},
			getCode() {
				this.$kami.showLoaded()
				let param = {
					accountno: this.account,
					mobile: this.phone,
					bankname: this.bankname
				}
				bindBankCardStepFirst(param).then(res => {
					if (res.code == 1) {
						this.identify = res.data.identify;
						setTimeout(() => {
							uni.hideLoading();
							// 这里此提示会被this.start()方法中的提示覆盖
							this.$u.toast('验证码已发送');
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						}, 2000);
					}
					this.$kami.hideLoaded()

				})

			},
			secondsChange(index) {
				this.seconds = index == 0 ? 60 : index == 1 ? 10 : 5;
			},
			textChange(index) {
				if (index == 0) {
					this.startText = '点一下获取',
						this.changeText = '重新获取Xs',
						this.endText = '再次获取'
				} else {
					this.startText = '获取验证码',
						this.changeText = 'X秒重新获取',
						this.endText = '重新获取'
				}
			},

			reset() {
				this.$refs.uCode.reset();
			},
			onNext() {
				if (isEmpty(this.yzm) || this.yzm.length != 6) {
					this.$kami.showKToast({
						content: '请输入6位验证码',
						duration: 2
					});

					return;
				}
				this.$kami.showLoaded()
				let param = {
					identify: this.identify,
					verifycode: this.yzm
				}
				bindBankCardStepSecondForSMS(param).then(res => {
					if (res.code == 1) {
						uni.$emit('bindsuc');
						uni.navigateTo({
							url: './bindBankCardSuccess'
						})
					}
					this.$kami.hideLoaded()
				})


			}
		},
		onLoad(e) {
			if (e != null) {
				this.identify = decodeURIComponent(e.identify);
				this.account = decodeURIComponent(e.account);
				this.phone = decodeURIComponent(e.mobile);
				this.bankname = decodeURIComponent(e.bankname);
				let reg = /^(\d{3})\d{4}(\d{4})$/;
				if (!isEmpty(this.phone))
					this.phone = this.phone.replace(reg, "$1****$2");

				setTimeout(() => {
					uni.hideLoading();
					// 这里此提示会被this.start()方法中的提示覆盖
					this.$u.toast('验证码已发送');
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
				}, 20);
			}

		}

	}
</script>

<style>
</style>

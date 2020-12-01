<template>
	<view>
		<u-navbar title="修改支付密码"></u-navbar>
		<view style="background-color: #FFFFFF; margin-top: 20upx;margin-bottom: 20upx;">

			<u-row>
				<label style="font-size: 35rpx;padding-left: 15rpx;padding-top: 10rpx;">接收验证码</label>
			</u-row>
			<u-row>
				<label v-model="mobile" style="font-size: 25rpx;padding-left: 15rpx;padding-bottom: 10rpx; color: #999999;">已发送验证码到手机{{mobile}}</label>
			</u-row>
			<u-row gutter="12" style="padding-bottom: 40upx;">
				<!-- <u-col span="0.3"></u-col> -->
				<u-input span="5" style="margin-left: 15upx;" v-model="code" type="number"  maxlength="6" placeholder="请输入验证码" :border="true" />
				<u-col span="1"></u-col>
				<!-- <u-button style="background-color:#00CD79; color: #FFFFFF;" size="default" @click="getCode">获取验证码</u-button> -->
				<u-col span="4">
					<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
					<u-button @tap="getCode">{{tips}}</u-button>
				</u-col>


				<u-col span="1"></u-col>

			</u-row>

		</view>
		<u-row gutter="12">
			<u-col span="1"></u-col>
			<u-col span="10" style="padding-top: 180upx;">
				<u-button style="background-color:#00CD79; color: #FFFFFF;" type="success" shape="circle" @click="nextclick">下一步</u-button>
			</u-col>
			<u-col span="1"></u-col>
		</u-row>

	</view>
</template>

<script>
	import {
		getSendsms2
	} from '@/api/feedBackList.js'
	import {
		verifysmscode
	} from '@/api/feedBackList.js'
	import {
		login,
		regist,
		smsSend,
		smsLogin
	} from '@/api/login.js'
	import {
		setStores,
		getStores,
		isEmpty,
		isPoneAvailable,
		cutChinese
	} from '@/common/utils.js';
	import wechat from '@/common/wechat.js'

	var wx = require('jweixin-module')

	import Vue from 'vue'
	export default {
		data() {
			return {
				tips: '获取验证码',
				// refCode: null,
				seconds: 60,
				code: '',
				mobile: '',
				identify: ''
			};
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
				let $this = this;

				// this.smsInterval();
				let param = {
					"mobile": this.mobile,
					"apptype": '44'

				};
				

				getSendsms2(param).then(res => {
					//只处理 code=1的结果  code等于其他会自动弹出错误提示框  
					console.log('code:'+res.code);
					if (res.code == 1) {
					
						setTimeout(() => {
							uni.hideLoading();
							// 这里此提示会被this.start()方法中的提示覆盖
							this.$u.toast('验证码已发送');
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						}, 2000);

					}

				})
				}
			},
			nextclick() {
				// 验证验证码
				let param = {
					"smscode": this.code
				}


				verifysmscode(param).then(res => {

					//	console.log(res)
					//只处理 code=1的结果  code等于其他会自动弹出错误提示框  
					if (res.code == 1) {
						this.identify = res.data.identify;
						console.log('idd=' + this.identify)
						uni.navigateTo({
							url: 'settingPassword?identify=' + this.identify
							// url:'settingPassword'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
					}

				})

			},
			onLoad: function(e) {
				//页面创建完毕 调用的函数
				this.$this = this;
				let user = getStores('users');
				this.mobile = user.mobile;
				//console.log(this.mobile);
			}

		}
	};
</script>

<style>
</style>

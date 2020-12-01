<template>
	<view>
		<u-navbar title="修改支付密码" />
		<u-row justify="center" style="margin-top: 50rpx;"><label style="font-size: 35upx;">请设置支付密码，用于支付验证</label></u-row>
		<u-row gutter="12" justify="center">
			<u-col span="12"><u-message-input v-model="password" :focus="true" :breathe="true" :dot-fill="true" :maxlength="6" @finish="finish"></u-message-input></u-col>
		</u-row>

		<u-row justify="center" style="margin-top: 50rpx;"><label style="font-size: 35upx;color: #666666;">注：不能是123456或连续数字</label></u-row>
	</view>
</template>

<script>
import { Updatepaypass } from '@/api/feedBackList.js';
import { login, regist, smsSend, smsLogin } from '@/api/login.js';
import wechat from '@/common/wechat.js';
import md5Libs from 'uview-ui/libs/function/md5';
var wx = require('jweixin-module');

import Vue from 'vue';
export default {
	data() {
		return {
			identify: '',
			// password: ''
		};
	},
	methods: {
		finish(e) {

			let param = {
				password: e, //短信验证
				identify: this.identify, //唯一标识

			};
            console.log('param:'+param)
			
			uni.navigateTo({
				url: 'settingPasswordAgain?passWord='+ e +'&identify=' +param.identify
				
			});
			
		}
	},
	onLoad: function(e) {
		console.log('identify:'+e.identify);

		this.identify = e.identify;
	}
};
</script>

<style></style>

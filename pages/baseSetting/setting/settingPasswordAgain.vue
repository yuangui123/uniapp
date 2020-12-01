<template>
	<view>
		<u-navbar title="修改支付密码" />
		<u-row justify="center" style="margin-top: 50rpx;"><label style="font-size: 35upx;">请再次输入，以确认支付密码</label></u-row>
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
			passWord: '',
		};
	},
	methods: {
		finish(e) {
			if(this.passWord==e){
				let param = {
					type: '1', //短信验证
					identify: this.identify, //唯一标识
					newpass: md5Libs.md5(e)
				};
				console.log('param:'+param)
				Updatepaypass(param).then(res => {
					//只处理 code=1的结果  code等于其他会自动弹出错误提示框
					console.log(res);
					if (res.code == 1) {
						// $this.list = res.data.list
						// uni.redirectTo({
						// 	url: './baseSetting'
						// });
						uni.showToast({
								icon:'none',
								title:'修改成功'
							})
						uni.$emit('setpaypwd');
						avascript:history.go(-3)
						
					}
					
				});
			}else{
				uni.showToast({
					
						icon:'none',
						title:'请确认两次密码输入一致'
					})
			}
			
		}
	},
	onLoad: function(e) {
		console.log('identify:'+e.identify);

		this.identify = e.identify;
		this.passWord = e.passWord;
	}
};
</script>

<style></style>

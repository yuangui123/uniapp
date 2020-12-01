<template>
	<view >
		<view><u-navbar :is-back="true" title="忘记密码"></u-navbar></view>
		<view style="padding:50upx 30upx;">

			<view>
				<u-row gutter="12">
					<u-col span="12">  
					<u-input  type="number" v-model="phoneNum" :border="border" maxlength="11" placeholder="请输入手机号码" />
					</u-col>
					 
				</u-row>
				<u-row gutter="12">
					<u-col span="9"><u-input type="number" :border="border" placeholder="请输入验证码" v-model="yzm"></u-input></u-col>
					<u-col span="3">
						<!-- <span style="color:#19be6b;" @click="getCode">发送验证码</span> -->
						<u-button type="success" size="mini" @tap="getCode">{{ tips }}</u-button>
					</u-col>
				</u-row>
			</view>
			<u-row gutter="12">
				<u-col span="12">  
				 <u-input :type="type1" :border="border" :password-icon="passwordIcon" placeholder="请输入新密码" v-model="password1" />
				</u-col>
			</u-row>
			<u-row gutter="12">
				<u-col span="12">  
				 <u-input :type="type1" :border="border" placeholder="请输入确认密码" v-model="password2" />
				</u-col>
			</u-row>
			
		</view>
		<u-row gutter="12">
			<u-col span="1"></u-col>
			<u-col span="10" style="padding-top: 80upx;"><u-button type="success" shape="circle" @click="loginUp">保存修改</u-button></u-col>
			<u-col span="1"></u-col>
		</u-row>
		<view>
			<u-toast ref="uToast"></u-toast>
			<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
		</view>
		<u-toast ref="uToast1" />
	</view>
</template>
<script>
import { getSendsms, changeLoginPassWord, LoginPassWord } from '../api/feedBackList.js';
import md5Libs from 'uview-ui/libs/function/md5';
export default {
	data() {
		return {
			yzm: '',
			phoneNum: '',
			type: 'text',
			passwordIcon: true,
			value: '',
			type1: 'password',
			border: false,
			tips: '',
			seconds: 60,
			password1: '',
			password2: ''
		};
	},
	methods: {
		LoginPassWord() {
	 

			if (this.password1 != this.password2) {
				uni.showToast({
					icon: 'none',
					title: '两次输入密码不一致'
				});
				return;
			}

			let param = {
				mobile: this.phoneNum,
				yzm: this.yzm,
				password: md5Libs.md5(this.password1)
			};

			LoginPassWord(param).then(res => {
				if (res.code == 1) {
			  this.$refs.uToast1.show({
			      	icon: 'success',
			      	title: '修改成功',
					url: '/pages/login'
			      });
				}
			});
		},
 
		loginUp() {
			this.LoginPassWord();

		},
		codeChange(text) {
			this.tips = text;
		},
		codeChange(text) {
			this.tips = text;
		},
		getCode() {
			uni.showLoading({
				title: '正在获取验证码'
			})
			let  $this = this;
				
			if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
				uni.hideLoading();
				this.$refs.uToast.show({
					title: '手机号输入有误！',
					type: 'error '
				});
				return false;
			}
			let param = {
				type: 6,
				mobile: this.phoneNum,
				apptype: '44'
			};
			
			if (this.$refs.uCode.canGetCode) {
				 
				 
				 getSendsms(param).then(res => {
				 	uni.hideLoading();
				 	
				 	if (res.code == 1) {
				 		$this.$refs.uToast.show({
				 			title: '验证码已发送！',
				 			type: 'success  '
				 		});
				 		
				 		$this.$refs.uCode.start();
				 	}
				 });
				 
				 
			} else {
				$this.$u.toast('倒计时结束后再发送');
			}
		},
		end() {
			//this.$u.toast('倒计时结束');
		},
		start() {
			//this.$u.toast('倒计时开始');
		}
	}
};
</script>

<style></style>

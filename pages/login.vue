<template>
	<view>
		<u-row gutter="12"><u-col span="12" style="font-size: 52upx;font-weight: 600;margin-bottom: 48px;padding-top: 160upx;text-align: center;">欢迎登录旭油宝服务</u-col></u-row>

		<view v-show="activeType == 1">
			<u-row gutter="12">
				<u-col span="1"></u-col>
				<u-col span="10">
					<u-field type="number" v-model="phone" label="手机号" required placeholder="请输入手机号"  maxlength="11"  ></u-field>
					<u-field type="number" v-model="code" label="验证码" required placeholder="请输入验证码" >
						<u-button size="mini" slot="right" type="success" @click="getCode" v-model="yzm">{{ yzm }}</u-button>
						<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
					</u-field>
				</u-col>
				<u-col span="1"></u-col>
			</u-row>
		</view>
		<view v-show="activeType == 2">
			<u-row gutter="12">
				<u-col span="1"></u-col>
				<u-col span="10">
					<u-field type="number" v-model="mobile" required label="会员号" placeholder="请输入会员号"  ></u-field>

					<u-field v-model="password" required label="密码" placeholder="请输入密码" :type="password1"  maxlength="25" right-icon="eye-fill"   
					  @right-icon-click="iconclick">
						
					</u-field>
					<!-- @click="show4 = true" -->
				</u-col>
				<u-col span="1"></u-col>
			</u-row>
		</view>

		<u-row gutter="12">
			<u-col span="1"></u-col>
			<u-col span="10" style="padding-top: 80upx;"><u-button type="success" shape="circle" @click="loginUp">登录</u-button></u-col>
			<u-col span="1"></u-col>
		</u-row>
		<u-row gutter="12" v-if="activeType == 2" style="padding-top:50upx;padding-left: 80upx; color: #19be6b;">
			<u-col span="4"><view @click="codeChange">验证码登录</view></u-col>
			<u-col span="4"></u-col>
			<u-col span="4"><view style="color:#19be6b;" @click="toPagePassword">忘记密码？</view></u-col>
		</u-row>
		<u-row gutter="12" v-if="activeType == 1">
			<u-col span="12" style="color:#19be6b;padding-top:50upx; padding-left: 80upx;"><view @click="codeChange">密码登录</view></u-col>
		</u-row>
		<u-keyboard ref="uKeyboard" v-model="show" @change="vaalChange" @backspace="backspace"></u-keyboard>
		<u-keyboard ref="uKeyboard" v-model="show2" @change="yzmclick" @backspace="backspaceyzm"></u-keyboard>
		<u-keyboard ref="uKeyboard" v-model="show3" @change="mobileclick" @backspace="backspacemobile"></u-keyboard>
		<!-- <u-keyboard ref="uKeyboard" v-model="show4" @change="passwordclick" @backspace="backspacepassword"></u-keyboard> -->
	</view>
</template>

<script>
import { login, regist, smsSend, smsLogin } from '@/api/login.js';
import { generateKey, decryptSecretKey } from '@/api/secret.js';
import { decodeBase64, decodeBase64AndDecryptWith3Des, produceSessionKey, addSecret } from '@/common/secret.js';
import { setStores, getStores, isEmpty, isPoneAvailable, cutChinese } from '@/common/utils.js';
import {  BaseApiUrl } from '@/common/enum/api.ts'
import {queryOilstationinfo} from '@/api/oil_station.js'

import request from '@/common/requests.js';
import Vue from 'vue';

export default {
	data() {
		return {
			show3: false,
			show1: false,
			show2: false,
			value: '',
			show: false,
			passwordIcon: true,
			activeType: 1,
			codeText: '',
			// ***********页面参数*************
			yzm: '获取验证码',
			phone: '',
			code: '',
			mobile: '',
			password: '',
			password1:'password',
			smsLock: true
		};
	},
	methods: {
		iconclick(){
		if(this.password1=="password"){
			this.password1="text";
		}else{
			this.password1="password"
		}
		},
		backspacemobile() {
			if (this.mobile.length) this.mobile = this.mobile.substr(0, this.mobile.length - 1);
			console.log(this.mobile);
		},
		backspace() {
			if (this.phone.length) this.phone = this.phone.substr(0, this.phone.length - 1);
			console.log(this.phone);
		},
		backspaceyzm() {
			if (this.code.length) this.code = this.code.substr(0, this.code.length - 1);
			console.log(this.code);
		},
		mobileclick(val) {
			if (this.mobile.length >= 6) {
				return;
			}
			this.mobile += val;
		},
		vaalChange(val) {
			if (this.phone.length >= 11) {
				return;
			}
			this.phone += val;
			// console.log(this.phone);
		},
		yzmclick(val) {
			if (this.code.length >= 6) {
				return;
			}
			this.code += val;
		},
		//忘记密码
		toPagePassword() {
			uni.navigateTo({
				url: '/pages/password'
			});
		},
		// 登陆
		loginUp() {
			let param = {
				tjid: this.activeType == 2 ? this.mobile : this.phone,
				password: this.activeType == 2 ? this.password : this.code,
				logintype: this.activeType == 2 ? 1 : 2
			};
			let generateParam = this.activeType == 2 ? param : { tel: param.tjid, tjid: '' };
			// 	// 加密生成公钥请求
			generateKey(generateParam).then(res => {
				if (res.code == 1) {
					let sessionkey = res.data.ss;
					param['publickey'] = res.data.ps;
					if (this.activeType != 2) {
						generateParam.tjid = res.data.tjid;
					}
					// 登陆请求
					login(param).then(result => {
						if (result.code == 1) {
							let info = result.data.info;
							decryptSecretKey({
								tjid: this.activeType == 2 ? param.tjid : generateParam.tjid,
								sessionkey: sessionkey,
								secretKey: result.data.secretkey
							}).then(rs => {
								if (rs.code == 1) {
									// 揭秘
									this.resolveData(sessionkey, rs.data, info, 2);
									queryOilstationinfo({}).then(res => {
										setStores('station',res.data);
									})
								}
								// this.changeLoading(false)
							});
						} else {
							let msg = result.msg;
							if (msg.indexOf('"') != -1) {
								msg = JSON.parse(result.msg);
								this.$kami.showKToast({ content: msg.detailMsg });
							}
							// this.changeLoading(false)
						}
					});
				} else {
				}
			});
		},

		// 解析并处理加密数据
		resolveData(sessionkey, data, info, type) {
			sessionkey = decodeBase64AndDecryptWith3Des(sessionkey, data);
			let decoded = decodeBase64(info);
			let plainInfo = decodeBase64AndDecryptWith3Des(produceSessionKey(sessionkey), decoded);
			let plainObj = JSON.parse(plainInfo);
			plainObj.sessionkey = sessionkey;
			setStores('users', plainObj);
			setStores('location-host',BaseApiUrl.serverapp)
			if (type == 1) {
				setStores('isFirst', plainObj.isfirstlogin + '');
			}
			this.$cookies.set('sessionId', plainObj.sessionid);
			this.$cookies.set('sessionKey', sessionkey);
			uni.redirectTo({
				url: '/pages/index'
			});
		},

		smsInterval() {
			this.yzm = 60;
			this.intervalSms = setInterval(() => {
				if (this.yzm == 0) {
					this.smsLock = true;
					clearInterval(this.intervalSms);
					this.yzm = '获取验证码';
				} else {
					this.yzm--;
				}
			}, 1000);
		},
		// 发送短信
		getCode() {
			/**
			 * 发短信后smsLock为true
			 * 禁止重复请求
			 */
			if (this.smsLock) {
				if (isEmpty(this.phone) || !isPoneAvailable(this.phone)) {
					this.$kami.showKToast({
						content: '请输入正确的手机号',
						duration: 2
					});
					return;
				}
				/**
				 * type: 短信类型 9 为公众号
				 * mobile: 手机号
				 * apptype: 类型 3 为客户端
				 */
				let param = {
					type: 9,
					mobile: this.phone,
					apptype: '44'
				};
				// 请求
				smsSend(param).then(res => {
					if (res.code == 1) {
						this.$kami.showKToast({ content: res.msg });
						this.smsLock = false;
						this.smsInterval();
					} else {
						this.$kami.showKToast({ content: res.msg });
					}
				});
			}
		},

		codeChange() {
			if (this.activeType == 1) {
				this.activeType = 2;
			} else if (this.activeType == 2) {
				this.activeType = 1;
			}
		}
		// getCode() {
		// 	if (this.$refs.uCode.canGetCode) {
		// 		// 模拟向后端请求验证码
		// 		uni.showLoading({
		// 			title: '正在获取验证码'
		// 		});
		// 		setTimeout(() => {
		// 			uni.hideLoading();
		// 			// 通知验证码组件内部开始倒计时
		// 			this.$refs.uCode.start();
		// 		}, 1000);
		// 	} else {
		// 		this.$u.toast('倒计时结束后再发送');
		// 	}
		// }
	}
};
</script>

<style></style>

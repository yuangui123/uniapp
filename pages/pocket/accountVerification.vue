<template>
	<view>
		<view style="background-color: #FFFFFF;">
			<view style="padding: 15rpx;color: #333333;font-size: 26upx;">
				天骄账户已向你以下银行卡转入一笔随机数目的确认金额，请查询银行收支明细后正确填写。请勿随意填写金额，输入错误，该银行账户24小时内将无法继续验证。
			</view>
			<u-line color="#ededed"></u-line>
			<u-row class="u-box" gutter="12">
				<u-col span="3" class="u-left-text">开 户 名</u-col>
				<u-col span="9" class="u-left-text">{{accountname}}</u-col>
			</u-row>
			<u-line color="#ededed"></u-line>
			<u-row class="u-box" gutter="12">
				<u-col span="3" class="u-left-text">银行账号</u-col>
				<u-col span="9" class="u-left-text">{{bankaccount}}</u-col>
			</u-row>
			<u-line color="#ededed"></u-line>
			<u-row class="u-box" gutter="12">
				<u-col span="3" class="u-left-text">开 户 行</u-col>
				<u-col span="9" class="u-left-text">{{bankname}}</u-col>
			</u-row>
			<u-line color="#ededed"></u-line>
			<u-row class="u-box" gutter="12">
				<u-col span="3" class="u-left-text">确认金额</u-col>
				<u-col span="8">
					<u-input :trim='true' v-model="money" class="u-left-text" placeholder="银行卡收到的金额" placeholder-style="color:#999999"
					 type="number"></u-input>

				</u-col>
				<u-col span="1" class="u-left-text">元</u-col>

			</u-row>
		</view>
		
		<u-button style="font-size: 32upx;color: #FFFFFF;margin: 60rpx;" type="success" @click="commmit">提交验证</u-button>
		

		<!-- <u-row style="margin-top: 60rpx;margin-left: 40rpx;margin-right: 40rpx;" gutter="12">
			<u-col span="5.5">
			</u-col>
			<u-col span="1"></u-col>
			<u-col span="5.5">
				<u-button style="font-size: 32upx;color: #333333;">返回</u-button>
			</u-col> 
		</u-row> -->
		
		<u-modal @confirm="comfirmClick" v-model="isshow" :content="'确认金额输入错误5次，该银行账号24小时内将不能继续认证，请仔细核对金额后再提交！\n\n确认金额：'
                        + this.money + '元'" confirm-color="#2ecc71" :show-cancel-button="true"></u-modal>


	</view>


</template>

<script>
	import {
		bindBankCardStepFirst,
		bindBankCardStepSecond
	} from '@/api/payservice.js';
	import { setStores, getStores, isEmpty, isPoneAvailable, cutChinese } from '@/common/utils.js';
	
	import Vue from 'vue'
	export default {
		data() {
			return {
				accountname: '',
				bankname: '',
				bankaccount: '',
				money: '',
				identify:'',
				isshow: false
				
				
			}

		},
		methods:{
			commmit(){
				this.isshow = true;
				
			},
			comfirmClick(){
				if (isEmpty(this.money)) {
					this.$kami.showKToast({
						content: '请输入银行卡收到的金额',
						duration: 2
					});
					return;
				}
				this.$kami.showLoaded()
				let param = {
					identify: this.identify,
					yamt : this.money
				}
				
				bindBankCardStepSecond(param).then(res => {
					if (res.code == 1) {
						uni.$emit('bindsuc');
						uni.navigateTo({
							url:'./bindBankCardSuccess'
						})
					}
					this.$kami.hideLoaded()
				})
			}
			
		},
		onLoad(e) {
            if (e != null) {
            	this.bankname = decodeURIComponent(e.khh);
            	this.accountname = decodeURIComponent(e.khm);
            	this.bankaccount = decodeURIComponent(e.yhzh);
				this.identify = decodeURIComponent(e.identify);
				
				
            }
			
		}
	}
</script>

<style>
	.u-left-text {
		color: #333333;
		font-size: 28upx;
	}

	.u-box {
		height: 98rpx;
		color: #333333;
		padding-left: 12px;
		padding-right: 12px;
	}
</style>

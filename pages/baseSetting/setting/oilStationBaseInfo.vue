<template>
	<view>
		<u-navbar title="基本资料"></u-navbar>
		<view style="padding-top: 30rpx;"></view>
		
		<u-row gutter="12" style="background-color: #FFFFFF;padding-top: 20upx;">
			<u-col span="3">
				<label style="font-size: 30upx;padding-left: 15upx;color: #999999;">油站名称：</label>
			</u-col>
			<u-col span="9">
				<label  style="font-size: 30upx;">{{infoData.name}}</label>
				</u-col>
		</u-row>
		<u-row gutter="12" style="background-color: #FFFFFF;padding-bottom: 10upx;">
			<u-col span="3">
				<label style="font-size: 30upx;padding-left: 15upx;color: #999999;">营业执照：</label>
			</u-col>
			<u-col span="9">
				<label  style="font-size: 30upx;">{{infoData.businesSlicense}}</label>
				</u-col>
		</u-row>
		
		
		<u-row gutter="12" style="background-color: #FFFFFF;padding-bottom: 10upx;">
			<u-col span="3">
				<label style="font-size: 30upx;padding-left: 15upx;color: #999999;">移动电话：</label>
			</u-col>
			<u-col span="9">
				<label  style="font-size: 30upx;">{{infoData.mobile}}</label>
				</u-col>
		</u-row>
		
		<u-row gutter="12" style="background-color: #FFFFFF;padding-bottom: 10upx;">
			<u-col span="3">
				<label style="font-size: 30upx;padding-left: 15upx;color: #999999;">经营地址：</label>
			</u-col>
			<u-col span="9">
				<label  style="font-size: 30upx;">{{infoData.address}}</label>
				</u-col>
		</u-row>

		<u-row gutter="12" style="background-color: #FFFFFF;padding-bottom: 50upx;">
			<u-col span="3">
				<label style="font-size: 30upx;padding-left: 15upx;color: #999999;">营业时间：</label>
			</u-col>
			<u-col span="9">
				<label  style="font-size: 30upx;">{{infoData.servicestime}}</label>
				</u-col>
		</u-row>

	</view>
</template>

<script>
import {queryOilstationinfo} from '@/api/oil_station.js'
import { login, regist, smsSend, smsLogin } from '@/api/login.js'
import wechat from '@/common/wechat.js'

var wx = require('jweixin-module')

import Vue from 'vue'	
	export default {
	
		data() {
			return {
				list: [],
				infoData: { 
				"name":'',
				"businesSlicense": '',
			    "mobile": '',
			    "address": '',
				"servicestime":''
			},
			};
		},
		methods:{
			getInfo() {
				let $this = this;
				// debugger
				
				queryOilstationinfo().then(res => {
					//只处理 code=1的结果  code等于其他会自动弹出错误提示框  
					console.log(res)
					if(res.code==1){
						$this.infoData = res.data
						console.log(res)
					}
					 
				})
				
				
			},
		},
	
		created() {
			//页面创建完毕 调用的函数
			this.getInfo();
		}
	};
</script>

<style></style>


<template>
	<view>
		<view class="Toppage" style="background-color: #00cd79;">
			<view  @click="rightclick">
			<u-row gutter="12">
				<u-col span="11" style="color: #FFFFFF;font-size: 35upx;padding: 30upx 20upx;">
					{{ name }}
				</u-col>
				<u-col span="1"><u-icon name="arrow-right" size="35" style="color:#fff"></u-icon></u-col>
			</u-row>
			</view>
			<u-row gutter="12"><u-col span="12" text-align="center" style="font-size: 40upx;color: #FFFFFF;">今日总收入</u-col></u-row>
			<u-row gutter="12">
				<u-col span="12" text-align="center" style="color: #ffffff;height: 200upx;">
					<span style="font-size: 24px;">￥</span><span style="font-size: 30px;font-weight: bold;">{{ sumMoney }}</span>
				</u-col>
			</u-row>
		</view>
		<view>
			<u-row >
				<u-col span="5" style="color: #9F8069;font-size: 40upx;"  >
					<view @click="shoukuan">
					<u-row justify="center" >收款笔数</u-row>
					<u-row justify="center">{{ incomeCount }}</u-row></view>
				</u-col>
				<u-col span="2" style="font-size: 70upx;font-weight: lighter;color: #9F9180;padding-left: 68upx;">|</u-col>
				<u-col span="5" style="color: #9F8069;font-size: 40upx;">
					<view @click="tuikuan">
						<u-row justify="center">退款笔数</u-row>
						<u-row justify="center">{{ expensesCount }}</u-row>
					</view>
				</u-col>
			</u-row>
		</view>
		<view>
			<u-grid :col="3">
				<u-grid-item @click="toPayCollection">
					<u-icon  name="/static/scan_fill.png" :size="46"></u-icon>
					<view class="grid-text">扫码收款</view>
				</u-grid-item>
				<u-grid-item @click="oilOrder">
					<u-icon name="/static/order_fill.png" :size="46" color="#00cd79"></u-icon>
					<view class="grid-text">加油订单</view>
				</u-grid-item>
				<u-grid-item @click="shiftsclick">
					<u-icon name="/static/shifts_fill.png" :size="46"></u-icon>
					<view class="grid-text">换班管理</view>
				</u-grid-item>
				<u-grid-item @click="gridclick">
					<u-icon name="/static/statistics_fill.png" :size="46"></u-icon>
					<view class="grid-text">经营统计</view>
				</u-grid-item>
				<u-grid-item @click="toLooseChange">
					<u-icon name="/static/purse_fill.png" :size="46"></u-icon>
					<view class="grid-text">我的零钱</view>
				</u-grid-item>
				<u-grid-item @click="setupclick">
					<u-icon  name="/static/setup_fill.png" :size="46" color="#00cd79"></u-icon>
					<view class="grid-text">基础设置</view>
				</u-grid-item>
				<u-grid-item @click="logOut">
					<u-icon  name="/static/log_out.png" :size="46" color="#00cd79"></u-icon>
					<view class="grid-text">退出登陆</view>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>
<script type="text/javascript" src="https://v1.cnzz.com/z_stat.php?id=1279389189&web_id=1279389189"></script>
<script>
import { setStores, getStores, isEmpty, isPoneAvailable, cutChinese } from '@/common/utils.js';

import { getIndexData } from '@/api/oil_station.js';
import wechat from '@/common/wechat.js';
import {  reLogin } from '@/api/user.js'

var wx = require('jweixin-module');
export default {
	data() {
		return {
			name: '',
			sumMoney: '0',
			incomeCount: '0',
			expensesCount: '0',
			isRefresh: false
		};
	},
	onPullDownRefresh() {
		this.isRefresh = true;
		this.getIndexData();
	},
	onLoad() {
		// this.name = getStores('station').name;
	},
	methods: {
		// 退出
		logOut() {
			reLogin(false)
		},
		toPayCollection(){
			wechat.onConfig({
			  apiList: ['scanQRCode'],
			  success: () => {
				
				wx.scanQRCode({
				  needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				  scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
				  success: function (res) {
				 var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
				 uni.navigateTo({
				  url: '/pages/payCollection?code='+result
				 });
				  }
				}); 
	      },
	      error: (e) => {
	        uni.showToast({
	         icon:'none',
	         title:'请重试'
	        })
	      }
	    })
	   },
		getIndexData() {
			
			let $this = this;
			let user = getStores('users');
			this.name = user.name;
			this.sumMoney = '0';
			this.incomeCount = '0'
			this.expensesCount = '0';
			getIndexData({}).then(res => {
				if (this.isRefresh) {
					this.isRefresh = false;
					uni.stopPullDownRefresh();
				}
				//只处理 code=1的结果  code等于其他会自动弹出错误提示框
				if ((res.code = 1)) {
					console.log(res)
					//sumMoney=今日总收入，incomeCount=收款总笔数，expensesCount=退款总比数
					$this.sumMoney = res.data.sumMoney;
					$this.incomeCount = res.data.incomeCount;
					$this.expensesCount = res.data.expensesCount;
				}
			});
		},
		shoukuan(){
			// uni.navigateTo({
			// 	url: '/pages/oilOrder/oilOrder'
			// });
		},
		tuikuan(){
			// uni.navigateTo({
			// 	url: '/pages/oilOrder/oilOrder'
			// });
		},
		oilOrder() {
			uni.navigateTo({
				url: '/pages/oilOrder/oilOrder'
			});
		},
		// payCollectionclick(){
		// 	uni.navigateTo({
		// 		url: '/pages/payCollection'
		// 	});
		// },
		rightclick() {
			uni.navigateTo({
				url: 'baseSetting/setting/oilStationBaseInfo'
			});
		},
		gridclick() {
			uni.navigateTo({
				url: '/pages/grid'
			});
		},
		shiftsclick() {
			uni.navigateTo({
				url: '/pages/shifts'
			});
		},
		setupclick() {
			uni.navigateTo({
				url: '/pages/baseSetting/setting/baseSetting'
			});
		},

		toLooseChange() {
			uni.navigateTo({
				url: '/pages/pocket/loose_change'
			});
		}
	},
	activated(){
		this.getIndexData();
		this.name = getStores('station').name;
	},
	created() {
		this.getIndexData();
		this.name = getStores('station').name;
	}
};
</script>

<style>
.grid-text {
	font-size: 28rpx;
	margin-top: 4rpx;
	color: $u-type-info;
}
</style>

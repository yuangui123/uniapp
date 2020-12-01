<template>
	<view style="" click="aaaa">
		<view style=""><u-navbar :is-back="true" title="当前班次统计"></u-navbar></view>

		
		<view style=" background-color: #FFFFFF;" @click="clickdetails">
			<u-row gutter="12" style="padding-top: 50upx;">
				<u-col span="12"></u-col>
			</u-row>
			<u-row gutter="12">
				<u-col span="1"></u-col>
				<u-col span="3">开始时间：</u-col>
				<u-col span="6">{{ shift.starttimeStr }}</u-col>
				<u-col span="2"><u-icon name="arrow-right" size="30" color="#4c4259"></u-icon></u-col>
			</u-row>
			<u-row gutter="12" style="padding-top: 20upx;">
				<u-col span="1"></u-col>
				<u-col span="3">结束时间：</u-col>
				<u-col span="8">-</u-col>
			</u-row>

			<u-row gutter="12" style="padding-top: 20upx;">
				<u-col span="1"></u-col>
				<u-col span="3">订单总数：</u-col>
				<u-col span="8">{{ shift.totalcount }}</u-col>
			</u-row>
			<u-row gutter="12" style="padding-top: 20upx;">
				<u-col span="1"></u-col>
				<u-col span="3">交易金额：</u-col>
				<u-col span="8">{{ shift.originalsum }}</u-col>
			</u-row>
			<u-row gutter="12" style="padding-top: 50upx;">
				<u-col span="12"></u-col>
			</u-row>
		</view>
		<view>
			<u-modal @confirm="confirm" title="换班确认" :show-title="true" v-model="show" :content="content" :show-cancel-button="true"></u-modal>
			<u-row gutter="12" style="padding-top: 40%;" justify="center">
				<u-col span=""><u-button type="success"  size="medium"  class="hbnt" @click="open">换班</u-button></u-col>
			</u-row>
		</view>
		<view @click="bottomclick">
			<u-row gutter="12" justify="center" style="padding-top: 50upx;color: #00D17B;text-decoration:underline; ">
				<u-col span="12" text-align="center">查看换班记录</u-col>
			</u-row>
		</view>
		<t-copyright></t-copyright>
	</view>
</template>

<script>
import { getshifts, getshiftsbutton } from '@/api/oil_station.js';
import { formatDateTime } from '@/common/utils.js';

export default {
	data() {
		// shift:[]
		return {
			isRefresh: false,
			shift: {
				starttime: '',
				starttimeStr: '',
				totalcount: '',
				originalsum: ''
			},
			show: false,
			content: '是否确认结束当前班次?'
		};
	},
	onPullDownRefresh() {
		this.page = 1;
		this.isRefresh = true;
		this.getshifts();
	},

	methods: {
		getshifts() {
			this.$this = this;
			getshifts().then(res => {
				if ((res.code = 1)) {
					if (this.isRefresh) {
						this.isRefresh = false;
						uni.stopPullDownRefresh();
					}
					console.log(res);
					//转时间格式
					this.shift.starttime = res.data.starttime
					this.shift.starttimeStr = formatDateTime(new Date(parseInt(res.data.starttime)), 'all');
					this.shift.totalcount = res.data.totalcount;
					this.shift.originalsum = res.data.originalsum;
					this.isLoadMore = false;
				}
			});
		},
		bottomclick() {
			uni.navigateTo({
				url: '/pages/relief'
			});
		},
		open() {
			this.show = true;
		},
		confirm() {
			let $this = this;
			getshiftsbutton().then(res => {
				if ((res.code = 1)) {
					// var myDate = new Date().getTime();
					uni.showToast({
						icon: 'success',
						title: '换班成功'
					});
				}
				this.getshifts();
			});
		},
		clickdetails() {
			uni.navigateTo({
				// { url: "../articleDetail/articleDetail?title=" + title + "&mid=" + this.data.mid + "&id=" + id + "&url=" +encodeUrl });
				url: '/pages/details?s=' + this.shift.starttime
			});
		},

		change(e) {
			console.log(e);
			this.dataType.startTimeStr = e.startDate;
			this.dataType.endTimeStr = e.endDate;
		}
	},

	created() {
		//页面创建完毕 调用的函数 本地时间把 toLocaleDateString Date 对象的日期部分转换为字符串:
		this.getshifts();
		var date = new Date();
		//this.shift.starttime = '搜索’'
	}
};
</script>

<style>
	
	.hbnt{
		width: 180px;
		height: 44px;
	} 
</style>

<template>
	<view>
		<u-navbar title="反馈记录"></u-navbar>
		<t-nodata v-if="list.length == 0"></t-nodata>

		<view v-for="(item, index) in list" :key="index">
			<view class="wrap" style="margin-top: 15rpx;" @click="intoInfo(item)">
				<u-row style="background-color: #FFFFFF;">
					<u-col span="3"><label style="color: #999999;">反馈类型：</label></u-col>

					<u-col span="9"><view class="demo-layout bg-purple-light" v-html="item.feedbacktype"></view></u-col>
				</u-row>

				<u-row style="background-color: #FFFFFF;">
					<u-col span="3"><label style="color: #999999;">详细描述：</label></u-col>

					<u-col span="9">
						<view class="feedback bg-purple-light">{{ item.feedbackinfo }}</view>
					</u-col>
				</u-row>

				<u-row style="background-color: #FFFFFF;">
					<u-col span="5">
						<!-- <view class="demo-layout bg-purple">2020-10-02  13:10</view> -->
						<label style="color: #999999;">{{ item.time }}</label>
					</u-col>
				</u-row>
			</view>
		</view>
		<view>
			<!--loading加载提示处-->
			<uni-load-more :status="loadStatus" @loadmore="loadmore" v-if="list.length != 0"></uni-load-more>
		</view>
	</view>
</template>

<script>
import { getFeedbackList } from '@/api/oil_station.js';
import { login, regist, smsSend, smsLogin } from '@/api/login.js';
import { getStores, formatDateTime } from '@/common/utils.js';
import wechat from '@/common/wechat.js';


var wx = require('jweixin-module');

import Vue from 'vue';
export default {
	data() {
		return {
			list: [],
			infoData: {
				feedbackphoto: '',
				feedbacktime: '',
				feedbacktype: '',
				feedbackinfo: ''
			},
			page: 1,
			pagesize: 20,
			loadStatus: 'more', //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
			isRefresh: false
		};
	},
	methods: {

		onReachBottom() {
			//上拉触底函数

			if (this.loadStatus == 'more') {
				//此处判断，上锁，防止重复请求
				this.page += 1;
				this.getInfo('b');
			}
		},
		onPullDownRefresh() {
			this.page = 1;
			this.isRefresh = true;
			this.getInfo('a');
		},

		intoInfo(e) {
			uni.navigateTo({
				url: 'feedBackDetail?feedbackinfo=' + e.feedbackinfo + '&feedbacktype=' + e.feedbacktype + '&feedbacktime=' + e.time + '&feedbackphoto=' + e.feedbackphoto
			});
			console.log(url);
		},

		getInfo(a) {
			this.loadStatus = 'loading';

			let $this = this;

			let param = {
				pagenum: this.page,
				pagesize: this.pagesize,
				tjid: getStores('users').tjid

			};
			getFeedbackList(param).then(res => {
				//只处理 code=1的结果  code等于其他会自动弹出错误提示框
				if (this.isRefresh) {
					this.isRefresh = false;
					uni.stopPullDownRefresh();
				}
				if (res.code == 1) {

				
					if (a == 'a') {
						this.list = [];
					}
					res.data.list.forEach(item => {
						item.time = formatDateTime(new Date(parseInt(item.feedbacktime)), 'all');

						this.list.push(item);
					});
					this.loadStatus = 'more';
				}
				if (res.data.hasNextPage==false) {
					this.loadStatus = 'nomore';
					return;
				}
								
				// console.log(res);
				// if (res.code == 1) {
				// 	$this.list = res.data.list;
				// 	if (res.data.list.length > 0) {
				// 		res.data.list.forEach(item => {
				// 			item.time = formatDateTime(new Date(parseInt(item.feedbacktime)), 'all');

				// 			this.list.push(item);
				// 		});
				// 	}
				// }
			});
		}
	},

	created() {
		//页面创建完毕 调用的函数
		this.getInfo('a');
	}
};
</script>

<style scoped lang="scss">
.feedback {
	width: 100%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.wrap {
	// padding: 24rpx;
}

.u-row {
	// margin: 30rpx 0;
}
.bg-purple-dark {
	background: #99a9bf;
}
</style>

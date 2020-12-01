<template>
	<view>
		<u-navbar title="意见反馈"></u-navbar>
		<u-row gutter="12" justify="center">
			<u-col span=""><u-image height="350rpx" width="320rpx" style="padding-top: 30rpx;" src="/static/img/feedbackSucceed.png"></u-image></u-col>
		</u-row>
		<u-row gutter="12" justify="center">
			<u-col span="4"></u-col>
			<label span="4" style="font-size: 40rpx;font-weight: 100;padding-top: 50rpx;">反馈成功</label>
			<u-col span="4"></u-col>
		</u-row>

		<u-row gutter="12">
			<u-col span="12" style="font-size: 32upx;font-weight: 100;padding-top: 10upx;text-align: center;color: #999999;">
				感谢你对旭油宝的关注与支持，我们会认真处理 你的反馈，尽快修复和完善相关功能。
			</u-col>
		</u-row>
		<u-row gutter="12" justify="center" style="padding-top:50upx;color: #2ecc71;">
			<u-link href="#" :under-line="true" color="#00cd79"><view @click="recordList">查看反馈记录</view></u-link>
		</u-row>
	</view>
</template>

<script>
import { addFeedback } from '@/api/feedBackList.js';
import { login, regist, smsSend, smsLogin } from '@/api/login.js';
import wechat from '@/common/wechat.js';

import { getSevenToken } from '@/api/user.js';
import { FileUtil } from '@/common/FileUtil';

var wx = require('jweixin-module');

import Vue from 'vue';
export default {
	methods: {
		recordList() {
			uni.navigateTo({
				url: '/pages/baseSetting/feedBack/feedBackRecord'
			});
		}
	}
};
</script>

<style></style>

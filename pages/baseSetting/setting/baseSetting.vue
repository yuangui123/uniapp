<template>
	<view>
		<u-navbar title="基础设置"></u-navbar>
		<view>
			<u-cell-group style="padding-top: 30rpx;">
				<u-cell-item  @click="querInfo" :title= "name" ></u-cell-item>
			</u-cell-group>
		
			<u-cell-group style="padding-top: 30rpx;">
				<u-cell-item @click="payNote" title="收款通知"></u-cell-item>
			</u-cell-group>
			
			<u-cell-group style="padding-top: 30rpx;">
				<u-cell-item @click="updateLoginPassword" title="修改登录密码"></u-cell-item>
				<u-cell-item @click="updatePayPassword" title="修改支付密码"></u-cell-item>
			</u-cell-group>
			
			<u-cell-group style="padding-top: 30rpx;">
				<u-cell-item @click="question" title="常见问题"></u-cell-item>
				<u-cell-item @click="feedBack" title="意见反馈"></u-cell-item>
			</u-cell-group>
		</view>
		<u-modal v-model="show" :content="content"></u-modal>
	</view>
</template>


<script>
	import { setStores, getStores, isEmpty, isPoneAvailable, cutChinese } from '@/common/utils.js';
	export default {
		data() {
			return {
				name:'',
				show: false,
				content: '此功能暂未开放'
			};
		},
		methods: {
			querInfo() {
				uni.navigateTo({
					url: 'oilStationBaseInfo'
				});
			},
			payNote() {
				uni.navigateTo({
					url: '../../collection'
				});
			},
			updateLoginPassword() {
				uni.navigateTo({
					url: 'updateLoginPassword'
				});
			},
			updatePayPassword() {
				uni.navigateTo({
					url: 'updatePayPassword'
				});
			},
			question() {
				this.show = true;
				return ;
				uni.navigateTo({
					url: '../question/questionList'
				});
			},
			feedBack() {
				uni.navigateTo({
					url: '../../opinion'
				});
			},
		},
		created() {
			this.name = getStores('station').name;
		},
		activated() {
			this.name = getStores('station').name;
		},
		onLoad: function(e) {
			//页面创建完毕 调用的函数
			this.$this = this;
			let user = getStores('users');
			this.name = user.name;
		}
	};
</script>

<style>
</style>

<template>
	<view>
		<u-search @custom="custom" placeholder="请输入银行名称" v-model="keyword" :clearabled="true" style="margin: 24rpx;" bg-color="#ffffff"></u-search>
		<view>
			<t-nodata v-if="banknamelist.length ==0"></t-nodata>
			<view @click="onSelect(item)" v-for="(item,i) in banknamelist" style="width: 100%;height: 90rpx;background-color: #FFFFFF;position: relative;">
				<u-row style="position: absolute;top: 50%;transform: translateY(-50%); padding-left: 24rpx;">
					<u-col style="color: #333333;font-size: 32upx;">{{item.bankname}}</u-col>
				</u-row>
				<u-line color="#ededed"></u-line>

			</view>
		</view>



	</view>
</template>

<script>
	import {
		getAllBank
	} from '@/api/payservice.js';
	import {
		isEmpty
	} from '@/common/utils.js';

	import Vue from 'vue'
	export default {
		data() {
			return {
				keyword: '',
				banknamelist: []
			}
		},
		methods: {
			custom(keyword) {
				this.getBankList();
				// this.$kami.showKToast({

				// 	content: '搜索内容为：' + keyword,
				// 	duration: 2
				// })
			},
			getBankList() {
				this.$kami.showLoaded()
				getAllBank(this.keyword).then(res => {
					console.log(res)
					if (res.code == 1) {
						if (res.data == null) {
							this.banknamelist = []
						} else
							this.banknamelist = res.data;



					}
					this.$kami.hideLoaded()
				})

			},
			onSelect(item) {
				let name = item.bankname;
				uni.$emit('bankname', {
					msg: name
				})
				uni.navigateBack();


				// this.$kami.showKToast({
				// 	content: '选中：' + name,
				// 	duration: 2
				// });
			}
		},
		created() {
			this.getBankList();
		}
	}
</script>

<style>
</style>

<template>
	<view>
		
		<u-row style="margin-top: 25%">
			<u-col></u-col>
		</u-row>
		
		<u-row >
			<u-col span="2"></u-col>
			<u-col span="8" text-align="center">
				<u-image width="100%" height="200rpx" src="../../static/img/noData.png"></u-image>
				<view style="color: #999;font-size: 16px;">暂无数据</view>
			</u-col>
			<u-col span="2"></u-col>
		</u-row>
		
		<u-row style="margin-top: 25%">
			<u-col></u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: require('../../static/img/noData.png')
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

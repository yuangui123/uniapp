<template>
	<view class="mask mask-show" v-if="showLoading">
		 <view class="balls">
		   <view class="outer"></view>
		   <view class="middle"></view>
		   <view class="inner"></view>
		 </view>
		<view class="title">{{ text }}</view>
	</view>
	<!-- 遮罩层-->
</template>

<script lang="ts" src="./js/index.ts" scoped="true"></script>
<style src="./style/style.scss" lang="scss" Scoped></style>

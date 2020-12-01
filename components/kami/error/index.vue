<template>
	<view v-if="showPage" class="c-main-body">
		<view class="content">
			<image class="animated-1" src="/static/resource/svg/no-page.svg"></image>
			<view class="success-title animated-2">加载失败，请重新加载</view>
			<view class="login-btn pb-padding animated-3">
				<k-button customClass="btn" @submit="toBack" :title="'重新加载'" ></k-button>
			</view>
		</view>
	</view>
</template>

<script type="text/javascript" src="./js/index.js"></script>
<style src="./style/style.scss" lang="scss" Scoped></style>
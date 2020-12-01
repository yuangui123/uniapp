<template>
	<view v-if="showErrorLoding || showToast || showLoading" class="g-main-body" @click="closeToast">
		<error :showPage="showErrorLoding" @closeError="closeError"></error>
		<toast :showPage="showToast" :content="toastContent" :duration="toastDuration"></toast>
		<loading text="正在加载" :showLoading="showLoading"></loading>
	</view>
</template>

<script type="text/javascript" src="./js/index.js"></script>
<style src="./style/style.scss" lang="scss" Scoped></style>
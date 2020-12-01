<template>
	<view class="k-btn" :class="customClass" @click="submit($event)">
		<button :class="touchBtn ? 'btn-active' : 'btn-reset'" :style="disabled ? 'background:rgba(255,255,255,0.7)' : ''">
			<view class="loading" v-if="loading"></view>
			{{ title }}
			<view class="wave" :class="touchBtn?'waves ' + customClass:customClass" :style="{top: touchBtn?offsetY+'px':'0px',left:touchBtn?offsetX+'px':'0px'}"></view>
		</button>
	</view>
</template>

<script lang="ts" src="./js/index.ts"></script>
<style src="./style/style.scss" lang="scss" Scoped></style>

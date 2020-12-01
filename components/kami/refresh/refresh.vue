<template>
	<div class="container" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
		<div class='refreshBox' :style="isTranform">
			<div class='refresh' :style="isZoom" :class="isEnd==2?'animationSmall':''">
				<div class='refreshWord' v-if="isEnd == 0">刷新</div>
				<div class='refreshCirle animation' v-if="isEnd == 1"></div>
				<image class='iconYes' v-if="isEnd==2"></image>
			</div>
		</div>
		<slot></slot>
	</div>
	</div>
</template>

<script lang="ts" src="./js/index.ts"></script>
<style src="./style/style.scss" lang="scss" Scoped></style>
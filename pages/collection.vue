<template>
	<view>
		<view><u-navbar :is-back="true" title="设置收款通知"></u-navbar></view>
		<view style="background-color: #FFFFFF;">
			<u-row gutter="12" style="border-bottom: 1px solid #e4e7ed ;">
				<u-col span="10" style="padding: 20upx 10upx;">
					<u-row>公众号通知</u-row>
					<u-row style="color: #808695;">收款旭油宝公众号接受收款通知</u-row>
				</u-col>
				<u-col span="2"><u-switch v-model="checked" active-color="#19be6b" inactive-color="#c5c8ce" text="32" :checked="true" @change="change"></u-switch></u-col>
			</u-row>
			<u-row gutter="12">
				<u-col span="10" style="padding: 20upx 10upx;">
					<u-row>收款语音播报</u-row>
					<u-row style="color: #808695;">收款成功时语音播放油品及收款金额</u-row>
				</u-col>
				<u-col span="2"><u-switch v-model="checked1" active-color="#19be6b" inactive-color="#c5c8ce" :checked="true" @change='change1'></u-switch></u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
import { setStores, getStores} from '@/common/utils.js';
	
export default {
	data() {
		return {
	
			checked: getStores('NoteStatus1'),

			checked1: getStores('NoteStatus2'),
		};
	},
	methods: {
		// switch打开或者关闭时触发，值为true或者false
		// 即使不监听此事件，this.checked此时也会相应的变成true或者false
		change(status) {

			
			this.checked = status;
			setStores('NoteStatus1',status );
			
			

		},
		change1(status) {
			
			// this.checked1 = localStorage.setItem('NoteStatus2',status)  //存起来
			this.checked1 = status;
			
			setStores('NoteStatus2',status );
			
		}
	}
};
</script>

<style></style>

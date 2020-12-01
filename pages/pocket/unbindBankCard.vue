<template>
	<view style="width: 100%;height: 100%; background-color: #FFFFFF;">
		<u-navbar title="验证支付密码" title-color="#333333">
			<u-row gutter="12" style="width: 100%;">
				<u-col span="9"></u-col>
				<u-col span="3">
					<view @click="forgetPwd">忘记密码</view>
				</u-col>
			</u-row>
		</u-navbar>

		<view style="text-align: center;margin-top: 80rpx;font-size: 32upx;color: #333333;">请输入支付密码以解绑银行卡</view>

		<u-message-input style="width: 100%;" mode="bottomLine" :maxlength="6" :dot-fill="true" @finish="finish" :breathe="false"></u-message-input>


	</view>
</template>

<script>
	import {
		verifyOldPassword,
		unbindBankCard
	} from '@/api/payservice.js';
	import {
		setStores,
		getStores,
		isEmpty,
		isPoneAvailable,
		cutChinese
	} from '@/common/utils.js';
	import md5Libs from "uview-ui/libs/function/md5";
	import Vue from 'vue'
	export default {
		data() {
			return {
				value: '',
				accountno: ''
			}
		},
		methods: {
			finish(value) {
				this.$kami.showLoaded()
				verifyOldPassword(md5Libs.md5(value)).then(res => {
					if (res.code == 1) {
						let identify = res.data.identify;
						this.unbind(identify);
					}
					this.$kami.hideLoaded()
				});


			},
			unbind(identify) {
				this.$kami.showLoaded()
				let param = {
					identify: identify,
					accountno: this.accountno

				}
				unbindBankCard(param).then(res => {
					if (res.code == 1) {
						uni.showToast({
							icon: 'success',
							title: '解绑成功'
						})

						uni.$emit('unbind');
						uni.navigateBack();
					}
					this.$kami.hideLoaded()
				})

			},
			forgetPwd() {
				uni.navigateTo({
					url: '../baseSetting/setting/updatePayPassword'
				});
			}
		},
		onLoad(e) {
			if (e.accountno) {
				this.accountno = e.accountno;
			}
		}
	}
</script>
255
<style>


</style>

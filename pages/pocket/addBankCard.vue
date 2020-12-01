<template>
	<view>
		<u-row>
			<u-col style="font-size: 32upx;margin-left: 12px;margin-top: 15px;">请绑定本公司的公账银行卡</u-col>
		</u-row>
		<u-form :model="model" ref="uForm" style="background-color: #FFFFFF;margin-top: 15px; margin-left: 12px;margin-right: 12px;padding-left: 10px;padding-right: 10px;">
			<u-form-item style="height: 49px;" label="银行卡号" prop="idcard" label-position="left" label-width="170">
				<u-input placeholder="输入公司公账卡号" v-model="model.idcard" type="number"></u-input>
				<u-icon name="search" @click="getBankName"></u-icon>
			</u-form-item>
			<u-form-item style="height: 49px;" label="开户行" label-position="left" prop="bank" label-width="170" right-icon="arrow-right">
				<u-input placeholder="请选择开户银行" v-model="model.bank" type="text" :disabled=true @click="selectBank"></u-input>
			</u-form-item>


			<u-form-item style="height: 49px;" label="公司名称" prop="name" label-position="left" label-width="170">
				<u-input placeholder="公司名称" v-model="model.name" type="text" :disabled=true></u-input>

			</u-form-item>

			<u-form-item style="height: 49px;" label="预留手机号" prop="phone" label-position="left" label-width="170">
				<u-input placeholder="输入银行预留手机号" v-model="model.phone" type="number" maxlength="11"></u-input>

			</u-form-item>

		</u-form>

		<u-button @click="submit" shape="square" :plain=true style="color: #2ecc71;margin: 30px;font-size: 34upx; ">提交</u-button>

	</view>
</template>

<script>
	import {
		getAuthenInfo,
		getBankInfo,
		bindBankCardStepFirst
	} from '@/api/payservice.js';
	import {
		setStores,
		getStores,
		isEmpty,
		isPoneAvailable,
		cutChinese
	} from '@/common/utils.js';

	import Vue from 'vue'
	export default {
		data() {
			return {
				model: {
					idcard: '',
					bank: '',
					name: '',
					phone: ''
				},

			};
		},
		methods: {
			submit() {
				if (isEmpty(this.model.idcard)) {
					this.$kami.showKToast({
						content: '请输入银行卡号',
						duration: 2
					});
					return;
				}
				if (isEmpty(this.model.phone)) {
					this.$kami.showKToast({
						content: '请输入手机号',
						duration: 2
					});

					return;
				}
				if (isEmpty(this.model.bank)) {
					this.$kami.showKToast({
						content: '请选择开户行',
						duration: 2
					});

					return;
				}
				this.$kami.showLoaded()
				let param = {
					accountno: this.model.idcard,
					mobile: this.model.phone,
					bankname: this.model.bank
				};
				// uni.navigateTo({
				// 	url:'./accountVerification?khh='+encodeURIComponent(this.model.bank)
				// 	  +'&khm='+ encodeURIComponent(this.model.name)
				// 	  +'&yhzh='+encodeURIComponent(this.model.idcard)
				// 	  +'&identify=111111'
				// })
				bindBankCardStepFirst(param).then(res => {
					if (res.code == 1) {
						let type = res.data.verifyType;
						if (type == 2) {
							uni.navigateTo({
								url: './accountVerification?khh=' + encodeURIComponent(this.model.bank) +
									'&khm=' + encodeURIComponent(this.model.name) +
									'&yhzh=' + encodeURIComponent(this.model.idcard) +
									'&identify=' + encodeURIComponent(res.data.identify)

							})
						} else if (type == 1) {
							uni.navigateTo({
								url: './verificationCode?identify=' + encodeURIComponent(res.data.identify) +
									'&mobile=' + encodeURIComponent(this.model.phone) +
									'&account=' + encodeURIComponent(this.model.idcard) +
									'&bankname=' + encodeURIComponent(this.model.bank)
							})


						} else {
							this.$kami.showKToast({
								content: '未知的验证方式，请联系客服',
								duration: 2
							});
						}
					}

					this.$kami.hideLoaded()
				});


			},
			getAthen() {
				this.$kami.showLoaded()
				getAuthenInfo().then(res => {
					if (res.code == 1) {
						console.log(res.data);
						if (res.data.realnamestatus == 2) {
							this.model.name = res.data.name;
							
						} else {
							uni.showToast({
								icon: 'none',
								title: '该账号未实名'
							})
						}
					}
					this.$kami.hideLoaded()
				})

			},
			getBankName() {
				this.$kami.showLoaded()
				getBankInfo(this.model.idcard).then(res => {
					if (res.code == 1) {
						this.model.bank = res.data.bankname;
					}
					this.$kami.hideLoaded()
				})
			},
			selectBank() {
				uni.navigateTo({
					url: 'chooseBankCard'
				});
			}


		},
		created() {
			this.getAthen();
		},
		onLoad() {
			//this.model.name = this.name = getStores('users').name;
			uni.$on('bankname', (res) => {
				this.model.bank = res.msg;

			})

		},
		onUnload() {
			uni.$off('bankname');
		}
	}
</script>

<style>
</style>

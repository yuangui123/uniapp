<template>
	<view>
	 
	 <view class="u-padding-40">
	 
		<u-button type="success" @click="pay"  >
			<u-icon name="red-packet"></u-icon>
			<text class="u-padding-left-10">立即支付</text>
		</u-button>
		 
	 </view>		
	 
		<view>
		 
			<t-pay-input text="修改密码" :dot-fill="true"  :show="show"     @finish="finishPay"   ></t-pay-input>
			
		</view>
	 
		<t-textarea ref="textarea" ></t-textarea>
		<button @click="e">12</button>
		<input
			placeholder="请输入会员号" 
			class="input-style" 
			placeholder-class="input-place" 
			type="number" 
			id="tjid"
			  
			maxlength="6"
		/>
	</view>
	
</template>

<script>
 
import Vue from 'vue';
export default {
 
	data() {
		return {
			show:false,
			price:125,
			value:''
		};
	},
	methods: {
		e(){
			alert(this.$refs.textarea.content);
		},
		pay(){
			//必须要先false 在true
			this.show = false;
			this.show = true;
			this.price = Math.floor(Math.random() * (100 - 20)) + 20;
			
		},
		 finishPay(pass,price){
			 
			 alert("支付密码："+pass)
			 alert("支付金额："+price)
			 
			 uni.showLoading({
			 					title:'修改中'
			 				})
			 			 
			setTimeout(()=>{
				uni.hideLoading();
				this.show = false;
				uni.showToast({
					icon:'success',
					title:'修改成功'
				})
			},2000);

		 }
	},
	created() {
		 
	}
};
</script>

<style>
</style>

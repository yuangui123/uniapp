<template>
	<view >
		<u-navbar title="反馈记录详情"></u-navbar>
		<u-mask :show="show" @click="showActction">
				<view class="warp" >
					<!-- <view @tap="showImgAction">
						<view @tap.stop> -->
					<u-image height= 90% width= 80% :src='src' ></u-image>
					<!-- </view> -->
					<!-- </view> -->
				</view>
			</u-mask>
		
		<view style="padding-top: 10rpx;background-color: #FFFFFF;" >
				<u-row>
					<u-col span="3">
					<label style="color: #999999;">反馈类型：</label>
					</u-col>
					<u-col span="9">
              <u-row><view class="demo-layout bg-purple-light" v-html="feedbacktype"></view></u-row>
			    <u-row></u-row>
						<!-- <view class="demo-layout bg-purple-light" v-html="feedbacktype"></view> -->
						
					</u-col>
				</u-row>
				
				<u-row>
					<u-col span="3">

						<label style="color: #999999;">反馈时间：</label>
						
					</u-col>
					<u-col span="9">

						<label>{{feedbacktime}}</label>
						
					</u-col>
				</u-row>
				
				<u-row >
					<u-col span="3">

						<label style="color: #999999;">详细描述：</label>
						
					</u-col>
					<u-col span="9">
					<!-- 	<view class="demo-layout bg-purple-light">{{feedbackinfo}}</view> -->
					<u-row><view class="demo-layout bg-purple-light">{{feedbackinfo}}</view></u-row>
					</u-col>
				
				</u-row>
				
				<u-row gutter="12" justify="center">

					
						<u-col span="4" v-for="(item,index) in feedbackphoto" >
							<!-- <view @tap="showImgAction">
								<view @tap.stop> -->
							<u-image height="300rpx" :src=item.url :key="index"@click="nextclick(item.url)"></u-image>
							
						</u-col> 
				
				</u-row> 
			</view>
	</view>
</template>

<script>
	import {
		formatDateTime,
		isEmpty,getCurrentMonthLast,doHandleMonth
	} from '@/common/utils.js';
	export default {
	
		data() {
			return {	
				show: false,
				feedbackphoto:[],
				feedbacktime: '',
				feedbacktype: '',
				feedbackinfo: '',

				src:''
			}
		},
		methods:{
			nextclick (e){
				this.show = true
				this.src = e
			},
			showActction (){
				this.show = false
			}
		},
		onLoad:function(e){
			console.log(e);
			this.feedbackinfo = e.feedbackinfo;
			this.feedbacktime = e.feedbacktime;

			this.feedbacktype = e.feedbacktype;
			
			this.feedbackphoto = JSON.parse(e.feedbackphoto);
			
		},
		clickHandler(){

		}
		
	}
</script>

<style>
	.warp {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
	
</style>

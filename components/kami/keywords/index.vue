<template>
	<view class="mark" :class="[show_key ? '' : 'hidden']" @click="closeFuc">
		<view class="kong"></view>
		<!-- 信息框 -->
		<view class="msg">
			<view class="img iconfont icon-guanbi" @click="closeFuc">
			</view>
			<view class="title">
				请输入支付密码
			</view>
			<view class="subTitle" v-show="show_subTitle" v-if="type == 1">
				油票转让：{{price}}油票
			</view>
			<view class="subTitle-1" v-show="show_subTitle" v-if="type == 2">
				支付
			</view>
			<view class="subTitle-2" v-if="type == 2">
				<span>￥</span>{{price}}
			</view>
			<view class="pswBox">
				<view v-for="(item,index) in 6" :key="item" class="content_item">{{password[index] != undefined ? '●' : ''}}</view>
			</view>
		</view>
		<!-- 数字键盘 -->
		<view class="numeric">
			<view class="num " v-for="item in 9" :key="item"  @click.native.stop="press({num:item})">
				{{item}}
			</view>
			<view class="num" @click.native.stop="press({num:'.'})">.</view>
			<view class="num" @click.native.stop="press({num:0})">0</view>
			<view class="num amend3 iconfont icon-backspace" @click.native.stop="press({num:-1})"></view>
		</view>
	</view>
</template>

<script>
	import "@/static/iconfont/iconfont.css";
	export default {
		props:{
			show_key: Boolean,
			price: String,
			show_subTitle:{
				default:true
			},
			type: {
				type: Number,
				default: 1
			}
		},
		data () {
			return { 
				password:"",
				nunList: [1,2,3,4,5,6,7,8,9]
			}
		},
		created() {
		},
		methods:{
			press (obj) {
				if(obj.num >= 0) {
					this.password += (''+obj.num)
				} else {
					this.password = this.password.substring(0,this.password.length -1)
				}
				if (this.password.length == 6) {
					this.$emit('getPassword',{password:this.password})
					this.password = "";
				}
			},
			// 关闭支付页面
			closeFuc () {
				this.password = ''
				this.$emit("closeFuc",false)
			},
			// 找回密码
			forgetFuc () {
				uni.navigateTo({
					url:'/pages/mine/myWallet/changezfPwd/changezfPwd'
				})
			}
		}
	}
</script>

<style>
	.mark{
		width: 750upx;
		background: rgba(0,0,0,0.7);
		padding: 0 0 500upx 0;
		position: absolute;
		top: 0upx;
		left: 0upx;
		z-index: 10086;
		box-sizing: border-box;
		height: 100%;
	}
	.hidden{
		display: none;
	}
	.kong{
		width: 750upx;
		height: 250upx;
	}
	.msg{
		width: 550upx;
		height: 350upx;
		background: rgba(255,255,255,1);
		border-radius: 20upx;
		margin: 0 auto;
		animation: msgBox .2s linear;
		position: relative;
	}
	@keyframes msgBox{
		0%{
			transform:translateY(50%);
			opacity: 0;
		}
		50%{
			transform:translateY(25%);
			opacity: 0.5;
		}
		100%{
			transform:translateY(0%);
			opacity: 1;
		}
	}
	@keyframes numBox{
		0%{
			transform:translateY(50%);
			opacity: 0;
		}
		50%{
			transform:translateY(25%);
			opacity: 0.5;
		}
		100%{
			transform:translateY(0%);
			opacity: 1;
		}
	}
	.msg>.img{
		font-size: 30upx;
		position: absolute;
		left: 25upx;
		top: 25upx;
	}
	.msg>.title{
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		font-weight: 500;
		font-size: 36upx;
		text-align: center;
		border-bottom: 1px solid #f2f2f2;
	}
	.msg>.subTitle{
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		font-weight: 400;
		font-size: 32upx;
		text-align: center;
	}
	.msg>.subTitle-1{
		width: 100%;
		height: 30upx;
		line-height: 30upx;
		font-weight: 400;
		font-size: 24upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.msg>.subTitle-2{
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		font-weight: 400;
		font-size: 36upx;
		text-align: center;
		font-weight: 600;
		margin-top: 20upx;
	}
	.msg>.subTitle-2>span{
		font-size: 28upx;
	}
	.pswBox{
		width: 80%;
		height: 80upx;
		margin: 20upx auto 0;
		display: flex;
	}
	.content_item{
		flex: 2;
		text-align: center;
		line-height: 80upx;
		border: 1upx solid #D6D6D6;
		border-right: 0upx solid;
	}
	.icon-backspace {
		color: #999999;
	}
	.content_item:nth-child(1){
		border-radius: 10upx 0 0 10upx;
	}
	.content_item:nth-child(6){
		border-right: 1upx solid #D6D6D6;
		border-radius: 0 10upx 10upx 0;
	}
	.numeric{
		width: 100%;
		height: 480upx;
		position: fixed;
		z-index: 98;
		bottom: 0upx;
		background-color: #e7e7e7;
		animation: msgBox .2s linear;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.num{
		width: 33.1%;
		height: 119upx;
		font-size: 42upx;
		font-weight: 500;
		line-height: 90upx;
		text-align: center;
		vertical-align: middle;
		display: inline-block;
		background-color: #FFFFFF;
		position: relative;
		z-index: 99;
		box-sizing: border-box;
		margin-bottom: 1upx;
	}
	.forget{
		font-size: 28upx;
		font-weight: 500;
		color: #3D84EA;
		text-align: center;
		line-height: 80upx;
	}
	.amend1{
		border: 1upx solid #CCCFD6;
		background-color: #CCCFD6;
	}
	.amend3{
		font-size: 60upx;
		border: 1upx solid #e7e7e7;
		background-color: #e7e7e7;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/* .amend11{
		position: absolute;
		top: 313upx;
		left: 0upx;
		background-color: #CCCFD6;
		border: 1upx solid #FF0000;
	}
	.amend1{
		height: 100upx !important;
		position: absolute;
		top: 306upx;
		left: 0upx;
		z-index: 99;
		background-color: #CCCFD6;
		border: 2upx solid #CCCFD6;
	}
	.amend2{
		position: absolute;
		top: 306upx;
		left: 250upx;
		z-index: 99;
	}
	.amend3{
		position: absolute;
		top: 306upx;
		left: 500upx;
		z-index: 99;
		font-size: 60upx;
		border: 0upx;
		background-color: #CCCFD6;
	} */
	
</style>
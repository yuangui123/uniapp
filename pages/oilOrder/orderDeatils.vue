<template>
	<view  >	
	<view ><u-navbar :is-back="true" title="订单详情"></u-navbar></view>
	<view class="aaaa">
	 
		<u-row gutter="12">
			<u-col  span="1"></u-col>
		    <u-col text-align="end" span="2">当前状态</u-col>
			<u-col  span="0.5"></u-col>
			<u-col   span="6">{{dataList.orderStatus}}</u-col>
		</u-row>
		<u-row gutter="12" >
			<u-col  span="1"></u-col>
			<u-col text-align="end" span="2">收款时间</u-col>
			<u-col  span="0.5"></u-col>
	 
			<u-col span="6">{{dataList.orderCreateDate}}</u-col>
		</u-row>
		<u-row gutter="12" v-if="dataList.orderRevokeDate">
			<u-col  span="1"></u-col>
			<u-col text-align="end" span="2">退款时间</u-col>
			<u-col  span="0.5"></u-col>
		   
			<u-col span="6">{{dataList.orderRevokeDate}}</u-col>
		</u-row>
		<u-row gutter="12" >
			<u-col  span="1"></u-col>
			<u-col text-align="end" span="2">订单金额</u-col>
			<u-col  span="0.5"></u-col>
		 
			<u-col span="6">{{dataList.orderMoney}}元</u-col>
		</u-row>
		<u-row gutter="12" >
			<u-col  span="1"></u-col>
			<u-col text-align="end" span="2">油票类型</u-col>
			<u-col  span="0.5"></u-col>
	 
			<u-col span="6">{{dataList.oilTypeName}}</u-col>
		</u-row>
		<u-row gutter="12" >
			<u-col  span="1"></u-col>
			<u-col text-align="end" span="2">枪&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</u-col>
			<u-col  span="0.5"></u-col>
 
			<u-col span="6">{{dataList.gunNo}}</u-col>
		</u-row>
		<u-row gutter="12" >
			<u-col  span="1"></u-col>
			<u-col text-align="end" span="2">司机姓名</u-col>
			<u-col  span="0.5"></u-col>
 
			<u-col span="6">{{dataList.driverName}}</u-col>
		</u-row>
		<u-row gutter="12" >
			<u-col  span="1"></u-col>
			<u-col text-align="end" span="2">会&nbsp;&nbsp;员&nbsp;&nbsp;号</u-col>
			<u-col  span="0.5"></u-col>
 
			<u-col span="6">{{dataList.tjid}}</u-col>
			</u-row>
			
	<u-row gutter="12" >
		<u-col  span="1"></u-col>
		<u-col text-align="end" span="2">手机号码</u-col>
		<u-col  span="0.5"></u-col>
 
		<u-col span="6">{{dataList.mobile}}</u-col>
	</u-row>
	
		<u-row gutter="12" >
			<u-col  span="1"></u-col>
			<u-col text-align="end" span="2">订单交易</u-col>
			<u-col  span="0.5"></u-col>
 
			<u-col span="8">
			 
			<label style="word-break:break-all;word-wrap:break-word;" >{{dataList.orderId}} </label>
			
			</u-col>
		</u-row>
 
		
		<u-row gutter="12" style="padding-top: 20px;">
			 
		</u-row>
	</view>
	<view>
		<u-row gutter="12" style="padding-top:10%;">
			<u-col span="3"></u-col>
		    <u-col span="6"><u-button type="success" v-if="dataList.orderStatus =='已收款' && showButton" @click="openPoup">退款</u-button></u-col>
			<u-col span="3"></u-col>
		</u-row>
		<u-modal v-model="showPoup" :show-cancel-button=true @cancel="cancel" @confirm="confirm" :content="content"></u-modal>
	</view>
	<u-toast ref="uToast" />
	<t-copyright></t-copyright>
	</view>
</template>

<script>
	import {getoilsDetail, oilsRevoke} from '../../api/oil_station.js'
	export default {
		data () {
			return {
				id: '',
				dataList: [],
				orderId: '',
				showPoup: false,
				content: '退款后不可取消，确定要退款吗？',
				showButton: false,
			}
		},
		onLoad(opstion) {
			this.id = opstion.id
			this.getoilsDetail(opstion.id);
		},
		onPullDownRefresh() {
			this.isRefresh = true;
			this.getoilsDetail(this.id);
		},
		methods:{
			showBtn() {
				let currentTime = new Date().getTime();
				let startTime = new Date((this.dataList.orderCreateDate).replace(/-/g,'/')).getTime();
				
				let changeTime = 30*60*1000;
				if((currentTime - startTime) > changeTime){
					return false
				}else {
					return true;
				}
			},
			cancel() {
				this.showPoup = false;
			},
			openPoup() {
				this.showPoup = true;
			},
			confirm() {
				this.oilsRevoke()
			},
			getoilsDetail(id) {
				let parma = {
					orderid: id
				}
				getoilsDetail(parma).then(res => {
					if (this.isRefresh) {
						this.isRefresh = false;
						uni.stopPullDownRefresh();
					}
					if(res.code == 1){
						this.dataList = res.data
						this.orderId = res.data.orderId
						this.showButton = this.showBtn();
					}
				})
			},
			oilsRevoke() {
				oilsRevoke({orderId: this.orderId}).then(res => {
					if(res.code == 1){
						this.$refs.uToast.show({
							title: '操作成功',
							type: 'success',
							// url: '/pages/user/index'
						})
						this.dataList = [];
						this.getoilsDetail(this.orderId);
					}
				})
			},
		}
	}
</script>

<style>
	.aaaa .u-row{
		background-color: #FFFFFF;
		padding-top: 20upx;
	}
</style>

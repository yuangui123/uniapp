<template>
	<view>
		<view style="background-color: #FFFFFF;"><u-navbar :is-back="true" title="加油订单"></u-navbar></view>
		<view class="orderSelect">
 
			<u-row gutter="12" style=" background-color: #fff;height: 45px">
				<u-col span="0.3" ></u-col>
				<u-col span="" ><view @click="showSelect"><u-image  width="36upx" height="36upx" :src="src"></u-image></view></u-col>
				<u-col span="2"><view @click="showSelect">筛选</view></u-col>
				<u-col span="8">
					<u-search @search="getoilsList('a')" v-model="keywords" input-align="left" height="60" placeholder="输入司机手机号/会员号/姓名" :show-action='false'></u-search>
				</u-col>
			</u-row>
			<u-popup v-model="showPoup" mode="top" z-index="1000">
				<view style="background-color: #FFFFFF;margin-top: 30upx"><u-navbar :is-back="true" title="加油订单"></u-navbar></view>
				<u-row gutter="12">
					<u-col span="0.3" ></u-col>
					<u-col span="" ><view @click="showSelect"><u-image  width="36upx" height="36upx" :src="src"></u-image></view></u-col>
					<u-col span="2"><view @click="showSelect">筛选</view></u-col>
					<u-col span="8">
						<u-search v-model="keywords" input-align="left" height="60" placeholder="输入司机手机号/会员号/姓名" :show-action='false'></u-search>
					</u-col>
				</u-row>
				<u-form :model="form" label-width="160" style="padding: 10upx">
					<u-form-item label="订单状态" style="padding: 30upx 20upx;">
						<view @click="selectState(item.id)" :class="state1==item.id?'custom-style custom-style1':'custom-style'"  v-for="(item,index) in stateList" :key="item.id">{{item.text}}</view>
					</u-form-item>
					<u-form-item label="油品类型" style="padding: 30upx 20upx;">
						<view @click="selectState2(item.id)" :style="item.id != -1?'width:80upx':''" :class="state2==item.id?'custom-style custom-style1':'custom-style'"  v-for="(item,index) in oilsList" :key="item.id">{{item.text}}</view>
					</u-form-item>
					<u-form-item label="开始时间" style="padding: 30upx 20upx;">
						<u-row>
							<u-col span="10">
								<u-input height="50" style="border-radius: 25rpx;background-color: #ddd;"  @click="selectStartTime" placeholder="选择时间" v-model="startTime" border disabled="disabled"/>
							</u-col>
						</u-row>
					</u-form-item>
					<u-form-item label="结束时间" style="padding: 30upx 20upx;">
						<u-row>
							<u-col span="10">
								<u-input height="50" style="border-radius: 25rpx;background-color: #ddd;" @click="selectStartTime1" placeholder="选择时间" v-model="endTime" border  disabled="disabled"/>
							</u-col>
						</u-row>
					</u-form-item>
					<view>
						<u-row style="height:100upx;" align="center">
							<u-col span="6" text-align="center"  style="border-right: 1upx solid #eee;height:100%">
								<view @click="cancelBtn" style="height: 100%;display: flex;align-items: center;justify-content: center">取消</view>
							</u-col>
							<u-col span="6" text-align="center" style="height:100%:">
								<view @click="confirmBtn('a')" style="color: #6ce4b3;">确认</view>
							</u-col>
						</u-row>
					</view>
				</u-form>
				
			</u-popup>
		</view>
		<u-picker @confirm="confirmTime" mode="time" z-index="10000" v-model="show1" :params="params" title="选择开始时间"></u-picker>
		<u-picker @confirm="confirmTime2" mode="time" z-index="10000" v-model="show2" :params="params" title="选择结束时间"></u-picker>
		<view class="orderContent">
			<!-- 暂无数据 -->
			<t-nodata v-if="orderList.length == 0"></t-nodata>
			<view class="contentItem" v-if="orderList.length > 0">
				<!--渲染的列表处-->
				<view @click="goDetails(item.orderId)" v-for="(item,index) in orderList" :key="index" class="itemList">

					<u-row>
						<u-col span="6"  >
							<u-row>
								<u-col span="12"  >
									<view class="">{{item.orderCreateDate}}</view>
								</u-col>
							</u-row>
							<u-row>
								<u-col span="12"  >
									<view class="">{{item.driverName}}</view>
								</u-col>
							</u-row>
							<u-row>
								<u-col span="12"  >
									<view class=""> <view style="color:#999;font-size: 12px;">{{item.gunNo + item.oilTypeName}}</view></view>
								</u-col>

							</u-row>
						</u-col>
						<u-col span="6"  >
							<u-row justify="end">
								<u-col span=""  v-show="false">
									1
								</u-col>

							</u-row>

							<u-row justify="end">
								<u-col span="12" text-align="right"   >
									<view >{{item.orderMoney}}元</view>
								</u-col>
							</u-row>

							<u-row justify="end">
								<u-col   span="12" text-align="right" >
									<view v-show="item.orderStatus=='已退款'" style="color:red;font-size: 12px;">(已退款)</view>
								</u-col>

							</u-row>
						</u-col>
					</u-row>
				</view>
			</view>
			<view>  <!--loading加载提示处-->
				<uni-load-more v-if="orderList.length != 0" :status="loadStatus" ></uni-load-more>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {getoilsList, getpagedetails} from '../../api/oil_station.js'
	import { formatDateTime } from '@/common/utils.js';
 
	export default {
		data() {
			return {
				keywords: '', // 搜索关键字
				params:{
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
				},
				startTime: '',
				endTime: '',
				show1: false,
				show2: false,
				state1: -1, // 订单状态
				state2: -1, // 油品类型
				oilsList: [{
					text: '所有油品',
					id: -1,
				}],
				// 油品类型
				stateList: [{
					text: '所以状态',
					id: -1,
				},{
					text: '已收款',
					id: 1,
				},{
					text: '已退款',
					id: 3,
				}],
				form: {
					state: ''
				},
				showPoup: false, // 筛选
				page:1,
				pagesize:10,
				loadStatus:'more',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				src: '../../static/img/selectChange.png',
				orderList: [], // 渲染列表数据
				isRefresh: false
			}
		},
	 
		onReachBottom(){  //上拉触底函数
			if(this.loadStatus == 'more'){  //此处判断，上锁，防止重复请求
				this.page+=1
				this.getoilsList('b')
			}
		},
		// onPullDownRefresh() {
		// 	this.page++;
		// 	this.getoilsList()
		// },
		onPullDownRefresh() {
			this.page = 1;
			this.isRefresh = true;
			this.getoilsList('a');
		},
		onLoad() {
			this.getoilsList('b');
			getpagedetails().then(res => {
				if(res.code == 1){
					// debugger;
					let list = res.data.oilTypeName
					for(let key  in list){
						let obj = {
							text: list[key],
							id: key
						}
						this.oilsList.push(obj);
					}
				}
			})
		},
		methods: {
			// 获取列表数据
			getoilsList(a) {
  
				
				this.loadStatus = 'loading'
				let param = {
					ordertype: this.state1,
					oiltypeid: this.state2,
					page: this.page,
					size: this.pagesize,
					keywords: this.keywords
				}
				
				if(this.startTime){
					let startTime = this.startTime + " 00:00:00";
					param.orderbegintime = new Date(startTime.replace(/-/g,'/')).getTime();
				}
							
				if(this.endTime){
					let endTime = this.endTime + " 23:59:59"
					param.orderendtime = new Date(endTime.replace(/-/g,'/')).getTime();
				}
				
				getoilsList(param).then( res => {
					console.log(res);
					if (this.isRefresh) {
						this.isRefresh = false;
						uni.stopPullDownRefresh();
					}
					if(res.code == 1){
						if(a == 'a'){
							this.orderList = []
							this.orderList = res.data.list;
						}
						if(a == 'b'){
						 
							res.data.list.forEach(item => {
								this.orderList.push(item)
							})
						}
						this.loadStatus = 'more'
					}
					
					if (res.data.hasNextPage==false) {
						this.loadStatus = 'nomore';
						 
					}
				})
			},
			// 跳转详情
			goDetails(id) {
				uni.navigateTo({
					url: '/pages/oilOrder/orderDeatils?id='+ id
				});
			},
			// 确认开始时间
			confirmTime(time) {
				this.startTime = time.year + '-' + time.month + '-' + time.day;
			},
			// 确认结束时间
			confirmTime2(time) {
				this.endTime = time.year + '-' + time.month + '-' + time.day;
			},
			// 搜索确认
			confirmBtn(a) {
				this.showPoup = false;
				this.getoilsList(a)
			},
			// 搜索取消
			cancelBtn() {
				this.showPoup = false
			},
			selectStartTime1() {
				this.show2 = true;
			},
			selectStartTime() {
				this.show1 = true;
			},
			selectState(id) {
				this.state1 = id
			},
			selectState2(id) {
				this.state2 = id
			},
			showSelect() {
				this.showPoup = true
			},
			getVideoList() {

			}
		}
	}
</script>

<style>
	 
	
	.orderSelect{
		/* padding: 8rpx 10rpx; */
		background-color: #FFFFFF;
		position: relative;
	}
	.custom-style{
		width: 120upx;
		height: 50upx;
		background-color: #eee;
		border-radius: 25upx;
		margin-right: 10upx;
		text-align: center;
		line-height: 50upx;
		font-size: 12px;
	}
	.custom-style1{
		background-color: #05d27f;
		color: #ffffff;
	}
	.orderContent{
		margin-top: 10px;
	}
	.contentItem{
		background-color: transparent;
		width:96%;
		margin: 0 auto;
		border-radius: 10upx;
	}
	.itemList{
		border-radius: 10upx;
		padding: 10upx 20upx;
		margin-bottom: 20upx;
		background-color: #fff;
	}
</style>

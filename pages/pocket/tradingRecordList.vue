<template>
	<view>
		
		<u-sticky :enable="true">
			<view style="display: flex; height: 92rpx; padding-left: 24rpx;padding-right: 24px;background-color: #F2F2F2;">
				<u-row gutter="12" style="align-self: center;">
					<u-col span="4">
						<u-input type="select" placeholder="选择时间"  v-model="time"  :select-open="timeShow" @click="timeShow = true"></u-input>
					</u-col>
					<u-col span="5"></u-col>
					<u-col span="3" text-align="right">
						<u-input type="select" placeholder="交易类型" v-model="type" :select-open="typeShow" @click="typeShow = true"></u-input>
					</u-col>
				
				</u-row>
			</view>
			
			
		</u-sticky>

	

		<view >
			<t-nodata v-if="tradelist.length == 0"></t-nodata>
			<view class="wrap" v-for="(item,i) in tradelist" @click="todetail(item)">
				<u-row gutter="12" style="background-color: #FFFFFF; padding: 20rpx;">
					<u-col span="11">
						<view>
							<u-row gutter="12">
								<u-col span="6" style="color: #333333;font-size: 32upx;">{{item.description}}</u-col>
								<u-col span="6" text-align="right" style="font-size: 32upx;">{{item.smallChangeMoney}}</u-col>
							</u-row>
							<u-row gutter="12">
								<u-col span="6" style="color: #666666;font-size: 28upx;">{{item.createTime}}</u-col>
								<u-col span="6" text-align="right" :style="{'font-size':'14px','color': item.status == '0' ? '#FB4760':item.status == '1' ? '#00CD79':'#666666'}">{{ (item.status != null && item.transactionType == 2) ? (item.status == '0'?'提现中':item.status == '1'?'提现成功':'提现失败') :''  }}</u-col>
							</u-row>

						</view>
					</u-col>
					<u-col span="1" style="padding-left: 16rpx;">
						<u-icon name="arrow-right"></u-icon>
					</u-col>
				</u-row>


				<u-line color="#ededed"></u-line>

			</view>
			<view v-show="isLoadMore">
				<!--loading加载提示处-->
				<uni-load-more :status="loadStatus" @loadmore="loadmore"></uni-load-more>
			</view>
		</view>



		<u-picker mode="time" :params="params" v-model="timeShow" @confirm="confirmTime" >
		</u-picker>
		<u-action-sheet v-model="typeShow" :list="typeData" :cancel-btn="true" @click="selectType"></u-action-sheet>

	</view>

</template>

<script>
	import {
		gettradelist
	} from '@/api/payservice.js';
	import {
		formatDateTime,
		isEmpty,getCurrentMonthLast,doHandleMonth
	} from '@/common/utils.js';
 
	import Vue from 'vue'
	export default {
		data() {
			return {
				params: {
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				timeShow: false,
				typeShow: false,
				time: '',
				type: '全部类型',
				typeData: [{
						text: '全部类型'
					},
					{
						text: '收入'
					},
					{
						text: '支出'
					},
					{
						text: '提现'
					}
				],
				pagenum: 1,
				pagesize: 20,
				createtime: '',
				endtime: '',
				typeid: -1,
				tradelist: [],
				loadStatus: 'loadmore', //加载样式：loadmore加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore: false, // 是否加载中
				islastPage: false,
				isRefresh: false,
				comfireColor:'#333333'
			};
		},
		methods: {
			loadmore() {

			},
			todetail(item) {
				uni.navigateTo({
					url: './tradingRecordDetail?id=' + item.id
				})
			},
			selectType(index){
				
				this.type = this.typeData[index].text;
				if(index == 0) this.typeid = -1;  //：0：收入 1 支出 2提现 -1:代表全部
				else if(index == 1) this.typeid = 0;
				else if (index == 2) this.typeid = 1;
				else if (index == 3) this.typeid = 2;
				this.refreshData();
				
			},
			confirmTime(e){
				this.time = e.year +'-'+e.month;
				
				console.log(getCurrentMonthLast(this.time));
				
				let starT = this.time+'-01 00:00:00';
				let endT = getCurrentMonthLast(this.time) + ' 23:59:59';
				
				this.createtime = new Date(starT).getTime();
				this.endtime = new Date(endT).getTime();
				
				this.refreshData();
				
				//console.log(starT+'--'+'---'+endT+'==='+ this.createtime +'--'+this.endtime);
			},
			refreshData(){
				this.pagenum = 1;
				this.islastPage = false;
				this.tradelist = [];
				this.getList();
			},
			
			getList() {
				let param = {
					createTime: this.createtime,
					endTime: this.endtime,
					transactionTypeId: this.typeid,
					page: this.pagenum,
					size: this.pagesize
				}
				gettradelist(param).then(res => {
					if (this.isRefresh) {
						this.isRefresh = false;
						uni.stopPullDownRefresh();
					}
					if (res.code == 1) {
						this.islastPage = res.data.isLastPage;
						console.log('data--'+res.data);
						if (res.data.list.length > 0) {
							res.data.list.forEach(item => {
							
								item.createTime = formatDateTime(new Date(parseInt(item.createTime)), 'all');
								// let status = item.status;
								// if (!isEmpty(status) && item.transactionType == 2) {
								// 	//debugger;
								// 	if (status = 0) {
								// 		item.s = '#FB4760';
								// 	} else if (status == 1) {
								// 		item.s = '#00CD79';
								// 	} else if (status == 2) {
								// 		item.s = '#333333';
								// 	}
								// 	console.log("----"+item.s);
								// }
								this.tradelist.push(item);
							
							})
						}
						
				
					}



				})
			}

		},
		onReachBottom() {
			console.log(this.islastPage);
			if (this.islastPage) {
				this.loadStatus = 'nomore';
			} else {
				this.isLoadMore = true;
				this.pagenum = ++this.pagenum;
				this.loadStatus = 'loading';

				this.getList();
			}
		},
		onPullDownRefresh() {
			this.isLoadMore = false;
			this.isRefresh = true;
			this.pagenum = 1;
			this.islastPage = false;
			this.tradelist = [];
			this.getList();
		},
		onLoad() {
			this.time = doHandleMonth();
			let starT = this.time+'-01 00:00:00';
			let endT = getCurrentMonthLast(this.time) + ' 23:59:59';
			
			this.createtime = new Date(starT).getTime();
			this.endtime = new Date(endT).getTime();
			this.getList();
		},
		 

		created() {
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>

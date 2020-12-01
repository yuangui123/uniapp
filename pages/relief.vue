<template>
	<view style="background-color: #FFFFFF;">
		<view style="font-weight: 600;"><u-navbar :is-back="true" title="换班记录"></u-navbar></view>
		<view>

		</view>
		<view>
			<view @click="rigthbtn(item.starttime, item.endtime)" v-for="item in reliefdata" style="margin: 20upx 20upx; padding: 20upx 20upx;	border-bottom: 1px solid #E7E7E7;">
				<u-row gutter="12">
					<u-col span="3">开始时间:</u-col>
					<u-col span="9">{{ item.s }}</u-col>
				</u-row>
				<u-row gutter="12">
					<u-col span="3">结束时间:</u-col>
					<u-col span="9">{{ item.d }}</u-col>
				</u-row>
				<u-row gutter="12">
					<u-col span="3">订单总数:</u-col>
					<u-col span="7">{{ item.totalcount }}单</u-col>
					<u-col span="2"><u-icon name="arrow-right"></u-icon></u-col>
				</u-row>

				<u-row gutter="12">
					<u-col span="3">加油金额:</u-col>
					<u-col span="9">{{ item.originalsum }}</u-col>
				</u-row>
			</view>
		</view>
		<view>  <!--loading加载提示处-->
			<uni-load-more v-if="reliefdata.length != 0" :status="loadStatus" ></uni-load-more>
		</view>
	</view>
</template>

<script>
	
import { getStores} from '@/common/utils.js';
import { getrelief } from '@/api/oil_station.js';
import { formatDateTime } from '@/common/utils.js';
 
export default {
	data() {
		return {
			page:1,
			pagesize:10,
			loadStatus:'more',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
			isLoadMore: false, // 是否加载中

			keyword: '',
			isRefresh: false,
			reliefdata:[]
			// reliefdata:[{
			// 	// endtime:'',
			// 	// originalsum:'',
			// 	// starttime:'',
			// 	// totalcount:'',
			// },
			// ]
		};
	},
	onPullDownRefresh() {
	  this.page = 1;
	  this.isRefresh = true;
	  this.getrelief('a');
	 },
	 onReachBottom(){  //上拉触底函数
	 	// if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
	 	// 	this.isLoadMore=true
	 	// 	this.page += 1
	 	// 	this.getrelief('b')
	 	// }
		if(this.loadStatus == 'more'){  //此处判断，上锁，防止重复请求
						this.page+=1
						this.getrelief('b')
					}
	 },
	methods: {
	
		getrelief(val){
		 this.loadStatus = 'loading'
			// debugger
			this.$this=this;
			getrelief({
				 endtime:this.endtime,
				 starttime:this.starttime,
				 pagenum: this.page,
				pagesize: this.pagesize	
				}).then(res=>{
					if(res.code==1){
						if(this.isRefresh){
						  this.isRefresh = false;
						uni.stopPullDownRefresh();
						}
						console.log(res)
						
						res.data.list.forEach(item => {
							// debugger;
							item.s = formatDateTime(new Date(parseInt(item.starttime)), 'all');
							item.d = formatDateTime(new Date(parseInt(item.endtime)), 'all');
							
						})
						if(val == 'b'){
							if(res.data.list.length > 0){
								res.data.list.forEach(item =>{
									this.reliefdata.push(item);
								})
							}
							
						}else if(val == 'a'){
							this.reliefdata = res.data.list
						}
					this.loadStatus = 'more'
						
					}
					if (res.data.hasNextPage==false) {
					    this.loadStatus = 'nomore';
						}
			})
		},
		rigthbtn(starttime,endtime) {
			uni.navigateTo({
				url: '/pages/details?s='+starttime+'&d='+endtime

			});
		}
	},
	created() {
		//页面创建完毕 调用的函数
		this.getrelief('a');
			// var date = new Date();
		// this.reliefdata.starttime=date.toLocaleDateString();
	}

};
</script>

<style></style>

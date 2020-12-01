<template>	<view>		<view><u-navbar :is-back="true" :title="'经营统计—' + name" title-width="600"></u-navbar></view>		<view >			<u-row gutter="12" style="padding: 30upx 10upx;		border-top: 1px solid #e4e7ed;" >				<u-col span="1"></u-col>				<u-col span="7">					<u-row style="font-size: 30upx;">						开始时间:						<span style="padding-left: 30upx;">{{ dataType.startTimeStr }}</span>					</u-row>					<u-row style="font-size: 30upx;">						结束时间:						<sapn style="padding-left: 30upx;">{{ dataType.endTimeStr }}</sapn>					</u-row>				</u-col>
							<u-col span="4" style="font-size: 30upx;color: #007AFF;" >
					<view @click="dataType.show == true ? (dataType.show = false) : (dataType.show = true)">选择统计时间</view>
				</u-col>			
			
			</u-row>		</view>		<view style="padding: 30upx 20upx ; border-top:5px solid #e4e7ed;">			<u-table>				<u-tr class="u-tr">					<u-th class="u-th">油品</u-th>					<u-th class="u-th">订单数</u-th>					<u-th class="u-th">金额（元）</u-th>				</u-tr>				<u-tr class="u-tr" v-for="item in data1">					<u-td>{{ item.oilTypeName }}</u-td>					<u-td>{{ item.orderCount }}</u-td>					<u-td>{{ item.money }}</u-td>				</u-tr>
				<view v-show="data1 != null">
					<t-nodata></t-nodata>
				</view>			</u-table>		</view>		<view><u-calendar v-model="dataType.show" mode="range" @change="change"></u-calendar></view>	<t-copyright></t-copyright>
	</view></template><script>import { setStores, getStores, isEmpty, isPoneAvailable, cutChinese } from '@/common/utils.js';import { getgridData } from '@/api/oil_station.js';export default {	data() {		return {
			isRefresh: false,			data1: [],			dataType: {				date: [],				show: false,				startTimeStr: '-',				endTimeStr: '-',				name: ''			}		};	},	onPullDownRefresh() {
	  this.page = 1;
	  this.isRefresh = true;
	  this.getgridDatas();
	 },	methods: {
			getgridDatas() {
			// this.data1='';			this.$this = this;			let user = getStores('users');			this.name = user.name;
			let time1=this.dataType.startTimeStr+" 0:0:0 ";
			let time2=new Date(time1.replace(/-/g,'/')).getTime()
			let time3=this.dataType.endTimeStr+" 23:59:59";
			let time4=new Date(time3.replace(/-/g,'/')).getTime()
		 
		
		 
		 
			let param = {				"begintime":time2 ,				"endtime": time4			};
			console.log(param)
						getgridData(param).then(res => {
							if ((res.code = 1)) {
					if(this.isRefresh){
	         this.isRefresh = false;
			  uni.stopPullDownRefresh();
					}
					console.log(res)					this.data1 = res.data;
					// console.log(this.data1)				}			});		},		change(e) {			console.log(e);			this.dataType.date = e;			this.dataType.startTimeStr = e.startDate;			this.dataType.endTimeStr = e.endDate;
			this.data1=[];
			this.getgridDatas();		}	},	created() {		//页面创建完毕 调用的函数 本地时间把 Date 对象的日期部分转换为字符串:		this.getgridDatas();		var date = new Date();		date.setDate(1);		//toLocaleDateString
		
				this.dataType.startTimeStr = date.toLocaleDateString();		this.dataType.endTimeStr = new Date().toLocaleDateString();	}};</script><style></style>

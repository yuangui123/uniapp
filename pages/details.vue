<template>
	<view>
		<view><u-navbar :is-back="true" title="班次统计详情"></u-navbar></view>
		<view>
			<u-row gutter="12" style="padding: 10upx 10upx;border-top: 1px solid #e4e7ed;">
				<u-col span="2"></u-col>
				<u-col span="10">
					<u-row style="font-size: 30upx;">开始时间: {{ startTimeStr }}</u-row>
					<u-row style="font-size: 30upx;">结束时间: {{ endTimeStr }}</u-row>
				</u-col>
			</u-row>
		</view>
	
		<view style="padding: 20upx 20upx ; ">
			<u-table>
				<u-tr class="u-tr">
					<u-th class="u-th">枪号</u-th>
					<u-th class="u-th">油品</u-th>
					<u-th class="u-th">笔数</u-th>
					<u-th class="u-th">金额（元）</u-th>
				</u-tr>
		    <u-tr class="u-tr" v-for="item in data1">
				<u-td class="u-td">{{ item.gusnum }}</u-td>
				<u-td class="u-td">{{ item.oiltypename }}</u-td>
				<u-td class="u-td">{{ item.totalcount }}</u-td>
				<u-td class="u-td">{{ item.calcsum }}</u-td>
			</u-tr>
		    <u-tr class="u-tr" v-if="data1.length > 0">
				<u-td class="u-td" width="50%">合计</u-td>
				<u-td class="u-td">{{totalNum}}</u-td>
				<u-td class="u-td">{{totalPrice}}</u-td>
			</u-tr>
				<t-nodata v-if="data1.length == 0"></t-nodata>
			<!-- 	<view v-if="data1 == null || data1.length ==0">
					<u-row gutter="12" >
							
					</u-row>
				</view> -->
				
			</u-table>
			
			
		</view>
		<t-copyright></t-copyright>
	</view>
</template>

<script>
import { getdetails } from '@/api/oil_station.js';
import { formatDateTime } from '@/common/utils.js';
 
export default {
	data() {
		return {
			isRefresh: false,
			startTime: '',
			endTime: '',
			startTimeStr: '',
			endTimeStr: '',
			data1: [],
			starttime:'',
			totalNum: 0,
			totalPrice: 0
		};
	},
	onPullDownRefresh() {
		this.page = 1;
		this.isRefresh = true;
		this.getdetails('b');
	},
 
	methods: {
		getdetails(val) {
			let $this = this;
			//this.data1 = [];
			let params = {}
			if($this.startTime){
				params.starttime = $this.startTime
			}
			
			if($this.endTime){
				params.endtime = $this.endTime
			}
			
			getdetails(params).then(res => {
			
				if ((res.code = 1)) {
					if ($this.isRefresh) {
						$this.isRefresh = false;
						uni.stopPullDownRefresh();
					}
					$this.data1 = res.data;
					if(val != 'b'){
						$this.data1.forEach(item => {
							$this.totalNum += item.totalcount
							$this.totalPrice += item.calcsum
						})
					}
					
					console.log(res);
				}
			});
			
		}
	},
	onLoad(opstion) {
		this.startTimeStr = "-"
		this.endTimeStr = "-"
		if(opstion.s){
			 
			this.startTime = opstion.s;
			this.startTimeStr = formatDateTime(new Date(parseInt(this.startTime)), 'all');
		}
	 
		if(opstion.d){
		 
			this.endTime = opstion.d;
			this.endTimeStr = formatDateTime(new Date(parseInt(this.endTime)), 'all');
		}
		
		
	
		this.getdetails('a');
	
	
	
	},
	created() {
		//页面创建完毕 调用的函数
		// var date = new Date();
		// this.reliefdata.starttime=date.toLocaleDateString();
	}
};
</script>

<style></style>

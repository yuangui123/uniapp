<template>
	<view>
		<view><u-navbar :is-back="true" :title="name"></u-navbar></view>
		<view style="padding: 20upx 30upx;"  >
			<u-row gutter="12">
				<u-col span="6">营业执照</u-col>
				<u-col span="6">{{businesSlicense}}</u-col>
			</u-row>
			<u-row gutter="12">
				<u-col span="6">移动电话</u-col>
				<u-col span="6">{{mobile}}</u-col>
			</u-row>
			<u-row gutter="12">
				<u-col span="6">营业时间</u-col>
				<u-col span="6">{{servicestime}}</u-col>
			</u-row>
			<u-row gutter="12">
				<u-col span="6">经营地址</u-col>
				<u-col span="6">{{address}}</u-col>
			</u-row>
		</view>
		<t-copyright></t-copyright>
	</view>
</template>

<script>
import { setStores, getStores, isEmpty, isPoneAvailable, cutChinese } from '@/common/utils.js';
import { getpagedetails } from '@/api/oil_station.js';
export default {
	data() {
		return {
		   businesSlicense:'',
		   mobile:'',
		   servicestime:'',
		   address:'',
			name:''
		};
	},
	methods: {
	getpagedetails(){
 	this.$this = this;
		let user = getStores('users');
		this.name = user.name;
		getpagedetails().then(res=>{
			if((res.code==1)){
				// console.log('111111111',res)
				$this.businesSlicense=res.data.businesSlicense;
				$this.mobile=res.data.mobile;
				$this.servicestime=res.data.servicestime;
				$this.address=res.dat.address;
				
			}
		})
	}
	},
	created() {
		//页面创建完毕 调用的函数
		this.getpagedetails();
	}
};
</script>

<style></style>

<template>
	<view>
		<!-- 必须要在template下 包一层ivew -->
		<u-navbar title="支付结果"  style="padding: 8px;"></u-navbar>

	<u-row gutter="12" justify="center"  style="padding: 8px;">
		 
		<u-col span=""><u-icon name="/static/img/over.png" label-pos="bottom" custom-style="" label="收款成功" :size="158"></u-icon></u-col>

	</u-row>
		 
	<u-row gutter="12" justify="center" style="padding: 8px;">
		<u-col span=""  class="price">￥{{price}}</u-col>
	</u-row>
	
	<u-row gutter="12"  style="padding: 8px;" >
		<u-col span="1" ></u-col>
		<u-col span="3" >油品类型</u-col>
		<u-col span="2" ></u-col>
		<u-col span="5"    text-align="right">{{oiltypeid}}</u-col>
		<u-col span="1" ></u-col>
	</u-row>
	<hr>
	<u-row gutter="12"  style="padding: 8px;" >
		<u-col span="1" ></u-col>
		<u-col span="3" >枪号</u-col>
		<u-col span="2" ></u-col> 
		<u-col span="5"    text-align="right">{{oilnum}}</u-col>
		<u-col span="1" ></u-col>
	</u-row>
	<hr>
	<u-row gutter="12" style="padding: 8px;"  >
 
		<u-col span="1" ></u-col>
		<u-col span="3" >交易时间</u-col>
		<u-col span="2" ></u-col> 
		<u-col span="5"    text-align="right">{{dateTime}}</u-col>
		<u-col span="1" ></u-col>
	</u-row>
	<hr>
	
	<u-row gutter="12" justify="center" style="padding: 20px;">
		<u-col span="5" text-align="right"><a @click="toPayCollection" style="text-decoration:none;" href="#">扫码收款</a></u-col>
		<u-col span="1"></u-col>
		<u-col span="5" ><a @click="goOrderList" style="text-decoration:none;" href="#" >交易订单</a></u-col>
	</u-row>
	
	<t-copyright></t-copyright>
	</view>
</template>

<script>
import wechat from '@/common/wechat.js';
var wx = require('jweixin-module');

export default {
	data() {
		return {
			//定义变量
			driver: { tjid: '501021', name: '袁玉德', tel: '152****1024' },
			oiltypeList:[{name:"0#",id:"1"},{name:"95#",id:"2"},{name:"10#",id:"3"},{name:"20#",id:"4"}],
			oilnumList:[1,2,3,4,5],
			oiltypeid: '-',//选中的油品id
			oilnum: '-',
			price: '0',
			dateTime: ''
		};
	},
	methods: {
		toPayCollection(){
		    // alert(2222)
		    wechat.onConfig({
		      apiList: ['scanQRCode'],
		      success: () => {
		        
		        wx.scanQRCode({
		          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
		          scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
		          success: function (res) {
		         var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
		         uni.navigateTo({
		          url: '/pages/payCollection?code='+result
		         });
		          }
		        }); 
		      },
		      error: (e) => {
		        uni.showToast({
		         icon:'none',
		         title:'请重试'
		        })
		      }
		    })
		 },
		// 跳转订单列表
		goOrderList() {
			uni.navigateTo({
				url: '/pages/oilOrder/oilOrder'
			});
		},
		//定义方法
		codeChange() {}
	},
	onLoad(option) {
		let list = JSON.parse(option.dataList)
		this.price = list.orderMoney;
		this.oiltypeid = list.oilTypeName;
		this.oilnum = list.gunNo;
		this.dateTime = list.orderCreateDate
	}
};
</script>

<style lang="scss">
 
    .price {
      font-family: PingFangSC;
      font-weight: 700;
      font-size: 18px;
      color: rgba(51, 51, 51, 1);
      font-style: normal;
      letter-spacing: 0px;
      line-height: 25px;
      text-decoration: none;
    }
	
</style>
	
 

<template>
	<view>
		<!-- 必须要在template下 包一层ivew -->
		<u-navbar title="收款"></u-navbar>

		<u-card title="司机基础信息" :padding="15">
			<view slot="body">
				<u-row>
					<u-col text-align="right" span="3">会员号：</u-col>
					<u-col span="9">{{ driver.tjid }}</u-col>
				</u-row>
				<u-row>
					<u-col text-align="right" span="3">手机号：</u-col>
					<u-col span="9">{{ driver.mobile }}</u-col>
				</u-row>
				<u-row>
					<u-col text-align="right" span="3">姓名：</u-col>
					<u-col span="9">{{ driver.name }}</u-col>
				</u-row>




			</view>
		</u-card>

		<u-card title="选择油品" :padding="15">
			<view slot="body">
				<u-grid :col="4">
					<u-grid-item v-for="(item, i) in oiltypeList" :bg-color="postOiltypeid == item.oiltypeid ? 'rgba(0,208,124,1)' : '#F6F3F7'"
					 @click="selectOiltype(item)">
						{{ item.oiltypename }}
					</u-grid-item>
				</u-grid>
			</view>
		</u-card>

		<u-card title="选择油枪" :padding="15">
			<view slot="body">
				<u-grid :col="4">
					<u-grid-item v-for="(item, i) in oilnumList" :bg-color="postOilnum == item ? 'rgba(0,208,124,1)' : '#F6F3F7'"
					 @click="selectOilnum(item)">
						{{ item }}号枪
					</u-grid-item>
				</u-grid>

				<u-grid :col="1" v-if="oilnumList.length == 0">
					<u-grid-item>当前无枪号可选</u-grid-item>
				</u-grid>
			</view>
		</u-card>

		<u-card title="加油金额" :padding="15">
			<view slot="body">
				<u-row>
					<u-col>
						<u-input type="number" v-model="price" placeholder="请输入加油金额" @input="replaceInput" />
					</u-col>
				</u-row>
			</view>
		</u-card>

		<u-row>
			<u-col span="0.4"></u-col>
			<u-col span="11.2">
				<u-button @click="codeChange" type="success">确认加油</u-button>
			</u-col>
			<u-col span="0.4"></u-col>
		</u-row>


		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<!-- <u-tabbar  ><u-button type="success">确认加油</u-button></u-tabbar>
		 -->
		<u-toast ref="uToast" />
		<u-modal @confirm="confirmModal" title="操作提示" :show-title="true" v-model="showModal" :content="contentModal"
		 :show-cancel-button="false"></u-modal>
	</view>
</template>
 
<script>
	import {
		oilticketValidateorder,
		consumer,
		getBaiduTTSToken
	} from '@/api/oil_station.js';
	import {
		login,
		regist,
		smsSend,
		smsLogin
	} from '@/api/login.js';
	import {
		formatDecimal
	} from '@/common/utils.js'
	import wechat from '@/common/wechat.js';
	import Voice from '@/common/baidu_tts_cors.js';
	
	import {getStores} from '@/common/utils.js';
	var wx = require('jweixin-module');

	import Vue from 'vue';
	export default {
		data() {
			return {
				//定义变量
				oilSound:true,
				baiduTTSToken:null,
				showModalType: 1,
				showModal: false,
				contentModal: '',
				code: '', // 二维码
				price: '', // 价格
				/*****页面数据变量       代码框 开始*****/
				driver: {
					tjid: '-',
					mobile: '-',
					name: '-'
				},
				oiltypeList: [], //油品数据集合
				oilnumList: [], //油枪数据集合

				/*****页面数据变量       代码框 结束*****/

				/*****准备提交的数据变量  代码框 开始*****/

				postOiltypeid: -1, //选中的油品id
				postOilnum: -1 //选中的枪号

				/*****准备提交的数据变量  代码框 结束*****/
			};
		},
		methods: {
			changeValue(e) {
				let $this = this;
				this.$nextTick(function() {
					$this.price = formatDecimal(e, 2);
					$this.$forceUpdate()
				})
			},
			confirmModal() {
				if (this.showModalType == 0) {

					uni.redirectTo({
						url: '/pages/index'
					});
				}
			},
			// 确认加油
			codeChange() {
				let $this = this;
				if (this.postOiltypeid == -1 || this.postOilnum == -1) {
					this.showModalType = 1;
					this.showModal = true;
					this.contentModal = '油品类型为空或者未选抢号';
					return;
				}
				if (this.price == '') {
					this.showModalType = 1;
					this.showModal = true;
					this.contentModal = '价格不能为空';

					return;
				}
				uni.showLoading({
					title: "支付中..."
				})
				let parma = {
					qRcode: this.code,
					// qRcode : '972c7fb5657444e587039fef0e3c6f25',
					oiltypeid: this.postOiltypeid,
					gasnum: this.postOilnum,
					tjid: this.driver.tjid,
					inputamount: this.price
				}
				consumer(parma).then(res => {
					uni.hideLoading()
					
					
					if (res.code == 1) {
						
						
						uni.navigateTo({
							url: '/pages/payOver?dataList=' + JSON.stringify(res.data)
						});
						
						
						if($this.oilSound || $this.oilSound==''){
							Voice("旭油宝司机"+$this.postOilnum+"号枪，加油成功"+$this.price+"元",$this.baiduTTSToken)
							 
						}
						
					} else {
						this.showModalType = 1;
						this.showModal = true;
						this.contentModal = res.msg;
					}
				})
			},
			//定义方法

			/**
			 * 获取油站基本数据
			 */
			getInfo(qrcode) {
				let $this = this;

				// let qrcode = 'b94f1488efd54b8faec63beb0b6232b4'; //扫码成功的二维码   http://120.26.80.24:9824/doc/v1/index.html  app-生成油品业务付款二维码  申请
				oilticketValidateorder(qrcode).then(res => {
					//只处理 code=1的结果  code等于其他会自动弹出错误提示框

					if (res.code == 1) {
						$this.driver = res.data;
						$this.oiltypeList = res.data.stationOilpricetList;
						$this.getBaiduTTSToken();
					} else {
						$this.showModalType = 0;
						$this.showModal = true;
						$this.contentModal = res.msg;

					}
				});
			},
			getBaiduTTSToken() {
				let $this = this;

				getBaiduTTSToken().then(res => {
					 if(res.code ==1){
						 $this.baiduTTSToken = res.data.token
						 $this.oilSound = getStores('NoteStatus2');
						 if($this.oilSound || $this.oilSound==''){
						 	$this.oilSound= true;
						 	Voice("旭油宝司机准备加油",$this.baiduTTSToken)
						 }
					 }
					
				});
			},
			//*********************事件 方法体 开始*******************
			/**
			 * 选中油品事件
			 * @param {Object} item 选中的对象
			 */
			selectOiltype(item) {
				//debugger  或  console.log(item)  //可开启断点查看对象属性

				this.postOiltypeid = item.oiltypeid; //设置当前选中的油品
				// item.gunnos = '1,2,3'; // 暂时写死的值 等待后端传输
				//根据油品获取枪号
				this.oilnumList = item.gunnos.split(',');
				this.postOilnum = -1;
			},

			/**
			 * 选中油枪事件
			 * @param {Object} item 选中的对象
			 */
			selectOilnum(item) {
				this.postOilnum = item;
			},
			replaceInput(value) {
				
				this.price = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
				console.log('price=' + this.price)
				
			}

			//*********************事件 方法体 结束*******************
		},
		onLoad(option) {
			 
			
			this.code = option.code
			this.getInfo(this.code);
			
		},
		created() {
			//页面创建完毕 调用的函数
			// this.getInfo();

			/*
			wechat.onConfig({
					apiList: ['scanQRCode'],
					success: () => {
						 
						 wx.scanQRCode({
						   needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
						   scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
						   success: function (res) {
							 var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
							console.log(res)
						   }
						 }); 
					},
					error: (e) => {
						 console.log(e)
					}
			})
			*/
		}
	};
</script>

<style>
	.low {
		height: 50px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
		flex-direction: row;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		position: relative;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 998;
		box-sizing: content-box;
	}
</style>

<template>
	<view>
		<view style="font-weight: 600;"><u-navbar :is-back="true" title="意见反馈"></u-navbar></view>
		<view>
			<u-row gutter="12" style="background-color: #e8eaec;height: 80upx;">
				<u-col span="5" style="color: #666666;">*请选择反馈问题的类型</u-col>
				<u-col span="3"></u-col>
				
				<u-col span="4" style="color:#00A3FF ;" >
					<view @click="recordList">我的反馈记录
						</view></u-col>
			</u-row>
		</view>
		<view style="padding: 20upx 40upx;">
			<view>
				<u-checkbox-group>
					<u-checkbox v-model="checked" shape="circle" :label-disabled="false" active-color="#19be6b">功能异常: 现有功能无法正常使用</u-checkbox>
				</u-checkbox-group>
			</view>
			<view>
				<u-checkbox-group>
					<u-checkbox v-model="checked1" shape="circle" :label-disabled="false" active-color="#19be6b">性能体验: 白屏,卡顿,闪退,图片出不来</u-checkbox>
				</u-checkbox-group>
			</view>
			<view>
				<u-checkbox-group>
					<u-checkbox v-model="checked2" shape="circle" :label-disabled="false" active-color="#19be6b">商户终端异常: 无法支付,支付慢等</u-checkbox>
				</u-checkbox-group>
			</view>
			<view>
				<u-checkbox-group><u-checkbox v-model="checked3" shape="circle" :label-disabled="false" active-color="#19be6b">其他问题</u-checkbox></u-checkbox-group>
			</view>
		</view>
		<view style="border-top: 10px solid #e4e7ed;">

				<t-textarea  ref="textarea" :pl="placeholder" :len="maxlength" />
			
		</view>
		<view>
			<t-upload  	:action="action"   :max-size="6 * 1024 * 1024" max-count="3" @on-remove="onRemove"    @on-change="onChange"></t-upload>
			<span style="color:#BBBBBB;padding-left: 20upx;">照片格式:JPEG,PNG,单张图片大小不能超过2M。</span>
		</view>
		<view style="padding: 20upx 20upx;color:#BBBBBB;">
			本反馈会把发生问题的当前设备基础信息(如手机型号,系统版本,APP版本等)一起提交,版主定位问题.
		</view>
	 
		<view style="padding: 30upx 50upx;">
			<u-button type="success" @click="commitClick" >提交反馈</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
		<!-- <t-copyright></t-copyright> -->
	</view>
</template>

<script>
import {addFeedback} from '@/api/feedBackList.js'
import { login, regist, smsSend, smsLogin } from '@/api/login.js'
import wechat from '@/common/wechat.js'

import {  getSevenToken } from '@/api/user.js'
import { FileUtil } from '@/common/FileUtil'
import * as qiniu from 'qiniu-js'
import {  randomString } from '@/common/utils.js';

var wx = require('jweixin-module')

import Vue from 'vue'	
export default {
	data() {
		return {
			action:'#',
			fileList:[],
			fileListSize:0,
			value: '',
			type: 'textarea',
			border: false,
			maxlength:400,
			placeholder: '请详细描述您遇到的问题，上传页面阶梯帮助更快解决！',
			checked: true,
			checked1: false,
			checked2: false,
			checked3: false,
			
		};
	},
	methods: {
		onRemove(index, lists, name){
			let $this = this;
			$this.fileList.splice(index, 1);
			$this.fileListSize -=1;
			
		},
		 
		onChange(res, index, lists, name){
 
			let $this = this;
			let blobUrl = lists[index].url
			getSevenToken({
				type: 2
			}).then(ress => {
				if(ress.code == 1) {
			 
					FileUtil.blobString2Base64(blobUrl, (blobAsDataUrl) => {
						
						$this.fileListSize +=1;
						let blob = FileUtil.base64String2Blob(blobAsDataUrl)
					 
						this.uploadImage(blob, ress.data.token, {
							uphost: ress.data.domain,
							disableStatisticsReport: false
						}, (imgurl) => {
							 
							$this.fileList.push({"url":imgurl})
						})
						 
						 
					})
				}
			})
		},
		 
		
		uploadImage( file, token, config,callback) {
			let that = this
			qiniu.getUploadUrl(config, token).then(info => {
				let key = randomString(4) +'' + new Date().getTime()
 
				const observable = qiniu.upload(file, key, token, config)
				const observer = {
				  next(res) {},
				  error(err){
						console.log(err)
				  },
				  complete(res){
					 
					 callback('http://' + config.uphost + '/' + res.key) 
				  }
				}
				const subscription = observable.subscribe(observer)
			})
		},
		recordList() {
			uni.navigateTo({
				url: '/pages/baseSetting/feedBack/feedBackRecord'
			});
		},
		commitClick (){
			let $this = this;
			let checkedArr =[$this.checked,$this.checked1,$this.checked2,$this.checked3];
			let feedbacktypesArr =["功能异常: 现有功能无法正常使用","性能体验: 白屏,卡顿,闪退,图片出不来","商户终端异常: 无法支付,支付慢等","其他问题"];

			let feedbacktypes ='';
			
			for (var i=0;i<checkedArr.length;i++)
			{ 
				if(checkedArr[i]==true){
					feedbacktypes+= feedbacktypesArr[i]+"<br/> "
				}
			}
			
			if($this.fileListSize != $this.fileList.length){
				$this.$refs.uToast.show({
					title: '请等待图片上传完成！',
					type: 'error '
				});
				return
			}

			let param = {
				// feedbacktypes: '功能异常: 现有功能无法正常使用 <br/>性能体验: 白屏,卡顿,闪退,图片出不来',
				feedbacktypes:feedbacktypes,
				feedbackinfo: $this.$refs.textarea.content,
				feedbackphoto: JSON.stringify($this.fileList),
			}
			 

			addFeedback(param).then(res => {
			 
				//只处理 code=1的结果  code等于其他会自动弹出错误提示框  
				if(res.code==1){
					// $this.recordList()
					uni.navigateTo({
						url:'baseSetting/feedBack/feedBack'
					})
				}
				 
			})
			
			
		}
		
	}
};
</script>

<style></style>

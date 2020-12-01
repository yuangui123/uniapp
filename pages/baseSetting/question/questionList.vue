<template>
	<view >
		<u-navbar title="常见问题"></u-navbar>
		<u-cell-group>
			<view v-for="(item,index) in dataList" :key="index">
				<u-cell-item title="收款失败怎么办？" @click= "intoClick"></u-cell-item>
				
			</view>
		
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				dataList: [1,2,3,4,5]
			}
		},
		methods:{
				intoClick () {
					window.location.href='http://www.baidu.com';
				}
			
		}
		
	}
</script>

<style>
</style>

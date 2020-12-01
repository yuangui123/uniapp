<template>
	<view class="groups" :style="'width:'+theWidth+'px;'">
		<view class="groupBlock" >
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollTo"
			 scroll-with-animation="true">
				<view :key="index" :id="'k'+index" class="my_groupsItem" v-for="(item, index) in tabList" @click="itemClick(index)">
					<view 
						:class="index == value?'uni-tab-item uni-tab-active animated jello':'uni-tab-item'"
						:style="index == value?'color:'+activeColor+';background:'+bgColor+';font-size:130%;':'color:'+defaultColor+';background:'+bgColor+';font-size:90%;'">
						{{item.value | filterProps }}
					</view>
					<!-- <view :style="[{ left: barLeft + 'px', borderColor: activeColor }]" :class="back ? 'uni-tab-bar uni-tab-bar-backward' : 'uni-tab-bar uni-tab-bar-forward'"></view> -->
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				average: 0,
				back: false,
				scrollTo: ''
			};
		},
		filters: {
			filterProps(data) {
				if(data.name !=undefined)
					return data.name
				return data
			}
		},
		props: {
			value: {
				type: Number, //当前选中下标
				default () {
					return 10086;
				}
			},
			theWidth: {
				type: Number, //当前选中下标
				default: 0
			},
			tabList: {
				type: Array,
				default () {
					return [];
				}
			},
			bgColor: { //背景颜色
				type: String,
				default () {
					return '#FFFFFF';
				}
			},
			defaultColor: { //默认未选中文字颜色
				type: String,
				default () {
					return '#000000';
				}
			},
			activeColor: { //选中时文字颜色 线条颜色
				type: String,
				default () {
					return '#1e9fff';
				}
			},
			rangeKey: { // 当tabList为对象时 显示指定下标值
				type: String,
				default () {
					return '';
				}
			},
			scroll: { //横向滑动
				type: Boolean,
				default () {
					return false;
				}
			},
		},
		computed: {
			barLeft() {
				return (this.value * uni.upx2px(120)) + 5;
			},
			barRight() {
				let index = this.tabList.length - this.value ;
				return index * this.average;
			},
		},
		created() {
			this.average = 91 / this.tabList.length;
		},
		methods: {
			itemClick(index) {
				uni.vibrateShort({
					success: function() {
					}
				});
				this.scrollTo = 'k'+index
				if (this.value == index) return false;
				if (this.value > index) {
					this.back = true;
				} else {
					this.back = false;
				}
				// this.value = index;
				this.$emit('update:value', index);
				this.$emit('change', {
					index: index
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	.groups {
		position: relative;
		display: flex;
		flex-direction: row;
		font-size: 100%;
		height: 80upx;
		background-color: #fff;
		.groupBlock {
			height: 80upx;
			width: 100%;
			.scroll-h {
				width: 100%;
				height: 80upx;
				flex-direction: row;
				white-space: nowrap;
				.my_groupsItem {
					transition: all 0.6s;
					display: inline-block;
					flex-wrap: nowrap;
					padding: 0 0upx;
					view {
						height: 80upx;
						width: 80upx;
						box-sizing: border-box;
						transition: all 0.3s;
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
					}
					.uni-tab-active {
						color: #34A47B;
					}
					
					.uni-tab-scroll-active {
						border-bottom: 3px solid #34A47B;
					}
					
					.uni-tab-bar {
						width: 80upx;
						height: 3px;
						position: absolute;
						bottom: 0;
						border-bottom: 3px solid #34A47B;
					}
					
					.uni-tab-bar-forward {
						transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s;
					}
					
					.uni-tab-bar-backward {
						transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s, left 0.3s cubic-bezier(0.35, 0, 0.25, 1);
					}
				}
			}
		}
	}

// 	.uni-tab {
// 		overflow-x: scroll;
// 
// 		.uni-tab-item {
// 			text-align: center;
// 			box-sizing: border-box;
// 			// overflow: hidden;
// 			// display: flex;
// 			// align-items: center;
// 			// justify-content: center;
// 			// flex-wrap: nowrap;
// 			width: 400upx;
// 		}
// 
// 		.uni-tab-scroll-item {
// 			padding: 0px 12px;
// 		}
// 
// 		.uni-tab-active {
// 			color: #1e9fff;
// 		}
// 
// 		.uni-tab-scroll-active {
// 			border-bottom: 3px solid #1e9fff;
// 		}
// 
// 		.uni-tab-bar {
// 			height: 3px;
// 			position: absolute;
// 			bottom: 0;
// 			border-bottom: 3px solid #1e9fff;
// 		}
// 
// 		.uni-tab-bar-forward {
// 			transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s;
// 		}
// 
// 		.uni-tab-bar-backward {
// 			transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s, left 0.3s cubic-bezier(0.35, 0, 0.25, 1);
// 		}
// 	}
// 
// 	.uni-scroll-tab {
// 		overflow-x: scroll;
// 	}
</style>

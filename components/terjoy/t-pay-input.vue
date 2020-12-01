<template>
	<view  >
		<!-- <view class="u-padding-40">
			<u-button type="success"  >
				<u-icon name="red-packet"></u-icon>
				<text class="u-padding-left-10">立即支付</text>
			</u-button>
		</view>		 -->
		
 
		<u-keyboard 
			default=""
			ref="uKeyboard" 
			mode="number" 
			:mask="true" 
			:mask-close-able="false"
			:dot-enabled="false" 
			v-model="show"
			:safe-area-inset-bottom="true"
			:tooltip="false"
			@change="onChange"
			@backspace="onBackspace">
			<view>
				<view class="u-text-center u-padding-20 money" >
					<text class="u-font-40 u-padding-left-10" v-if="price==''">{{text}}</text>
					<text v-if="price!=''">{{price}}</text>
					<text v-if="price!=''"  class="u-font-20 u-padding-left-10">元</text>
					<view class="u-padding-10 close" data-flag="false" @click="show=false" >
						<u-icon name="close" color="#333333" size="28"></u-icon>
					</view>
				</view>
				<view class="u-flex u-row-center">
					<view class="u-char-box">
						<view class="u-char-flex">
							<input :disabled="disabledKeyboard" :value="valueModel" type="number" :focus="focus" :maxlength="maxlength" class="u-input" @input="getVal"/>
							<view v-for="(item, index) in maxlength" :key="index">
								<view :class="[breathe && charArrLength == index ? 'u-breathe' : '', 'u-char-item',
								charArrLength === index && mode == 'box' ? 'u-box-active' : '',
								mode === 'box' ? 'u-box' : '']" :style="{
									fontWeight: bold ? 'bold' : 'normal',
									fontSize: fontSize + 'rpx',
									width: width + 'rpx',
									height: width + 'rpx',
									color: inactiveColor
								}">
									<view class="u-placeholder-line" :style="{
											display: charArrLength === index ? 'block' : 'none',
											height: width * 0.5 +'rpx'
										}"
										v-if="mode !== 'middleLine'"
									></view>
									<view v-if="mode === 'middleLine' && charArrLength <= index" :class="[breathe && charArrLength == index ? 'u-breathe' : '', charArrLength === index ? 'u-middle-line-active' : '']"
									 class="u-middle-line" :style="{height: bold ? '4px' : '2px', background: charArrLength === index ? activeColor : inactiveColor}"></view>
									<view v-if="mode === 'bottomLine'" :class="[breathe && charArrLength == index ? 'u-breathe' : '', charArrLength === index ? 'u-buttom-line-active' : '']"
									 class="u-bottom-line" :style="{height: bold ? '4px' : '2px', background: charArrLength === index ? activeColor : inactiveColor}"></view>
									<block v-if="!dotFill"> {{ charArr[index] ? charArr[index] : ''}}</block>
									<block v-else>
										<text class="u-dot">{{ charArr[index] ? '●' : ''}}</text>
									</block>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="u-text-center u-padding-top-10 u-padding-bottom-20 tips"></view>
			</view>
		</u-keyboard>
	</view>
</template>

<script>
	/**
	 * messageInput 验证码输入框
	 * @description 该组件一般用于验证用户短信验证码的场景，也可以结合uView的键盘组件使用
	 * @property {Boolean} show 是否显示  显示必须要先false 在true  关闭必须要先true在false
	 * @property {String Number} price 支付价格
	 * @property {String Number} maxlength 输入字符个数（默认4）
	 * @property {Boolean} dot-fill 是否用圆点填充（默认false）
	 * @property {String} mode 模式选择，见上方"基本使用"说明（默认box）
	 * @property {String Number} value 预置值
	 * @property {Boolean} breathe 是否开启呼吸效果，见上方说明（默认true）
	 * @property {Boolean} focus 是否自动获取焦点（默认false）
	 * @property {Boolean} bold 字体和输入横线是否加粗（默认true）
	 * @property {String Number} font-size 字体大小，单位rpx（默认60）
	 * @property {String} active-color 当前激活输入框的样式（默认#2979ff）
	 * @property {String} inactive-color 非激活输入框的样式，文字颜色同此值（默认#606266）
	 * @property {String | Number} width 输入框宽度，单位rpx，高等于宽（默认80）
	 * @property {Boolean} disabled-keyboard 禁止点击输入框唤起系统键盘（默认false）
	 * @event {Function} change 输入内容发生改变时触发，具体见官网说明
	 * @event {Function} finish 输入字符个数达maxlength值时触发，见官网说明
	 * @example <u-message-input mode="bottomLine"></u-message-input>
	 */
	export default {
		name: "t-message-input",
		props: {
			text:{
				type: [String],
				default: ''
			},
			price:{
				type: [Number, String],
				default: ''
			},
			show:{
				type: Boolean,
				default: false
			},
			// 最大输入长度
			maxlength: {
				type: [Number, String],
				default: 6
			},
			// 是否用圆点填充
			dotFill: {
				type: Boolean,
				default: false
			},
			// 显示模式，box-盒子模式，bottomLine-横线在底部模式，middleLine-横线在中部模式
			mode: {
				type: String,
				default: "box"
			},
			// 预置值
			value: {
				type: [String, Number],
				default: ''
			},
			// 当前激活输入item，是否带有呼吸效果
			breathe: {
				type: Boolean,
				default: true
			},
			// 是否自动获取焦点
			focus: {
				type: Boolean,
				default: false
			},
			// 字体是否加粗
			bold: {
				type: Boolean,
				default: false
			},
			// 字体大小
			fontSize: {
				type: [String, Number],
				default: 60
			},
			// 激活样式
			activeColor: {
				type: String,
				default: '#2979ff'
			},
			// 未激活的样式
			inactiveColor: {
				type: String,
				default: '#606266'
			},
			// 输入框的大小，单位rpx，宽等于高
			width: {
				type: [Number, String],
				default: '80'
			},
			// 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true
			disabledKeyboard: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			
			maxlength: {
				// 此值设置为true，会在组件加载后无需maxlength变化就会执行一次本监听函数，无需再created生命周期中处理
				immediate: true,
				handler(val) {
					   
					this.maxlength = Number(val);
				}
			},
			show: {
				// 此值设置为true，会在组件加载后无需maxlength变化就会执行一次本监听函数，无需再created生命周期中处理
				immediate: true,
				handler(val) {
					this.valueModel=''
					this.show = val;
				}
			},
			value: {
				immediate: true,
				handler(val) {
					// 转为字符串
					val = String(val);
					// 超出部分截掉
					this.valueModel = val.substring(0, this.maxlength);
				}
			}
		},
		data() {
			return {
			

				valueModel: ""
			}
		},
		computed: {
			// 是否显示呼吸灯效果
			animationClass() {
				return (index) => {
					if (this.breathe && this.charArr.length == index) return 'u-breathe';
					else return '';
				}
			},
			// 用于显示字符
			charArr() {
				return this.valueModel.split('');
			},
			charArrLength() {
				return this.charArr.length;
			}
		},
		methods: {
			onChange(value){
				if(this.valueModel.length<this.maxlength){
					this.valueModel += value;
				}
				
				
				// 判断长度是否超出了maxlength值，理论上不会发生，因为input组件设置了maxlength属性值
				if (String(this.valueModel).length > this.maxlength) return;
				// 未达到maxlength之前，发送change事件，达到后发送finish事件
				this.$emit('change', value);
 
				if (String(this.valueModel).length == this.maxlength) {
 
					this.$emit('finish', this.valueModel, this.price);
				}
				 
			},
			onBackspace(e){
				if(this.valueModel.length>0){
					this.valueModel = this.valueModel.substring(0,this.valueModel.length-1);
				}
			},
			getVal(e) {
					 
				let {
					value
				} = e.detail
				this.valueModel = value;
				// 判断长度是否超出了maxlength值，理论上不会发生，因为input组件设置了maxlength属性值
				if (String(value).length > this.maxlength) return;
				// 未达到maxlength之前，发送change事件，达到后发送finish事件
				this.$emit('change', value);
				if (String(value).length == this.maxlength) {
				
					this.$emit('finish', value);
				}
			}
		}
	}
</script>

<style scoped lang="scss">
 

	@keyframes breathe {
		0% {
			opacity: 0.3;
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 0.3;
		}
	}

	.u-char-box {
		text-align: center;
	}

	.u-char-flex {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		position: relative;
	}

	.u-input {
		position: absolute;
		top: 0;
		left: -100%;
		width: 200%;
		height: 100%;
		text-align: left;
		z-index: 9;
		opacity: 0;
		background: none;
	}

	.u-char-item {
		position: relative;
		width: 90rpx;
		height: 90rpx;
		margin: 10rpx 10rpx;
		font-size: 60rpx;
		font-weight: bold;
		color: $u-main-color;
		line-height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.u-middle-line {
		border: none;
	}

	.u-box {
		box-sizing: border-box;
		border: 2rpx solid #cccccc;
		border-radius: 6rpx;
	}

	.u-box-active {
		overflow: hidden;
		animation-timing-function: ease-in-out;
		animation-duration: 1500ms;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		border: 2rpx solid $u-type-primary;
	}

	.u-middle-line-active {
		background: $u-type-primary;
	}

	.u-breathe {
		animation: breathe 2s infinite ease;
	}

	.u-placeholder-line {
		display: none;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 2rpx;
		height: 40rpx;
		background: #333333;
		animation: twinkling 1.5s infinite ease;
	}

	.u-animation-breathe {
		animation-name: breathe;
	}

	.u-dot {
		font-size: 34rpx;
		line-height: 34rpx;
	}

	.u-middle-line {
		height: 4px;
		background: #000000;
		width: 80%;
		position: absolute;
		border-radius: 2px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.u-buttom-line-active {
		background: $u-type-primary;
	}

	.u-bottom-line {
		height: 4px;
		background: #000000;
		width: 80%;
		position: absolute;
		border-radius: 2px;
		bottom: 0;
		left: 50%;
		transform: translate(-50%);
	}
	
	.money{
			font-size: 80rpx;
			color: $u-type-warning;
			position: relative;
			
			.close{
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				line-height: 28rpx;
				font-size: 28rpx;
			}
		}
		.tips{
			color:$u-tips-color;
		}
</style>

import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class KamiCountTo extends Vue {
	// 计数底数
	private number = 0;
	// 计数递增时间
	private timer = 0;
	// 递增基数
	private basePlus = 1;

	/**
	 * @type Number
	 * 目标数
	 */
	@Prop({
		type: [Number,String],
		default: 0
	})
	private num!: number | string;

	/**
	 * @type Number
	 * 计数完成时间（毫秒）
	 */
	@Prop({
		type: Number,
		default: 3000
	})
	private duration: number | undefined;

	/**
	 * @type String
	 * 自定义类名
	 */
	@Prop({
		type: String,
		default: ''
	})
	private customClass: string | undefined;

	@Watch('num', { immediate: true, deep: true })
	onPersonChanged(val: number, oldVal: number) {
		this.countTimer()
		this.count()
	}
	
	/**
	 * 计算起始数字到目标数字的时间  
	 * 如果递增/减的变化时间为1毫秒 提高每次递增/减的基数
	 */
	countTimer():void {
		this.timer = this.duration % (this.num - this.number) > 0?parseInt(this.duration / (this.num - this.number)) + 1: this.duration / parseInt(this.num - this.number)
		let distance = this.num - this.number
		if(this.timer < 0) {
			this.timer = this.timer * -1
		}
		if(distance < 0) {
			distance = distance * -1
		}
		if(this.timer == 1) {
			this.basePlus = parseInt(distance / 100)
		}
	}
	/**
	 * 递增/减数字
	 * 递归
	 */
	count():void {
		let that = this
		if(((this.number - this.num) < 1 && (this.number - this.num) > -1) || ((this.num - this.number) < 1 && (this.num - this.number) > -1)) {
			this.number = this.num
		}
		setTimeout(function() {
			if(that.number < that.num) {
				if(that.number + that.basePlus >= that.num) {
					that.number = that.num
				} else {
					that.number += that.basePlus 
					that.count()
				}
			} else {
				if(that.number - that.basePlus <= that.num) {
					that.number = that.num
				} else {
					that.number -= that.basePlus  
					that.count()
				}
			}
		}, this.timer)
	}
}

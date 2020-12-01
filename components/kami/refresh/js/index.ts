import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

/**
 * 下拉刷新组件（非列表）
 */
@Component
export default class KamiRefresh extends Vue {
	/**
	 * @type Number
	 * 是否是top
	 */
	@Prop({
		type: Number,
		default: 1
	})
	private isTop!: number;
	
	private isTranf: number = 0;
	private touchStart: string = '';
	private touchMove: string = '';
	private isEnd: number = 0;

	private refreshStart(e: MouseEvent) {
		if (this.isEnd == 0 && this.isTop == 1) {
			this.touchStart = e.changedTouches[0].pageY;
		}
	}
	private refreshMove(e: MouseEvent) {
		if (this.isEnd == 0 && this.isTop == 1) {
			var touchStart = this.touchStart,
				oldMove = this.touchMove,
				newMove = e.changedTouches[0].pageY;
			if (touchStart <= newMove) {
				var isTranf = touchStart > newMove ? 0 : newMove - touchStart;
				this.isTranf = isTranf;
				this.touchMove = e.changedTouches[0].pageY;
			}
		} else {
			this.isTranf = 0;
			this.isEnd = 0;
			this.touchStart = 9999;
		}
	}
	private refreshEnd(e: MouseEvent) {
		var that = this;
		if (this.isEnd == 0 && this.isTop == 1) {
			if (this.isTranf >= 150) {
				this.isEnd = 1;
				this.$emit('refresh');
			} else {
				this.isTranf = 0;
			}
		}
	}
	private endAfter() {
		this.isEnd = 2;
		setTimeout(() => {
			this.isTranf = 0;
			this.isEnd = 0;
		}, 600);
	}

	private get isTranform() {
		let isTranf = this.isTranf > 150 ? 150 : this.isTranf;
		let isTemp = `transform: translateY(${isTranf - 100}px);`;
		return isTemp;
	}

	private get isZoom() {
		let isTranf = this.isTranf > 125 ? 125 : this.isTranf;
		let isTemp = `zoom:${isTranf / 125};`;
		return isTemp;
	}
}

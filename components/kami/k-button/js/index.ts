import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component
export default class KamiButton extends Vue {
	// 是否点击按钮
	private touchBtn = false
	private offsetX = 0
	private offsetY = 0
	
	/**
	 * @type String
	 * 按钮内容
	 */
	@Prop({
		type: String,
		default: ''
	})
	private title:string | undefined;

	/**
	 * @type String
	 * 自定义类名
	 */
	@Prop({
		type: String,
		default: ''
	})
	private customClass:string | undefined;

	/**
	 * @type Boolean
	 * 是否禁止点击
	 */
	@Prop({
		type: Boolean,
		default: false
	})
	private disabled:boolean | undefined;
	
	/**
	 * @type Boolean
	 * 是否加载中
	 */
	@Prop({
		type: Boolean,
		default: false
	})
	private loading:boolean | undefined;

	/**
	 * 点击事件
	 * 向外抛出submit事件
	 */
	@Emit('submit') 
	public submit(e: MouseEvent) {
		if(this.disabled || this.loading) {
			return 
		}
		this.offsetY = e.target.y - e.target.offsetTop
		this.offsetX = e.target.x - e.target.offsetLeft
		this.touchBtn = true
		let that = this
		setTimeout(function() {
			that.touchBtn = false
		},200)
	}
}
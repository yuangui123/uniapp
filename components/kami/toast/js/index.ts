import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class KamiToast extends Vue {
	/**
	 * @type String
	 * 提示内容
	 */
	@Prop({
		type: String,
		default: '提示'
	})
	private content!: string;
	
	/**
	 * @type Boolean
	 * 是否显示
	 */
	@Prop({
		type: Boolean,
		default: false
	})
	private showPage!:boolean
	
	/**
	 * @type Number
	 * 显示时长(秒)
	 */
	@Prop({
		type: Number,
		default: 3
	})
	private duration!:number
}
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class KamiLoding extends Vue {
	/**
	 * @type String
	 * 显示内容
	 */
	@Prop({
		type: String,
		default: ''
	})
	private text!: string;
	
	/**
	 * @type Boolean
	 * 是否显示
	 */
	@Prop({
		type: Boolean,
		default: false
	})
	private showLoading!:boolean
}

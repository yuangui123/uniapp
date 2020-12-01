import {getStores} from '@/common/utils.js'
import kButton from '@/components/kami/k-button/index.vue'
export default {
	props: {
		showPage: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			// ***********页面参数*************
			info: {
				
			},
		}
	},
	components: {
		kButton
	},
	computed: {},
	filters: {
	},
	watch: {
	},
	methods: {
		toBack() {
			this.$emit('closeError',1)
		}
	},
	onLoad() {
	}
};

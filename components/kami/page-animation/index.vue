<script>
	import './index.css'
	export default {
		// #ifdef H5
		onLaunch: function() {
			this.showPages()
			this.$router.beforeEach((to, from, next) => {
				this.hide(next)
			})
			this.$router.afterEach(() => {
				setTimeout(this.showPages, 50)
			})
		},
		methods: {
			hide(callback) {
				const classList = document.querySelector('uni-page').classList
				classList.add('animation-before', 'animation-leave')
				classList.remove('animation-show')
				setTimeout(() => {
					classList.remove('animation-before', 'animation-leave')
					callback && callback()
				}, 1000)
			},
			showPages() {
				const classList = document.querySelector('uni-page').classList
				classList.add('animation-before')
				setTimeout(() => {
					classList.add('animation-enter', 'animation-after', 'animation-show')
					setTimeout(() => {
						classList.remove('animation-before', 'animation-after', 'animation-enter')
					}, 300)
				}, 20)
			}
		},
		// #endif
	}
</script>

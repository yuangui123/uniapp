import kamiMap from '@/common/map.js'

export function initAMap(plugins) {
	return kamiMap.AMap.init({
		key: "8831dfcb2bdb0d26b2f2f7f707c6c9fa",
		version: "2.0",
		plugins: plugins
	})
}
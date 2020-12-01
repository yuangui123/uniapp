import AMapLoader from "@amap/amap-jsapi-loader";
import { isEmpty } from '@/common/utils.js'

const kamiMap = {
	AMap: {
		
	}
}

// 初始化地图地图
const globalInitMap = (key, version, plugins) => {
	return AMapLoader.load({
		// apikey
		key: key, 
		// js版本
		version: version,
		//插件列表
		plugins: plugins 
	}).then(AMap => {
		return AMap;
	}).catch(e => {
		console.log(e);
	});
}

// poi搜索提示
const globalAutoCompile = (AMap, search, autoOptions) => {
	// AMap.plugin('AMap.AutoComplete', function() {
	// 	var autoComplete = new AMap.AutoComplete(autoOptions);
	// 	autoComplete.search(search, function(status, result) {
	// 		return result.tips
	// 	})
	// })
}


kamiMap.AMap.init = (loader) => {
	return globalInitMap(loader.key, loader.version, loader.plugins)
}

kamiMap.AMap.autoCompile = (options) => {
	return globalAutoCompile(options.AMap, options.search, options.autoOptions)
}

export default kamiMap;

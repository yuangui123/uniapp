var wx = require('jweixin-module')
const wechat = {
  weburl : 'http://nynew.ny256.net/weixin-service',
  version : '1.0.7',
	storeExpiration : 7 * 24 * 60 * 60 * 1000,
    store : {
      set: function(key, val, exp) {
          var stores = window.localStorage;
          if(stores) {
              stores.setItem(wechat.version + '_' + key, JSON.stringify({val:val, exp: exp || wechat.storeExpiration, time:new Date().getTime()}));
          }
      },
      get: function(key) {
        var stores = window.localStorage;
        if(!stores) {
            return null;
        }

        var json = stores.getItem(wechat.version + '_' + key);
        if (!json) {
            return null;
        }

        var info = JSON.parse(json);
        if (new Date().getTime() - info.time > info.exp) {
            return null;
        }

        return info.val;
      },
      remove: function(key) {
          var stores = window.localStorage;
          if(!stores) {
              return null;
          }

          stores.removeItem(wechat.version + '_' + key);
      }
    },
    randomString: function(length) {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
		if (!length) {
		 length = Math.floor(Math.random() * chars.length);
		}

		var str = '';
		for (var i = 0; i < length; i++) {
		 str += chars[Math.floor(Math.random() * chars.length)];
		}

		return str;
  	},
	onConfig : function(options) {
	    var me = this;
	   // var nonceStr = wechat.randomString(16),
          //timestamp = Date.parse(new Date()) / 1000,
         var url = location.href.split('#')[0];
        uni.request({
          method:'GET',
          dataType: 'post',
          url: me.weburl + "/api/unencrypt/createJsapiSignature",
		  data: {
			url: url
		  },
          success: function(data) {
			  let response = JSON.parse(data.data)
              wx.config({
                  beta: true,
                  debug: false,      // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  appId: response.data.appId,                // 必填，企业号的唯一标识，此处填写企业号corpid
                  timestamp: response.data.timestamp,               // 必填，生成签名的时间戳
                  nonceStr: response.data.nonceStr,          // 必填，生成签名的随机串
                  signature: response.data.signature,        // 必填，签名，见附录1
                  jsApiList: options.apiList          // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });

              if(options.success) {
                  wx.ready(options.success);
              }

              if(options.error) {
                  wx.error(options.error);
              }
          }
        });
	}
};

export default wechat

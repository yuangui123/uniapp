/**
 * 加密文件
 */
// *******************密钥对**********************
var secretSeed = "123456789012345678901234";
var APP_KEY_SEED = "terjoycht2014!@#";
var sessionKey = "68497025";
var APP_TYPE = "44";
var APP_VERSION = "583";
var APP_IVERSION = "2";
var sessionId = "9acf28b81c0521d763bf11603a11c15d";
// *******************密钥对**********************

import md5 from 'js-md5';

var CryptoJS = require('crypto-js');

// md5加密
export function addSecret(data) {
	return CryptoJS.MD5(data).toString();
}

export function md5Secret(data){
	return md5(data);
}

/**
 * 添加公共的头部信息
 */
export function addHeaders(headers) {
	headers["apptype"] = APP_TYPE
	headers["iversion"] = APP_IVERSION
	headers["versioncode"] = APP_VERSION
	return headers
}

/**
 * 添加公共的头部签名信息
 */
export function addHeadersSign(headers, sessionId, data, sessionKey) {
	headers["timestamp"] = parseInt(new Date().getTime() / 1000)
	headers["random"] = randomString(8)
	headers["sign"] = produceSign(sessionId, headers.timestamp, headers.random, data, sessionKey)
	headers["sessionid"] = sessionId
	return headers
}

/**
 * 进行base64解码
 * @param bs64
 * @returns {*}
 */
export function decodeBase64(bs64) {
  var decoded = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(bs64));
  return decoded;
}

/**
 * 进行3des解密，解密之前，会将密文进行base64解码
 * @param key
 * @param cryptedBs64
 * @returns {*}
 */
export function decodeBase64AndDecryptWith3Des(key, cryptedBs64) {
  if (key == null || key == '' || cryptedBs64 == null || cryptedBs64 == '') {
    return '';
  }
  var ckey = produce3DesKey(key);
  var result = CryptoJS.TripleDES.decrypt(
    cryptedBs64, CryptoJS.enc.Utf8.parse(ckey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
  return result.toString(CryptoJS.enc.Utf8)
}

/**
 * 用3des加密，结果采用base64编码返回
 * @param key
 * @param plainText
 * @returns {*}
 */
export function encryptWith3DesAndEncodeBase64(key, plainText) {
  if (key == null || key == '' || plainText == null || plainText == '') {
    return '';
  }
  var ckey = produce3DesKey(key);
  var result = CryptoJS.TripleDES.encrypt(plainText, CryptoJS.enc.Utf8.parse(ckey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return result.toString();
}


export function produceSessionKey(key) {
  return CryptoJS.MD5(APP_KEY_SEED + key).toString().toUpperCase();
}

/**
 * 进行base64编码
 * @param
 * @returns {*}
 */
export function encodeBase64(str) {
  var encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
  return encoded;
}


var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/***
 * 产生随机字符串
 * @param length
 * @returns {string}
 */
function randomString(length) {
  var res = "";
  for (var i = 0; i < length; i++) {
    var id = Math.ceil(Math.random() * 9);
    res += chars[id];
  }
  return res;
}

function produce3DesKey(key) {
  if (key == undefined || key == null || key == '')
    return secretSeed;
  if (key.length >= 24) {
    return key.substr(0, 24);
  }
  return key + secretSeed.substr(key.length);
}

/***
 * 根据给出的数据产生签名
 * @param sessionid
 * @param timestamp
 * @param random
 * @param crypted 加密之后的请求参数
 * @returns {string}
 */
function produceSign(sessionid, timestamp, random, crypted, sessionKey) {
  var arr = new Array();
  arr.push("sessionid=" + sessionid);
  arr.push("apptype=" + APP_TYPE);
  arr.push("iversion=" + APP_IVERSION);
  arr.push("versioncode=" + APP_VERSION);
  if (crypted != ""){
	  arr.push("data=" + crypted);
	}
    
  arr.push("timestamp=" + timestamp);
  arr.push("random=" + random);
  arr.push("secretkey=" + produceSessionKey(sessionKey));
  arr.sort();

  var signString = "[" + arr.join() + "]";
  return CryptoJS.MD5(signString).toString().toUpperCase();
}
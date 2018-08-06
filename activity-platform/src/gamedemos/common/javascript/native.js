import businessFit from '@flyme/business-fit/build/index';
var domUtils = require('./dom.js');
var service = require('./services.js');
var Constant = require('./constant.js');

function noop(){}

businessFit.util.callAndroid('stopProgress');

/**
 * 与客户端通信的Native接口的封装
 * @module Native
 */
var Native = {
  PKG_NAME: domUtils.getUrlParam('pkg') || '',
  APP_ID: domUtils.getUrlParam('appId')*1 || 0,
  VERSION: domUtils.getUrlParam('versionCode')*1 || '',
  APP_NAME: '',
  downloadUrl: 'http://cc.res.meizu.com/fileserver/activity/ad/'+domUtils.getUrlParam('filename')+'.apk',
  imeiCallbacks: [],
  allParams: businessFit.util.allParams,
  getAppInfo: function(pkgname, versionCode, appId){
    return {
      pkg: pkgname || this.PKG_NAME,
      vc: versionCode || this.VERSION,
      appId: appId || this.APP_ID
    };
  },
  installApp: function(packageName, versionCode, appId){
    var appInfo = this.getAppInfo(packageName, versionCode, appId);

    if(process.env.NODE_ENV !== 'production'){
      console.debug('start download package %s AppID %s',appInfo.pkg , appInfo.appId);
    }

    businessFit.installApp(appInfo.pkg, appInfo.vc, appInfo.appId, this.downloadUrl);
  },
  openApp: function(packageName){
    businessFit.openApp(packageName || this.PKG_NAME);
  },
  isAppInstalled: function(packageName, versionCode, simple, appId){
    var appInfo = this.getAppInfo(packageName, versionCode, appId);

    //4.5版本调用这个接口会触发下载状态回调函数
    var installInfo = businessFit.isAppInstalled(appInfo.pkg, appInfo.vc, simple, appInfo.appId);
    window.isInstalledExec = true;
    return installInfo;
  },
  getVersionCode: function(){
    return window.MzJavascriptInterface && MzJavascriptInterface.getVersionCode();
  },
  getNetworkType: function(){
    return businessFit.getNetworkType(true);
  },
  goTo: function(uri,spec, args){
    if(/^https?:/.exec(uri))
      window.open(uri);
    else if(/^javascript:/.exec(uri))
      location.href = uri;
    else{
      let apk = $.extend({turn_to_app_type:3, package_name:this.PKG_NAME, uri: uri, pkg: this.PKG_NAME},args);
      businessFit.goTo(uri,null,apk);
    }
  },
  getImei: function(callback){
    if(Native.IMEI){
      callback && callback(Native.IMEI);
      return Native.IMEI;
    }

    var imei = businessFit.getImei(function(imei){
      if(imei == 'error'){
        if(process.env.NODE_ENV !== 'production')
          console.error('Native.getImei: get Imei fail');
        return;
      }
      //TODO: imei for test
      if(process.env.NODE_ENV === 'develop'){
        imei = imei || 861936030010600;
      }
      service.imei = Native.IMEI = imei;
      callback && callback(imei);
    });

    return imei || 0;
  },
  isSupportCopy: function(){
    return businessFit.util.hasApi('setClipContent');
  },
  setClipContent: function(txt){
    return businessFit.util.callAndroid('setClipContent',txt);
  },
  checkNetWork: function(callback,options){
    var wifiType = businessFit.getNetworkType(true);

    options = options || {}

    if(wifiType == 1 || domUtils.getUrlParam('turnTo') == 'a'){
      setTimeout(callback, 16);
      return true;
    }else if(wifiType == 2){//TODO:test
      confirmDlg({
        title:'',
        clazz: options.clazz,
        content: options.content || `点击“${Constant.startBtnStr}”立即下载，建议在WiFi环境下参与本次活动。`,
        sureStr: options.sureStr || Constant.startBtnStr,
        cancelStr: '知道了',
        okCallback: function(){
          callback();
        },
        cancelCallback: options.cancelFn
      });
    }else if(!wifiType){
      alertDlg('请检查网络连接','');
    }
  },
  shareTo: function(params){
    params.appName = params.appName || 'com.tencent.mm.ui.tools.ShareToTimeLineUI';

    try{
      businessFit.util.callAndroid('share',params.appName,params.content,params.imgUrl, 0, params.title,params.url);
    }catch(e){ //TODO: 兼容部分版本如4.7.8返回版本号218，但实际版本号却低于202
      alertDlg('该版本不支持分享功能','');
    }
  },
  getAppVersionCode: function(appId, pkgName){
    return businessFit.util.callAndroid('getVersionCode', appId, pkgName);
  }
};

window.onWindowHide = window.onWindowChanged = window.notifyActivityState = noop;

Native.getImei();
service.sn = businessFit.util.allParams.sn;

//TODO: 开发时用
if(process.env.NODE_ENV === 'develop'){
  if(!window.EventJavascriptInterface && !window.ClientInterface){
    $.extend(Native,{
      // installApp: noop,
      isAppInstalled: function(){return domUtils.getUrlParam('isInstall')*1 || 0;},
      getNetworkType: function(){
        var wifiType = domUtils.getUrlParam('wifi');
        wifiType = wifiType !== null ? wifiType * 1 : 1;
        return wifiType;
      }
    });
  }
}

module.exports = Native;
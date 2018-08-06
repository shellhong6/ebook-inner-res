import util from '@flyme/business-fit/build/util';
import WeixinApi from './weixinApi.js';
import Constant from './Constant.js';

let dialog = require('@flyme/modaldialog');

util.callAndroid('stopProgress');

const CONSTANT_ABOUT_INSTALL_MAP = {
  NEVER_INSTALL_STATUS: 'neverInstallStatus',//未安装
  NEVER_INSTALL_TEXT: '安装',//未安装
  NEVER_UPDATE_STATUS: 'neverUpdateStatus',//未安装
  NEVER_UPDATE_TEXT: '更新',//未安装
  START_INSTALL_STATUS: 'startInstallStatus',//开始安装
  START_INSTALL_TEXT: '正在安装',//开始安装
  INSTALL_COMPLETE_STATUS: 'installCompleteStatus',//安装完成
  INSTALL_COMPLETE_TEXT: '打开',//安装完成
  DOWNLOADING_STATUS: 'downloadingStatus',//下载中
  DOWNLOADING_TEXT: '正在下载',//下载中
  DOWNLOAD_PAUSE_STATUS: 'pauseInstallStatus',//暂停
  DOWNLOAD_PAUSE_TEXT: '暂停',//暂停
  INSTALL_FAILURE_STATUS: 'installFailureStatus',//失败
  INSTALL_FAILURE_TEXT: '重试',//失败
  UPDATING_STATUS: 'updatingStatus',
  UPDATING_TEXT: '正在更新',
  DOWNUPDATESTATUS: 'downUpdateStatus',
  DOWNUPDATE_TEXT: '更新'//向下降级更新
};

let Native = {
  isAppStore: window.EventJavascriptInterface && !!EventJavascriptInterface.onInstallButtonClick,
  isBrowser: !!window.MzJavascriptInterface,
  isWeixin: ~window.navigator.userAgent.toLowerCase().indexOf("micromessenger"),
  share(data){

    if(this.isBrowser ){
      if(window.MzPrivateJavascriptInterface && MzPrivateJavascriptInterface.shareSdk){
        if(!this.isAppInstalled('com.tencent.mm', 0, true, '303016')){
          return dialog.alert('长按保存图片后可分享你的竞猜姿势哦');
        }
        MzPrivateJavascriptInterface.shareSdk('blog_type_wxfriends', 'share_type_pic',JSON.stringify({
          "share_title": '竞猜姿势大比拼',
          "share_description": '摆出玄学姿势，获得世界杯竞猜好运！',
          "share_url": location.href
        }), data);
        return true;
      }else{
        dialog.alert('请升级浏览器版本才能分享哦');
        return;
      }
    }
    if(!util.hasApi('shareDialog')){
      dialog.alert('请升级系统版本才能分享哦');
      return;
    }

    window.EventJavascriptInterface.shareDialog(JSON.stringify({
      icon_url: "https://i3.mzres.com/resources/appStore/collections/imgs/appstore-icon.png",
      h5_url: location.href,
      subject: Constant.shareTitle,
      description: Constant.shareDesc,
      page_name: location.href,
      callback: 'window.shareCallback',
      img_data: data.split('data:image/jpeg;base64')[1],
      data_type: 'img',
      package_name: 'com.tencent.mm',
      app_id: 303016
    }));

    return true;
  },
  getNetworkType: function(isNotStrict){
    if(!util.hasApi('getNetworkType')){
      return isNotStrict ? 1 : 2;
    }

    var type = util.callAndroid('getNetworkType'),
        ret;

    if(!type)
      return isNotStrict ? 1 : 2;

    switch(type){
      case 'none':
        ret = 0;
        break;
      case "wifi":
        ret = 1;
        break;
      default:
        ret = 2;
    }

    return ret;
  },
  getImei: function(cb){
    var commonParams;

    if(this.isAppStore){
      commonParams = util.callAndroid('getParams');
    }else{
      if(!!(commonParams = util.callAndroid('getIMEI'))){
        commonParams = '{"imei":"' + commonParams + '"}';
      }
    }

    commonParams = JSON.parse(commonParams || util.callAndroid('getCommonParameter') || '{"imei":""}');

    cb && cb(commonParams.imei);

    return commonParams.imei;
  },
  goTo: function(uri, pkg, appId){
    if(!this.isAppInstalled(pkg, 0, true, appId)){
      return this.goAppDetailPage(pkg);
    }
    let apk = $.extend({turn_to_app_type:3, package_name: pkg, uri: uri, pkg: pkg});
    this._goTo(uri,null,apk);
  },
  goAppDetailPage(pkg){
    if(this.isBrowser){
      return location.href = `mstore://details?package_name=${pkg}&source_apkname=com.meizu.mstore&source_info=2018fifa_bet`;
      // return window.open('https://i3.mzres.com/resources/appStore/browser/views/browser-detail.html?packageName=com.Qunar&app_id=303048&versionCode=0&business=2');
    }

    util.callAndroid('gotoAppInfoPage', pkg);
    // this._goTo(JSON.stringify({
    //   "action":"android.intent.action.VIEW",
    //   "packageName":"com.meizu.mstore",
    //   "uri": `market://details?id=${pkg}`,
    //   "bundle":{"String source_apkname":"com.meizu.mstore","String source_info":"2018fifa_bet"}
    // }));
  },
  _goTo: function(uri, spec, args){
    if(this.isBrowser){
      return location.href = uri;
    }
    let p = util.extend(util.getAllParams(), args) ;
    let json;
    try{
      json = JSON.parse(uri)
    }catch(err){
      json = {"action": "android.intent.action.VIEW", "uri": uri};
    }
    if(util.hasApi('startActivity')){
      let startRet = util.callAndroid('startActivity', JSON.stringify(json));
      if((typeof startRet == 'number' && startRet != 0) || (typeof startRet == 'boolean' && !startRet)){
        util.callAndroid('launchApp', p.pkg);
      }
      return startRet;
    }else{
      util.callAndroid('launchApp', p.pkg);
      return -1;
    }
  },
  getAppStatus: function(status) {
    let btnText = null,
      btnStatus = null;

    switch (status) {
      case 'NEED_UPDATE': //已安装 有更新
        btnText = CONSTANT_ABOUT_INSTALL_MAP.NEVER_UPDATE_TEXT;
        btnStatus = CONSTANT_ABOUT_INSTALL_MAP.NEVER_UPDATE_STATUS;
        break;
      case 'NOT_INSTALL':
        btnText = CONSTANT_ABOUT_INSTALL_MAP.NEVER_INSTALL_TEXT;
        btnStatus = CONSTANT_ABOUT_INSTALL_MAP.NEVER_INSTALL_STATUS;
        break;
      case 'PATCHED_FAILURE': //已安装 更新失败
      case 'TASK_ERROR': //下载错误
      case 'FAILURE': //安装失败
      case 'CANCEL': //安装取消
      case 'TASK_REMOVED': //下载错误
      case 'INSTALL_FAILURE': //安装失败
        btnText = CONSTANT_ABOUT_INSTALL_MAP.INSTALL_FAILURE_TEXT;
        btnStatus = CONSTANT_ABOUT_INSTALL_MAP.INSTALL_FAILURE_STATUS;
        this.setSpecInstalling(false);
        break;
      case 'INSTALL_START':
        btnStatus = CONSTANT_ABOUT_INSTALL_MAP.START_INSTALL_STATUS;
        btnText = CONSTANT_ABOUT_INSTALL_MAP.START_INSTALL_TEXT;
        break;
      case 'INSTALL_SUCCESS': //已安装 安装成功
      case 'INSTALLED': //已安装
        btnText = CONSTANT_ABOUT_INSTALL_MAP.INSTALL_COMPLETE_TEXT;
        btnStatus = CONSTANT_ABOUT_INSTALL_MAP.INSTALL_COMPLETE_STATUS;
        break;
      case 'TASK_RESUME':
      case 'TASK_WAITING':
        btnText = CONSTANT_ABOUT_INSTALL_MAP.DOWNLOADING_TEXT;
        btnStatus = CONSTANT_ABOUT_INSTALL_MAP.DOWNLOADING_STATUS;
        break;
      case 'TASK_STARTED':
      case 'TASK_CREATED'://和success一样，是超出下载数时会返回‘等待下载’
      case 'SUCCESS':
      case 'FETCHING': // 是等待下载
        btnStatus = CONSTANT_ABOUT_INSTALL_MAP.DOWNLOADING_STATUS;
        break;
      case 'PRE_DOWNLOAD': // 此状态跟暂停一致， 2017.10.27添加
      case 'TASK_PAUSED':
        btnText = CONSTANT_ABOUT_INSTALL_MAP.DOWNLOAD_PAUSE_TEXT;
        btnStatus = CONSTANT_ABOUT_INSTALL_MAP.DOWNLOAD_PAUSE_STATUS;
        break;
      case 'TASK_COMPLETED':
        btnText = CONSTANT_ABOUT_INSTALL_MAP.START_INSTALL_TEXT;
        btnStatus = CONSTANT_ABOUT_INSTALL_MAP.START_INSTALL_STATUS;
        break;
      // case 'FETCHING':
      //   btnText = CONSTANT_ABOUT_INSTALL_MAP.START_INSTALL_TEXT;
      //   btnStatus = CONSTANT_ABOUT_INSTALL_MAP.START_INSTALL_STATUS;
      //   break;
      default:
        btnStatus = status;
    }
    return [btnText, btnStatus];
  },
  /**
   * @param  {[boolean]} simple 决定返回值为布尔，true：已安装且为最新版，false:未安装
   * @return {Number}        [0：没有安装;1：已经安装最新版本;2：已经安装，但版本不是最新;3：正在安装;4: 暂停状态]
   */
  isAppInstalled: function(packageName, newVersionCode, simple, appId){
    if(this.isBrowser){
      let isInstall = util.callAndroid('isAppInstalled', packageName, newVersionCode);
      return simple ? isInstall == 1 : isInstall;
    }
    let installStatus = util.callAndroid('getAppState', packageName);
    let retVl = 0;
    /**
     * 应用商店6.12，6.13存在getAppState结果不正确的bug，这里特殊处理使用isAppInstalled
     *
     * @type {[type]}
     */
    let commonParams = util.callAndroid('getParams')
    if (commonParams) {
      try {
        commonParams = JSON.parse(commonParams);
        if (commonParams.vc >= 6012000 && commonParams.vc < 6014000 || newVersionCode == -1) {
          installStatus = util.callAndroid('isAppInstalled', packageName);
          return simple ? installStatus : installStatus*1;
        }
      } catch(e) {}
    }

    if(installStatus != null){
      installStatus = this.getAppStatus(installStatus);
      if(simple)
        return installStatus[1] == CONSTANT_ABOUT_INSTALL_MAP.INSTALL_COMPLETE_STATUS;
      else{
        switch(installStatus[1]){
          case CONSTANT_ABOUT_INSTALL_MAP.NEVER_UPDATE_STATUS:
            retVl = 2;
            break;
          case CONSTANT_ABOUT_INSTALL_MAP.NEVER_INSTALL_STATUS:
            retVl = 0;
            break;
          case CONSTANT_ABOUT_INSTALL_MAP.INSTALL_COMPLETE_STATUS:
            retVl = 1;
            break;
          case CONSTANT_ABOUT_INSTALL_MAP.DOWNLOADING_STATUS:
          case CONSTANT_ABOUT_INSTALL_MAP.START_INSTALL_STATUS:
            retVl = 3;
            break;
          case CONSTANT_ABOUT_INSTALL_MAP.DOWNLOAD_PAUSE_STATUS:
            retVl = 4;
            break;
        }
        return retVl;
      }
    }

    let versionCode = util.callAndroid('getVersionCode', appId, packageName);
    if(versionCode != null){

      if(versionCode > 0){

        if (!!newVersionCode) {

          if (versionCode >= newVersionCode)
            retVl = 1;
          else
            retVl = 2;

        } else {
            retVl = 1;
        }

      }

      simple && ( retVl == 1 ? (retVl = true) : (retVl = false));

      return retVl;
    }
    installStatus = util.callAndroid('isAppInstalled', packageName);
    return simple ? installStatus : installStatus*1;
  }
};

window.shareCallback = function(packInfo){
  let ret = JSON.parse(packInfo);

  if(ret.package_name)
    Native.Track.clickDoShare(ret.package_name);
}

if(Native.isWeixin){
  WeixinApi.initWinxiAuthorize();
}else if(Native.isAppStore || Native.isBrowser){
  $('body').addClass('is-mzapp');
}else{
  $('.save-tip em').text('截图分享你的竞猜姿势');
}

export default Native;
import Native from './native.js';
import domUtils from './dom.js';
import businessFit from '@flyme/business-fit/build/index';
import services from './services.js';
/** @module Mock */

/**
 * 对下载安装等的mock,方便调试
 * @namespace
 */
let Mock = {
  /**
   *
   * @param {int} time 多少秒下完应用
   */
  autoDownload(time = 10, failTime, installTime, isFail){
    let perTime = (time * 1000) / 100,
        pkg = this.pkg || domUtils.getUrlParam('pkg'),
        btnStatus = 0,
        passTime = 0;

    failTime = failTime * 1000;
    installTime = installTime * 1000;

    if(this.downloading)
      return;

    this.downloading = true;
    window.notifyAppStatus(pkg, null, true, 'STATE_PREPARING', 1);

    let _innerDownload = ()=>{
      setTimeout(()=>{
        passTime += perTime;
        window.notifyAppStatus(pkg, (btnStatus++) +'%', false, 'STATE_DOWNLOADING', 1);

        if(failTime <= passTime && isFail){
          this.downloading = false;
          return notifyStatus('STATE_DOWNLOAD_ERROR');
        }
        if(btnStatus < 100){
          _innerDownload();
        }else{
          this.stw(()=>{
            notifyStatus('STATE_DOWNLOAD_COMPLETE');
          }).then(()=>{
             return this.stw(()=>{
               notifyStatus('STATE_INSTALLING');
             },1000);
          }).then(()=>{
             return this.stw(()=>{
               Native.isAppInstalled = () => 1;
               this.businessFit.isAppInstalled = () => 1;
               notifyStatus('STATE_INSTALL_COMPLETE');
               this.downloading = false;
             }, installTime)
          })
        }
      }, perTime);
    }

    _innerDownload();

    function notifyStatus(status){
      window.notifyAppStatus(pkg, null, false, status, 1);
    }
  },
  stw(callback, time){
    return new Promise(function(resolve){
      setTimeout(()=>{
        resolve(callback());
      }, time || 1000);
    });
  },
  start(busfit){
    let debugDom = $('.debug');
    let downloadTime = domUtils.getUrlParam('downloadtime') * 1 || 30;
    let installTime = domUtils.getUrlParam('installTime') * 1 || 2;

    this.businessFit = busfit || businessFit;
    if(!debugDom.length){
      debugDom = $('<div class="debug"></div>');
      $('body').append(debugDom);
    }

    debugDom.append('<button id="debug-download">模拟下载</button>');
    debugDom.append('<button id="debug-download-fail">模拟下载失败</button>');
    debugDom.append('<button id="debug-close">关闭调试</button>');

    debugDom.find('#debug-download').click(()=>{
      this.autoDownload(downloadTime,null, installTime);
    });

    debugDom.find('#debug-download-fail').click(()=>{

      this.autoDownload(downloadTime, downloadTime / 2, installTime, true);
    });

    debugDom.find('#debug-close').click(()=>{

      $('.debug').remove();
    });

    let wifiType = domUtils.getUrlParam('wifi');

    if(!window.EventJavascriptInterface){
      if(wifiType !== null)
        this.businessFit.getNetworkType = ()=> wifiType*1;

      this.businessFit.isAppInstalled = () => domUtils.getUrlParam('isInstall')*1 || 0;

      this.businessFit.installApp = (pkg, vc, appId)=>{
        this.pkg = pkg;
        this.vc = vc;
        this.appId = appId;
      }

      services.isLogin = ()=> true;
    }
  }
};

module.exports = Mock;
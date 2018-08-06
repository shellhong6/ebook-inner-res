import {utils, Native, services} from 'commonModule';
var Track = require('./Track.js');
import businessFit from '@flyme/business-fit/build/index';

var downloadManage = {
  appSize: '',
  isDownloading: false,
  init(options){
    $.extend(this,options);
    businessFit.addListener(null,'notifyProgress',$.proxy(this.notifyProgress,this));
  },
  switchState: function(state){
    if(this.state === state)
      return;
    this.state = state;
  },
  hasState: function(state){
    return this.state == state;
  },
  canInstall: function(){
    var installInfo = Native.isAppInstalled(Native.PKG_NAME,Native.VERSION,false, Native.APP_ID);

    if(installInfo != 1){
      var isBoolean = (typeof installInfo == 'boolean');

      if(this.hasState('downloading'))
        return false;

      if((!isBoolean && installInfo*1 !== 3) || (isBoolean && !installInfo)){
        return true;
      }
    }
  },
  isLocalOpen: function(){
    var isLocalOpen = utils.getStorage('open');
    if(isLocalOpen == 'yes')
      return true;

    return false;
  },
  notifyProgress: function(el,evtObj){
    if(evtObj.pkg != null && evtObj.pkg != Native.PKG_NAME)
      return;

    if(process.env.NODE_ENV !== 'production'){
      console.debug(evtObj);
    }

    var btnTxt = evtObj.btnText,
        btnStatus = evtObj.btnStatus,
        limitTime = this.$scope.downloadingTimeout || 60000,
        self = this;
    var progress = btnTxt.replace('%','')*1;

    this.nowProgress = btnTxt;

//在这里检查是否第一次触发下载回调，因为应用商店会出现包提前下载完成，这时点击下载不会触发downloadingStatus，直接触发startInstallStatus
    if(!this.isDownloading){
      this.startDownload();
      this.isDownloading = true;
    }

    switch(btnStatus){
      case 'downloadingStatus':
        if(btnTxt == '正在下载' || btnTxt == '等待下载')
          btnTxt = '';

        this.setProgressTxt('正在下载... ' + btnTxt, evtObj);
        this.switchState('downloading');

        if(this.timer){
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(checkTimeout,limitTime);
        break;
      case 'startInstallStatus':
        this.setProgressTxt('安装中...', evtObj);
        break;
      case 'updatingStatus':
        this.setProgressTxt('更新中...', evtObj);
        break;
      case 'installCompleteStatus':
        this.switchState('open');
        this.setProgressTxt('安装完成', evtObj);
        Track.installStatus(true,evtObj.type);

        if(this.mainActivity.stateMachine.isState('endLottery'))
          this.mainActivity.stateMachine.run();
        break;
      case 'installFailureStatus':
        // if(!window.isInstalledExec)
          alertDlg('好像下载出了问题，请去检查一下','');
        if(!this.beforeLottery()){
          Track.installStatus(false,evtObj.type);
        }
      case 'neverInstallStatus'://下载失败时
        this.switchState('installFailure');
        break;
      case "pauseInstallStatus":
      case 'PRE_DOWNLOAD':
        if(this.timer){
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(checkTimeout,limitTime);
        break;
    }

    window.isInstalledExec = false;

    this.downloadNotify(evtObj);

    function checkTimeout(){
      if(btnTxt == self.nowProgress){
        self.switchState('installFailure');
        alertDlg('好像下载出了问题，请去检查一下','');
      }
      self.timer = null;
      self = null;
    }
  }
}

module.exports = downloadManage;
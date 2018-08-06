"use strict";
require('@flyme/activity-dialog/build/main.css');
var dialog = require('@flyme/modaldialog');
require('@flyme/activity-dialog')(dialog);
var notifyBackpress = require('@flyme/utils/src/appStoreClient/notifyBackpress.js')();

var service = require('./services.js');
var tools = require('./tools.js');
var utils = require('./utils.js');
var Native = require('./native.js');
var domUtils = require('./dom.js');
var Constant = require('./constant.js');

var TURN_TO = domUtils.getUrlParam('turnTo');

// var otherType = '其它'; //根据title的值判断奖品类型

notifyBackpress.isFinish = true;

dialog.config({
  useHash: true,
  copyTool: tools,
  notifyBackpress: notifyBackpress
});

var lastWinH = $(window).height();
if(TURN_TO == 'a'){
  let dlgTimer;
  dialog.afterListener(function(dialog){
    $(dialog.dialogDom).delegate('input,textarea','focus',function(){
      clearTimeout(dlgTimer);

      var charDlg = $(this).closest('.modal-dialog');
      charDlg.attr('oritop',charDlg.css('top'));
      charDlg.css('top','30px');

    }).delegate('input,textarea','blur',function(){
      var charDlg = $(this).closest('.modal-dialog'),
          oritop = charDlg.attr('oritop');

      if(oritop != null && oritop != ''){
        dlgTimer = setTimeout(function(){
          charDlg.css('top',oritop);
        }, 100);
      }
    });
  })
}else {
  $(window).on('resize',function(){
    var tempH = $(window).height(),
        $phone = $('.modal-dialog input'),
        lastDlg = $('.modal-dialog').last(),
        charDlg;

    var diaH = lastDlg.height();

    if($phone.length){
      charDlg = lastDlg;
      if(tempH > lastWinH){
        charDlg.css('top',charDlg.attr('oritop'));
      }else{
        var currTop = 0;
        if (tempH > diaH) {
          currTop = (tempH - diaH) / 2;
        }
        charDlg.attr('oritop',charDlg.css('top'));
        charDlg.css('top',currTop);
      }
    }
    lastWinH = tempH;
  });
}

if(process.env.NODE_ENV !== 'production'){
  var loadingNum = 0;
}

window.showLoading = function(){
  if(process.env.NODE_ENV !== 'production'){
    console.log('showloading=', loadingNum++);
  }
  dialog.showLoading();
}
window.hideLoading = function(){
  if(process.env.NODE_ENV !== 'production'){
    console.log('hideloading=',--loadingNum);
  }
  dialog.hideLoading();
}
window.alertDlg = dialog.alert;
window.confirmDlg = dialog.confirm;
window.alertRule = dialog.alertRule;
/** @module AwardDialog*/

/**
 * 提供各种奖品弹框的调用封装
 * @namespace AwardDialog
 */
var AwardDialog = {
  /**
   * 虚拟券中奖弹框
   * @param  {Object} data - /campaign/getCampaignInfo接口返回的该奖品的详情
   * @param  {Object} ret - 抽奖接口返回的被抽中的奖品的信息
   * @param  {Function} callback - 点击弹框的确认或取消按钮后执行的回调
   * @param  {string} title - 弹框标题
   */
  alertVirtualDlg: function(data,ret,callback,title){
    var redirectUrl = data.redirectUrl,
        self = this;

    var goCallback = function(){
      callback && callback();

      setTimeout(function(){
        self.virtualDlgCallback(redirectUrl,ret.voucher);
      },10);
    };

    dialog.alertElectronicDlg({
      voucher: ret.voucher,
      winMessage: data.winMessage,
      desc: data.desc,
      title: title
    }, goCallback,callback);
  },
  /**
   * 虚拟券中奖弹框点击确定按钮后内部自己调用的方法
   * @param  {string} redirectUrl - 跳转的url
   * @param  {string} voucher 虚拟券码
   */
  virtualDlgCallback: function(redirectUrl,voucher){
    setTimeout(function(){
      if(!Native.isAppInstalled(Native.PKG_NAME,Native.VERSION,true, Native.APP_ID)){
        alertDlg('请先下载安装,再去“我的奖品”打开兑换','');
        return;
      }

      if(!!redirectUrl){
        var url = redirectUrl;
        if(redirectUrl.indexOf('?') != -1){
          url += '&';
        }else{
          url += '?';
        }

        url += 'code='+ voucher;
        Native.goTo(url)
      }else{
        Native.openApp(Native.PKG_NAME);
      }
    }, 20);//加个超时，不然复制不了
  },
  /**
   * 没有抽到奖品时的未中奖弹框
   * @param  {object} data - /campaign/getCampaignInfo接口返回的该奖品的详情
   * @param  {Function} callback - 点击确定按钮的回调函数
   */
  alertNoWinDlg: function(data,callback){

    alertDlg({
      useBackground: false,
      title: '',
      content: data.desc,
      okCallback:callback,
      sureStr: '知道啦╭(╯^╰)╮'
    });
  },
  localSubmitPrizes:function(val, data){
    var storageName = 'submit_prize';
    var prizes = utils.getStorage(storageName) || {};
    if(typeof val == 'undefined'){
      return prizes;
    }else{
      prizes[val] = data || 1;
      utils.setStorage(storageName,prizes);
    }
  },
  /*alertOtherDlg: function(data,callback){
    confirmDlg({
      useBackground: false,
      content: templates.qqPrize(data),
      title: '中奖啦！',
      clazz: 'virtual-dlg prize-dlg',
      okCallback(){
        if(!Native.isAppInstalled(Native.PKG_NAME,Native.VERSION,true, Native.APP_ID)){
          alertDlg('请先下载安装,再去“我的奖品”打开兑换','');
          return;
        }
        Native.goTo(data.redirectUrl);
        callback && callback();
      },
      sureStr: '领取',
      cancelStr: '暂不领奖'
    });
  },*/
  /**
   * 抽奖之后显示抽奖结果的弹框
   * @param  {Object} data - /campaign/getCampaignInfo接口返回的该奖品的详情
   * @param  {Object} ret - 抽奖接口返回的被抽中的奖品的信息
   * @param  {Function} callback - 点击弹框的确认或取消按钮后执行的回调
   * @param  {string} title - 弹框标题
   */
  alertAwardDlg: function(data,ret,callback,title){
    var self = this,
        useRule = data.winMessage || '';

    data.winMessage = useRule.replace(/\r\n/g,'<br/>');

    if(ret)
      ret.id = ret.id || ret.prizeUnitId;

    if(!ret){
      this.alertNoWinDlg(data,callback);
    }else if(ret.type == "electronic"){
      // if(data.title === otherType)
      //   this.alertOtherDlg(data,callback);
      // else
        this.alertVirtualDlg(data,ret,callback,title);
    }else if(ret.type == "actual"){

      dialog.alertActualDlg({
        imgUrl: data.imgUrl,
        desc: data.desc,
        title: title
      },okFn,callback);

    }else if(ret.type == "mz_data_recharge" || ret.type == 'mz_money_recharge'){

      dialog.alertVirtualDlg({
          imgUrl: data.imgUrl,
          desc: data.desc,
          winMessage: data.winMessage,
          title: title
        },takeCharge,callback);

      function takeCharge(phone){
          self.doCharge(phone,ret,this,callback);
      }
    }else if(ret.type == 'life_movie_coupon'){
      dialog.alertTicketDlg({
        imgUrl: data.imgUrl,
        desc: data.desc,
        winMessage: data.winMessage,
        title: title
      },function(){
        ret.redirectUrl = data.redirectUrl;
        self.chargeMovieTicket(ret, callback);
      },callback);
    }

    function okFn(vals){
      self.doFillInfo(ret,vals);
      callback && callback();
    }
  },
  /**
   * 提交实物奖品的收件人的信息
   */
  doFillInfo: function(data,vals,msg){
    var name = vals[0],
        phone = vals[1],
        address = vals[2],
        self = this;

    service.fillInfo({
        prizeId: data.id,
        name: name,
        phone: phone,
        address: address
      },function(ret){
        if(ret){
          self.localSubmitPrizes(data.id);
          setTimeout(function(){
            alertDlg(msg || "地址填写成功",'');
          },16);
        }
      },function(data){
        if(data.code == '401'){
          return false
        }else{
          return true;
        }
      }
    );
  },
  /**
   * 充值话费或流量
   */
  doCharge:function(phone,ret,chargeDlg,callback){
    var self = this,
        sucessfulMsg,
        chargeName, requestFn;

    if(ret.type == 'mz_money_recharge'){
      requestFn = service.recharge_money;
      chargeName = '话费';
    }else{
      requestFn = service.recharge_data;
      chargeName = '流量';
    }

    requestFn.call(service,{
        prizeId: ret.id,
        phone: phone
      },function(data){
        if(data){
          self.localSubmitPrizes(ret.id, phone);
          setTimeout(function(){
            sucessfulMsg = '本次' + chargeName + '将在10分钟左右到账，请留意短信';
            alertDlg(sucessfulMsg, '领取成功');
          },16);
          callback && callback();
        }
      },function(data){
        if(data.code == '401'){
          return false
        }else{
          callback && callback();
          if(data.error)
            return true;
          else{
            window.alertDlg('领取失败，请稍后重试','');
          }
        }
    });
  },
  /**
   * 领取电影票
   */
  chargeMovieTicket: function(ret, callback){
    var self = this;

    if(!service.isLogin()){
      confirmDlg('登录Flyme账号才能领取哦~', function(){
        service.login();
      }, '', '去登陆');
      return true;
    }
    service.recharge_movie({
      prizeId: ret.id
    }, function(data){
      if(data){
        self.localSubmitPrizes(ret.id);
        confirmDlg('优惠券到账可能稍有延时哦~', function(){
          self.gotoLife(ret);
        }, '领取成功', '知道了', '立即使用');
        callback && callback();
      }
    }, callback);
  },
  /**
   * 跳转生活服务
   */
  gotoLife: function(ret){
    let lifePkgName = 'com.meizu.media.life',
        version = Native.getAppVersionCode(2063152, lifePkgName);

    if (version > 4000000) {
      Native.goTo(ret.redirectUrl, null, {
        package_name: lifePkgName,
        pkg: lifePkgName
      });
    } else {
      alertDlg('你的生活服务APP版本太低啦~\n请升级后前往“生活服务”并登录Flyme账户使用~');
    }
  },
  /**
   * 显示我的奖品弹框
   * @param  {object} $scope
   * @param  {array} $scope.prizesList - 奖品列表[{奖品组ID: 奖品组对象}, ...]
   * @param  {object} $scope.loseAward - 未中奖奖品组
   * @param  {boolean} canLottery - 有没有抽奖机会
   */
  getMyPrize: function($scope,canLottery){
    var self = this;
    service.getMyPrize(function(list){
      var targetAwardList = [];
      var hasGetPrizes = self.localSubmitPrizes();

      $.each(list,function(index,item){
        var targetAward = $scope.prizesList[item.prizeGroupId],
            awardItem,
            hascomfirmData;

        if(targetAward){
          hascomfirmData = hasGetPrizes[item.id];
          awardItem = $.extend({},targetAward,item,{hasconfirm: !!hascomfirmData});

          if(awardItem.type == 'actual'){

            awardItem.values = [awardItem.name, awardItem.phone, awardItem.address];

          }else if((awardItem.type == 'mz_data_recharge' || awardItem.type == 'mz_money_recharge') && awardItem.hasconfirm){
            awardItem.phone = hascomfirmData;
          }

          awardItem.name = awardItem.desc;
          targetAwardList.push(awardItem);
        }
      });

      if(targetAwardList.length){
        dialog.alertAwardList(targetAwardList,showAlert,null);

      }else{
        var loseItem = $scope.loseAward;
        if(canLottery){
          window.alertDlg('空空如也，快去参与活动吧!','');
        }else{
          AwardDialog.alertAwardDlg(loseItem);
        }
      }
    }, null, true);

    function showAlert(idx,item,data){

      if(item.type == 'electronic'){
        self.virtualDlgCallback(item.redirectUrl,item.voucher);
      }else if(item.type == 'actual'){
        self.doFillInfo(item,data)
      }else if(item.type == 'mz_data_recharge' || item.type == 'mz_money_recharge'){
        if(!item.hasconfirm)
          self.doCharge(data,item);
      }else if(item.type == 'life_movie_coupon'){
        if(!item.hasconfirm){
          self.chargeMovieTicket(item);
        }else{
          self.gotoLife(item);
        }
      }
    }
  },
  /**
   * 检测应用安装状态，并对除了已安装的其他状态进行弹框提示
   */
  confirmDownload: function(downloadManage){
    var installInfo = Native.isAppInstalled(Native.PKG_NAME,Native.VERSION,false, Native.APP_ID),
        canDownload;
    if(!downloadManage){
      canDownload = !installInfo;
    }else {
      canDownload = downloadManage.canInstall();
    }
    if(canDownload){
      confirmDlg({
        clazz: 'center-dlg',
        content: `请先下载安装“${Constant.APP_NAME}”再打开!`,
        title: '',
        okCallback: function(){
          Native.checkNetWork(()=>{
            Native.installApp(Native.PKG_NAME,Native.VERSION,Native.APP_ID);
          });
        }
      });

      return true;
    }else if(installInfo == 3){
      alertDlg({
        title: '',
        content: '应用正在下载安装中，请稍后再打开~'
      });

      return true;
    }

  }
};

module.exports = AwardDialog;

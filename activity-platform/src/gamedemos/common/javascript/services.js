var ajax = require('./ajax.js');
var utils = require('./utils.js');
import Constant from './constant.js';

function toLogin(loginUrl){
  if(loginUrl.indexOf('?') != -1){
    loginUrl += '&';
  }
  else{
    loginUrl += '?';
  }
  loginUrl = utils.replaceUrlParam(loginUrl,'useruri',window.location.href,true);
  window.location.href = loginUrl;
}

ajax.globalAjaxSettings.baseUrl = 'https://act-app.meizu.com';

$(document).on('ajaxSuccess',function(event,xhr,settings, data){
  if(data.code == 401){
    toLogin(data.value);
  }
});
/**
 * 与登陆无关的接口
 * @module httpService
 */
var httpService = {
  campaignId: Constant.campaignId,
  imei: '',//在native.js里面赋值
  sn: '',//在native.js里面赋值
  _CONTENT: {},
  content:function(key,value){
    if(typeof key == 'undefined')
      return this._CONTENT;
    else if(typeof value == 'undefined')
      return this._CONTENT[key];
    else
      this._CONTENT[key] = value;
  },
  getMyPrize: function(successcallback,failcallback){
     var params = {
      campaignId:this.campaignId,
      imei:this.imei,
      sn: this.sn
    };

    ajax.get('/campaign/myPrize',params,successcallback,failcallback);
  },
  /**
     * 领取流量、话费
     * @param awardId
     * @returns {boolean}
     */
  recharge_money: function (params,successcallback,failcallback) {
    params = $.extend({},{
      imei: this.imei,
      rechargeType: 'MONEY'
    },params);
    ajax.post('/campaign/mz/recharge.do',params,successcallback,failcallback);
  },
  recharge_data: function(params,successcallback,failcallback){
    this.recharge_money($.extend({rechargeType: 'DATA'},params),successcallback,failcallback);
  },
  getDraw: function(params,successcallback,failcallback){

    params = $.extend({},params,{
      campaignId: this.campaignId,
      imei:this.imei,
      sn: this.sn
    });
    ajax.post('/campaign/draw',params,successcallback,failcallback);
  },
  getTmpl: function(successcallback,failcallback){
    var params = {
          campaignId: this.campaignId
        };
    ajax.get('/static/campaign/getTmpl',params,successcallback,failcallback);
  },
  getCampaignInfo: function(successcallback,failcallback){
    var params = {
          campaignId: this.campaignId
        };
    ajax.get('/campaign/getCampaignInfo',params,successcallback,failcallback);
  },
  fillInfo: function(params,successcallback,failcallback){
    params = $.extend({},params,{
      imei:this.imei
    });
    ajax.post('/campaign/fillInfo',params,successcallback,failcallback);
  },
  getWinnerList: function(successcallback,failcallback){
    var params = {
          campaignId: this.campaignId
        };
    ajax.get('/campaign/winnerList',params,successcallback,failcallback);
  },
  getAdCpd: function(params,successcallback,failcallback){
    ajax.get('/campaign/getCpd', params,successcallback,failcallback);
  },
  getApps: function(successcallback,failcallback){
    var params = {
          campaignId: this.campaignId
        };
    ajax.get('/campaign/getApps',params,successcallback,failcallback);
  },
  login(){
  },
  isLogin(){
    return true;
  }
}

module.exports = httpService;

import OauthRequest from '@flyme/appstore-request';
var ajax = require('./ajax.js');

/**
 * 与登陆相关的接口
 * @module oauthService
 */
var oauthService = {
  getMyPrize: function(successcallback,failcallback, isShowLoading){
     var params = {
      campaignId:this.campaignId,
      imei:this.imei,
      sn: this.sn
    };

    ajax.oauthRequest('/campaign/oauth/myPrize',params,successcallback,failcallback, isShowLoading);
  },
  getDraw: function(params,successcallback,failcallback){

    params = $.extend({},params,{
      campaignId: this.campaignId,
      imei:this.imei,
      sn: this.sn
    });
    ajax.oauthRequest('/campaign/oauth/draw',params,successcallback,failcallback);
  },
  fillInfo: function(params,successcallback,failcallback){
    params = $.extend({},params,{
      campaignId: this.campaignId,
      imei:this.imei
    });
    ajax.oauthRequest('/campaign/oauth/fillInfo',params,successcallback,failcallback);
  },
  recharge_movie: function(params,successcallback,failcallback){
    params = $.extend({},params,{
      imei:this.imei,
      type: "LIFE_MOVIE_COUPON"
    });

    ajax.oauthRequest('/campaign/oauth/lifeService.do',params,successcallback,failcallback);
  },
  doMission: function(params,successcallback,failcallback){
    if(!params)
      return;

    params.campaignId = this.campaignId;

    ajax.oauthRequest('/campaign/oauth/doMission',params,successcallback,failcallback);
  },
  receiveReward: function(params,successcallback,failcallback){
    if(!params)
      return;

    params.campaignId = this.campaignId;

    ajax.oauthRequest('/campaign/oauth/receiveReward',params,successcallback,failcallback);
  },
  getCode: function(successcallback,failcallback){
    var params = {
          campaignId: this.campaignId
        };
    ajax.oauthRequest('/campaign/oauth/code',params,successcallback,failcallback);
  },
  login(){
    OauthRequest.login();
  },
  isLogin(){
    return OauthRequest.isLogined();
  }
}

module.exports = oauthService;

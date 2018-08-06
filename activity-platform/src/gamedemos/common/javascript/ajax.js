import OauthRequest from '@flyme/appstore-request';

OauthRequest.autoErrorAlert = function(mes, code){
  let errTip = mes ||  code;

  if(isNaN(errTip*1)){
    if (errTip == 'NoConnectionError') {
      errTip = '无网络连接，请检查网络设置哦';
    } else if (errTip == 'TimeoutError') {
      errTip = '网络超时，请稍后重试';
    }
    window.alertDlg(errTip);
  }
  window.doReport && doReport('oautherror', errTip);
};

var loadingTimer,ajaxCount=0;
/**
 * 提供了基础的ajax请求方法和使用客户端发起的oauthRequest请求方法
 * @module ajax
 */
var ajax = {
  globalAjaxSettings: {
    baseUrl: 'https://bro-dyn.flyme.cn',
    type: 'GET',
    // contentType: 'application/json',
    dataType : 'json',
    timeout : 60000,
    beforeSend:function(xhr, options){
      if(!this.showload)
        return;
      if(!ajaxCount){
        loadingTimer = setTimeout(function(){
          window.showLoading && window.showLoading();
          loadingTimer = 0;
        },500);
      }
      ajaxCount++;
    },
    complete:function(){
      this.context = null;
      if(!this.showload)
        return;
      ajaxCount--;
      if(!ajaxCount){
        clearTimeout(loadingTimer);
        if(loadingTimer === 0)
          window.hideLoading && window.hideLoading();
      }
    }
  },
  ajax:function(options,action,params,successcallback,failcallback){
    var options = $.extend({},this.globalAjaxSettings,
                    {
                      data:params,
                      success:function(data){
                        if(data.code == '200'){
                          successcallback && successcallback(data.value);
                        }else{
                          var ret = failcallback && failcallback(data,200);

                          if(data.code == '401')
                            return;
                          if(!failcallback || ret)
                            window.alertDlg(data.message || '网络错误，请稍后再试','')
                        }
                      },
                      error:function(xhr, type){
                        var error = xhr.responseText || type,
                            ret;
                        ret = failcallback && failcallback({error:error},xhr.status);
                        if(!failcallback || ret){
                          if(xhr.readyState == 0 || xhr.status == 502 || error == 'error' || error == 'abort')
                            error ='网络错误，请稍后再试';
                          setTimeout(function(){
                            window.alertDlg(error,'');
                          },100);
                        }
                      }
                    },options);

    options.url = options.baseUrl + action;
    options.context = options;
    $.ajax(options);
  },
  get:function(action,params,successcallback,failcallback,options){
    this.ajax($.extend({type:"GET"},options),action,params,successcallback,failcallback);
  },
  post:function(action,params,successcallback,failcallback,options){
    this.ajax($.extend({type:"POST"},options),action,params,successcallback,failcallback);
  },
  /**
   * 客户端登陆相关接口请求方法
   */
  oauthRequest(url, data, successcallback, failcallback, isShowLoading){
    if(process.env.NODE_ENV !== 'production'){
      console.log('oauthRequest ' + url);
    }
    if(process.env.NODE_ENV === 'develop'){
      //TODO:test
      if(typeof EventJavascriptInterface == 'undefined' || !EventJavascriptInterface.oauthRequest){
        return this.get(url, data, successcallback, failcallback);
      }
    }
    if(isShowLoading)
      window.showLoading && window.showLoading();

    OauthRequest.request({
      url: this.globalAjaxSettings.baseUrl + url,
      data: data,
      cb: function(res, id, origin){
        if(isShowLoading)
          window.hideLoading && window.hideLoading();

        if(process.env.NODE_ENV !== 'production'){
          console.log(url + " : " + JSON.stringify(res));
        }
        // window.hideLoading();
        if(res.code == 200){
          successcallback(res.value);
        }else{
          failcallback && failcallback(res, origin);
        }
      }
    });
  }
}
module.exports = ajax;

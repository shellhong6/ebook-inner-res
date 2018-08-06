import Constant from './Constant.js';

function wxOnReady(fn){
    if(typeof wx !== 'undefined'){
        fn&&fn()
    }else{
        setTimeout(function(){
            wxOnReady(fn);
        },300)
    }
}

const jsApiList = [
      'onMenuShareTimeline','onMenuShareAppMessage',
      "onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"
  ];

//TODO:test
const wechatAppId = '';

let WeixinApi = {
  initWinxiAuthorize(){
    $.ajax({
      type: 'GET',
      url: 'https://api-app.meizu.com/apps/public/external/wechat/sign',
      data: {
          url: location.href,
          appkey: wechatAppId,
          type: 'jsapi_ticket'
      },
      dataType: 'jsonp',
      success(res){
          var data = res.value;
          if(!data) {
              console.error('获取weixin接口失败');
          }else{
              wxOnReady(function(){
                  wx.config({
                      debug: false, // TODO 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                      appId: wechatAppId, // 必填，公众号的唯一标识
                      timestamp: data.timestamp, // 必填，生成签名的时间戳
                      nonceStr: data.nonce, // 必填，生成签名的随机串
                      signature: data.signature,// 必填，签名，见附录1
                      jsApiList: jsApiList.slice(0) // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                  });

                   let shareConfig = {
                      appId:0,
                      h5Url: location.href,
                      description: Constant.shareDesc,
                      iconImg:'https://act-app.mzres.com/resources/activity/2018fifa_bet/imgs/wxicon.png',
                      title: Constant.shareTitle,
                      type:'link'
                  };
                  WeixinApi.initShareListener(shareConfig);
              });
          }
      },
      error(xhr, type){
          alert('网络好像出了点意外~ 请稍后重试。','')
      }
    });
  },
  initShareListener(config) {
    wxOnReady(function() {
      wx.ready(function() { //分享
        let shareConfig = { //TODO 可配置化
          title: config.title, // 分享标题
          link: config.h5Url || location.href, // 分享链接
          imgUrl: config.iconImg, //'https://act-app.mzres.com/resources/activity/singleDog/imgs/shareImg.jpg', // 分享图标
          type: config.type || 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: config.dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空
          desc: config.description || '', //'测一测你的颜值会让多少人暗恋你？',
          success: config.successFn || function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: config.cancelFn || function() {
            // 用户取消分享后执行的回调函数
          }
        };

        jsApiList.forEach((action) => {
          wx[action](shareConfig);
        });
      });
    });
  }
}

export default WeixinApi;
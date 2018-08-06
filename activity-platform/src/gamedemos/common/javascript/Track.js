import flymeTrack from '@flyme/track';
import businessFit from '@flyme/business-fit/build/index';
import {debounce} from '../../common/lib/ba-throttle-debounce.js';
import Native from './native.js';
import utils from './utils.js';

const allParams = businessFit.util.allParams;

var business = allParams.business || 2;
var _from = allParams.from || 1;

flymeTrack.init(false);
flymeTrack.set('connectionType', businessFit.getNetworkType());

/**
 * 埋点的相关操作的封装
 * @module Track
 */
var Track = {
  commonParams: {
    appstore_activity_type: 1,
    flyme_business_source: business,
    appstore_block_source:1,
    date: utils.timeFormat(new Date,'yy/mm/dd'),
    from: _from,
    page: allParams.campaignId
  },
  baseExposure:function(name,extra){
    var params = $.extend({
          action: name,
          imei: Native.getImei()
        },this.commonParams,extra);

    this.transformParams && this.transformParams(params);

    flymeTrack.log(params);
  },
  log: function(datas){
    datas = $.extend({
        imei: Native.getImei()
      }, this.commonParams, datas);

    this.transformParams && this.transformParams(datas);

    flymeTrack.log(datas);
  },
  exposurePage: function(){
    this.baseExposure('exposure');
  },
  hitPlay: function(isInstall){
    this.baseExposure('hit_play', {user_type:isInstall});
  },
  installWeb: function(){
    this.baseExposure('install_web');
  },
  installStatus: function(isSuccess,type){
    type = type == null ? 1 : type;

    this.baseExposure('install_status_web', {
      status: isSuccess ? 1: 0,
      type: type
    });
  },
  openWeb: function(info) {
    this.baseExposure('open_web', info);
  },
  shoot: function(num){
    var extra;
    if(typeof num != 'undefined'){
      extra = {number: num};
    }
    this.baseExposure('hit_prize',extra);
  },
  clickArticle: function(url,title){
    this.baseExposure('click_article', {
      url: url,
      article_name: title
    });
  },
  exClick: function(){
    this.baseExposure('ex_dialog_notinstall');
  },
  exClickCommit: function(){
    this.baseExposure('ex_click_commit');
  },
  exClickCancel: function(){
    this.baseExposure('ex_click_cancel');
  },
  exposeWelfare: function(dom){
    var winH = $(window).height();
    var offsetCache = {},
        posArray,
        self = this;

    $(dom).forEach(function(item){
      var $item = $(item),
          offset = $item.offset(),
          temp = offsetCache[offset.top];

      if(!temp)
        temp = offsetCache[offset.top] = [];

      var $a = $item.find('a');
      temp.push({url:$a.attr('href'),title:$a.attr('title')});
    });

    posArray = Object.keys(offsetCache).sort(function(a,b){
      return a > b;
    });

    var _innerScroll = debounce(200,function (){
      var scrollY = window.scrollY,
          captureItems = [];

      posArray = posArray.filter(function(item,idx){
        if(winH + scrollY > item){
          captureItems.push({
            posY: item,
            datas: offsetCache[item]
          });
          return false;
        }
        return true;
      });

      if(captureItems.length){
        captureItems.forEach(function(item){
          item.datas.forEach(function(data){
            self.baseExposure('exposed_welfare', {
              url: data.url,
              article_name: data.title,
              pos: item.posY
            });
          });
        })
      }

      if(posArray.length == 0){
        $(window).off('scroll',_innerScroll);
      }
    });

    $(window).scroll(_innerScroll);
  }
};

function isEmpty(val){
  if(val == null || val === '')
    return true;
}

const pageSourceInfo = allParams.uxip_page_source_info || {}
let pushId = pageSourceInfo.push_id || allParams.pushId,
    block_name = pageSourceInfo.block_name || allParams.blockName,
    block_type = pageSourceInfo.block_type ||  allParams.blockType,
    block_id = pageSourceInfo.block_id || allParams.blockId;

if(!isEmpty(pushId))
  Track.commonParams['push_id'] = pushId;
if(!isEmpty(block_name))
  Track.commonParams['block_name'] = block_name;
if(!isEmpty(block_type))
  Track.commonParams['block_type'] = block_type;
if(!isEmpty(block_id))
  Track.commonParams['block_id'] = block_id;

Native.Track = Track;

let isExposure;

window.exposurePage = function(){
  if(!isExposure){
    isExposure = true;
    Track.exposurePage();
  }
}

export default Track;
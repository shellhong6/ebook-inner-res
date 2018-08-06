import flymeTrack from '@flyme/track';
import util from '@flyme/business-fit/build/util';
import Native from './Native.js';
import utils from 'commonJsDir/utils.js';

const allParams = util.getAllParams();

var business = Native.isWeixin ? 29 : (allParams.business || 2);
var _from = allParams.from || 1;

flymeTrack.init(false);
flymeTrack.set('connectionType', Native.getNetworkType());

let Track = {
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

    flymeTrack.log(params);
  },
  exposurePage: function(){
    this.baseExposure('exposure');
  },
  clickStart(){
    this.baseExposure('click_start');
  },
  exposureDemo(){
    this.baseExposure('exposure_demo');
  },
  clickDemostart(){
    this.baseExposure('click_demostart');
  },
  exposureGaming(){
    this.baseExposure('exposure_gaming');
  },
  clickTab(type){
    this.baseExposure('click_tab', {type: type+1});
  },
  clickStyle(type, pos, sex){
    this.baseExposure('click_style',{type: type+1, pos: pos + 1, sex});
  },
  clickCreate(){
    this.baseExposure('click_create');
  },
  clickBet(){
    this.baseExposure('click_bet');
  },
  clickShare(){
    this.baseExposure('click_share');
  },
  clickDoShare(name){
    this.baseExposure('click_doshare',{name: name});
  }
};

Native.Track = Track;

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

Track.exposurePage();

export default Track;
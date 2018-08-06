"use strict";
require('./css/index.less');

import eventEmitter from 'event-emitter';
import utils from 'commonJsDir/utils.js';
import {debounce} from '../common/lib/ba-throttle-debounce.js';
import WinChangedManage from '@flyme/utils/src/appStoreClient/WinChangedManage.js';
import publicLoadingDialog from '@flyme/loading-dialog';

import Constant from './js/Constant.js';

$.fn.fadeIn = function(){
    setTimeout(()=>{
      this.css({opacity:1, transition: 'opacity 0.3s ease-out'});
    }, 10);
}
window.showLoading = ()=>{
    publicLoadingDialog.startLoading({
      container: document.body
    });
}
window.hideLoading = ()=>{
    publicLoadingDialog.stopLoading();
};

/**
 * 基础localstorage存储操作
 */
let localStates = (storageName, key, val, defaultVal)=>{
    var states = utils.getStorage(storageName) || defaultVal;
  
    if(typeof key == 'undefined')
      return states;
    else if(key != null){
      if(typeof val == 'undefined')
        return states[key];
      else if(val === null)
        delete states[key];
      else
        states[key] = val;
    }else
      states = '';
  
    utils.setStorage(storageName,states);
  };
  /**
   * 存储应用状态 1: 已完成任务但还未抽奖 2:已抽奖
   */
  let localBtnState = (appId, val)=>{
    return localStates('_btsst', appId, val, {});
  };

var app = {
    firstPlay: true,
    init(){
        ActivityInfo.render({
            container: '.tip-menus'
        });

        this.bindEvents();

        this.isPopupGuideTip();

        require.ensure([],(require)=>{
            let {default:playAnimate, playBeginState, playFeedState} = require("./js/playAnimate.js");
            playBeginState().then((playBeginStateObj)=>{
              this.playBeginStateObj = playBeginStateObj;
            });
            playFeedState().then((playFeedStateObj)=>{
              this.playFeedStateObj = playFeedStateObj;
            });
        });

        this.initialFeedManager(11);
    },
    addFeed(){
        this.feedManager.addFeed();
    },
    doFeed(){
        this.feedManager.doFeed();
        this.playFeedEffect();
    },
    refreshGameLoading(){
        let count = 20;
    
        let _loop = ()=>{
          LoadingDialog.setProgress(count);
          if(++count <= 100){
            setTimeout(_loop, 30);
          }
        }
    
        setTimeout(_loop, 10);
    },
    isPopupGuideTip(){
        let isFirstLogin = utils.getStorage('_flg_')*1;
    
        if(!isFirstLogin){
          this.showGuideTip();
          utils.setStorage('_flg_', 1);
        }
    },
    playFeedEffect(){

        let firstPlay = this.firstPlay;
    
        if(this.playFeedStateObj)
          this.playFeedStateObj.play(()=>{
            this.playBeginStateObj && this.playBeginStateObj.play();
          }, ()=>{
            if(firstPlay && this.playBeginStateObj){
              this.playBeginStateObj.stop(true);
              this.firstPlay = false
            }
          });
    
        if(!firstPlay && this.playBeginStateObj)
          this.playBeginStateObj.stop(true);
    
    
    },
    showGuideTip(){
        $('body').addClass('show-guide-tip');
        $('.guide-okbtn').one('click', ()=>{
          $('body').removeClass('show-guide-tip');
        });
        window.scrollTo(0,0);
    },
    setTodayDisabled(isDisabled){
        if(isDisabled)
            $('.food-content').addClass('today-disabled');
        else
            $('.food-content').removeClass('today-disabled');
    },
    bindEvents(){
        let $feedBtn = $('.food-content');
    
        let clickFeedBtnFn = debounce(300, ()=>{
    
          if($feedBtn.hasClass('disabled')){
            this.showGuideTip();
            return;
          }
    
          if($feedBtn.hasClass('lottery-award')){
            // this.exchangePoints();
            this.setTodayDisabled(true);
            $feedBtn.addClass('disabled').removeClass('lottery-award');
            return;
          }
    
          this.doFeed();
          //TODO 此处触发事件传入接口
        //   services.consumePoints((datas)=>{
        //     if(datas.status == 1){
        //       this.feedManager.doFeed();
        //       this.playFeedEffect();
        //     }else{
        //       alertDlg('喂养失败');
        //     }
        //   })
        });
    
        $feedBtn.click(clickFeedBtnFn);
    
        let $tipMenus = $('.tip-menus');
        $('.tip-menu-btn').click(function(evt){
          $tipMenus.toggleClass('activied');
        });

        $('.signin-area').click((evt)=>{
            this.addFeed();
        });
    },
    initialFeedManager(signInAppId){
        let $feetBtn = $('.food-content');
    
        this.feedManager = new FeedManager($feetBtn, Constant.periodCount, {
          signInAppId
        });
        this.feedManager.on('updateFotter', (val)=>{
            $('.food-count').text(val);
        })
        .on('updatePeriodFeed', (val)=>{
            const remainCount = Constant.periodCount - val;
    
            if(!remainCount){
              $('.win-tip').text('点击右上角去“我的奖品”中查看奖品哦');
            }else
              $('.win-tip').text(`还需投喂${remainCount}次可领奖品`);
        })
        .on('updateFeedBtn',(canFeed, isFinishPeriod, isInit)=>{
            if(!isInit && isFinishPeriod){
    
            //   this.exchangePoints(true);
            }
    
            this.setTodayDisabled(isFinishPeriod)
    
        })
        .on('updateStage', (totalStageNum, isInit)=>{
            if(!isInit){
              let $curStage = $('.progress-stage li').eq(totalStageNum - 1);
    
              $curStage.addClass('ripple-animate');
            }
    
        }).on('lotteryAwardState', (isHitToday, canGetAward)=>{
            if(!isHitToday && canGetAward){
            //   this.failGetAward();
            }
        });
    },
    destroy(){
        
    },
}

class ActivityInfo{
    constructor(options){
      this.options = options;
  
      this.container = $(options.container);
  
      this.init();
      this.desc = '1、本活动有效时间：2017年6月15日-18日 \
      ↵2、话费中奖用户请按提示认真无误填写个人有效手机号码，活动话费由运营商统一充值到用户所填写的手机账户中，届时请留意运营商网厅查询结果，并以实际到账情况为准；虚拟运营商以及非实名制号码暂不支持充值，另外还有部分手机号码会因号段、套餐等运营商限制条件充值失败，请这部分用户在活动结束后，提供有效信息并更换号码反馈至客服处进行核实补发。\
      ↵3、实物中奖用户请保持所填手机号畅通，活动结束后将有工作人员致电确认中奖信息；奖品将于回访后一月内寄出，届时请注意查收快件。若客服及快递多次拨打电话24小时无回复，且活动结束后15天内未反馈至客服处，则视为自动放弃所中奖项。\
      ↵4、若因系统故障或其他不可抗力因素造成本活动未能按时进行，活动举办方有权调整活动时间或取消活动。 \
      ↵5、凡参与活动，视为已同意活动详情及相关条款，参与活动的用户所填写的所有信息不会用于任何商业用途，并禁止用户通过刷量或其他影响活动公平公正的作假行为，一经发现，活动主办方有权在不通知的情况下取消其中奖资格及相关奖品。'
    }
  
    init(options){
  
      this.container.delegate('.award-mine','click',
        debounce(300,function(evt){
          let $target = $(evt.target);
  
          if($target.closest('.disabled').length)
            return;
            //TODO 我的奖品列表
        //   AwardDialog.getMyPrize($scope,true);
        })
      ).delegate('.activity-desc','click', (evt)=>{
        let $target = $(evt.target);
  
        if($target.closest('.disabled').length)
          return;
  
        alert(this.desc);
      });
    }
    static render(options){
      return new ActivityInfo(options);
    }
}
  

class FeedManager{

    constructor(btn, count, options){
      this.options = options;
  
      this.$feedBtn = btn;
      //饲料数量
      this.fodderCount = this.localFotter() || 0;
      //已喂次数
      this.feededCount = this.localFeed() || 0;
      //某一个阶段内喂了多少次
      this.periodFeedCount = this.localPeriodFeed() || 0;
      //需喂养totalCount次才能抽奖
      this.totalCount = count;
  
      this.oldFeedState = null;
  
      this.hasSignInApp = !!options.signInAppId;
  
      this.isTodaySign = this.hasSignInApp ? (localBtnState(options.signInAppId) || 0) : 1;
  
      this._emmiter = eventEmitter();
  
      this.perProgressStep = 95 / count | 0;
  
      this.numPerStage = Math.ceil(count / 3);
  
      this.init();
  
      setTimeout(()=>{
        this._updateFeedBtn(true);
      }, 0);
  
      this.emitOnceData = {updateFotter: 'fodderCount', updateFeed: 'feededCount', updatePeriodFeed: 'periodFeedCount'};
    }
  
    init(){
      let localDate = utils.getStorage('lde'),
          curTime = Date.now(),
          isFeedEnd = this.isPeriodFeedEnd();
  
      if(this.compareDate(curTime, localDate)){
        if(isFeedEnd){
          this.localPeriodFeed(0);
        }
  
        if(this.hasSignInApp){
          this.isTodaySign = 0;
          localBtnState(this.options.signInAppId, 0);
        }
      }
  
      utils.setStorage('lde', curTime);
  
    //   if(services.isLogin())
    //     this.getRemoteDatas();
    }
  
    getRemoteDatas(){
      services.getMyPoints((ret)=>{
        let periodFeedCount = ret.consumePoints % this.totalCount;
  
        this.localFotter(ret.restPoints);
  
        this.localFeed(ret.consumePoints);
  
        if(!periodFeedCount && ret.todayConsume){
          periodFeedCount = this.totalCount;
        }
  
        this.localPeriodFeed(periodFeedCount);
  
        this.refresh();
  
        this._emmiter.emit('loaddatas');
      });
  
      services.getMyPrize((list)=>{
        let curTime = Date.now(),
            isHitToday;
  
        $.each(list, (idx, item)=>{
          if(this.compareDate(curTime, item.hitTime, true)){
            isHitToday = true;
          }
        });
  
        this.isHitToday = isHitToday;
  
        this._emmiter.emit('loaddatas');
      });
  
      let evecuteCount = 2;
  
      this._emmiter.on('loaddatas', ()=>{
        if(--evecuteCount <= 0)
          this._emmiter.emit('lotteryAwardState', this.isHitToday, this.periodFeedCount === this.totalCount);
      });
    }
  
    addFeed(){
  
      this.localFotter(this.fodderCount + 1);
  
      this._updateFeedBtn();
    }
  
    doFeed(){
      if(!this.canFeed())
        return;
  
      this.localFotter(this.fodderCount - 1);
  
      this.localFeed(this.feededCount + 1);
  
      this.localPeriodFeed(this.periodFeedCount + 1);
  
      this._updateFeedBtn();
  
      return true;
    }
  
    canFeed(){
      return this.periodFeedCount < this.totalCount && this.fodderCount > 0;
    }
  
    isPeriodFeedEnd(){
      return this.periodFeedCount == this.totalCount;
    }
  
  //不要在外部手动调用此方法，只能由doFeed方法或类初始化时内部调用
    _updateFeedBtn(isInit){
      let canFeed = this.canFeed();
  
      if(this.oldFeedState != canFeed || isInit)
        this._emmiter.emit('updateFeedBtn', canFeed, this.isPeriodFeedEnd(), isInit);
  
      this.oldFeedState = canFeed;
  
      if(!canFeed){
        this.$feedBtn.addClass('disabled');
      }else{
        this.$feedBtn.removeClass('disabled');
      }
  
      this.setProgress(isInit);
    }
  
    refresh(){
      this._updateFeedBtn(true);
    }
  
    compareDate(date1,date2, isEqual){
      var formatD1 = utils.timeFormat(date1,'yymmdd') * 1,
          formatD2 = utils.timeFormat(date2,'yymmdd') * 1;
  
      if(isEqual){
        if(formatD1 === formatD2)
          return true;
        return false;
      }
  
      if(formatD1 > formatD2)
        return true;
    }
  
    isSignIn(){
      return this.isTodaySign;
    }
  
    doSignIn(){
  
      if(this.isTodaySign)
        return;
  
      this.isTodaySign = true;
      return true;
    }
  
    setProgress(isInit){
      let {periodFeedCount, numPerStage, perProgressStep, totalCount} = this,
          totalStageNum = periodFeedCount / numPerStage | 0,
          isFinishFeed = periodFeedCount >= totalCount,
          tempTotalStageNum = isFinishFeed ? 3: totalStageNum;
  
      let $progressDots = $('.progress-stage li'),
          $progressLen = $('.progress-len');
  
      $progressDots.removeClass('finish-stage');
  
      while(--totalStageNum >= 0){
        if(totalStageNum != 2)
          $progressDots.eq(totalStageNum).addClass('finish-stage');
        else{
          $progressLen.removeClass('animate-progress-len');
        }
      }
  
      $progressLen.width((isFinishFeed ? 100 : periodFeedCount * perProgressStep) + '%');
  
      if(tempTotalStageNum > 0 && periodFeedCount % numPerStage === 0 || isFinishFeed){
        this._emmiter.emit('updateStage', tempTotalStageNum, isInit);
      }
    }
  
    localData(stName, val, eventName, fieldName){
      if(val != null){
        if(fieldName)
          this[fieldName] = val;
  
        if(eventName)
          this._emmiter.emit(eventName, val);
        utils.setStorage(stName, val);
      }
      else
        return utils.getStorage(stName);
    }
    localFotter(val){
  
      return this.localData('_ft@c', val, 'updateFotter', 'fodderCount');
    }
  
    localFeed(val){
  
      return this.localData('_fd@c', val, 'updateFeed', 'feededCount');
    }
  
    localPeriodFeed(val){
  
      return this.localData('_pfd@c', val, 'updatePeriodFeed', 'periodFeedCount');
    }
  
    on(eventName, fn){
      this._emmiter.on(eventName, fn);
  
      let eventData = this.emitOnceData[eventName];
  
      if(eventData){
        this._emmiter.emit(eventName, this[eventData]);
      }
  
      return this;
    }
  }
//测试专用代码
// if(process.env.NODE_ENV !== 'production'){

//     $('#resetStorage').click(()=>{
//       utils.resetStorage();
//     });
  
//     require.ensure([],(require)=>{
//       let mock = require('../common/javascript/mock.js');
//       mock.start();
//     });
  
//     window.playFeedEffect = Activity.playFeedEffect.bind(Activity);
//   }

window.app = app

export default app;

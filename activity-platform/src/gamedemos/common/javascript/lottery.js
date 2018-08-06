import {services, Native, utils, Constant, Track, AwardDialog} from './index.js';

/**
 * 提供了基本的抽奖逻辑接口
 * @module Lottery
 */
module.exports = function ($scope){
  return {
    storageDrawName: 'draw_time',
    localTotalDrawTime: function(){
      return Constant.totalDrawTime;
    },
    localDrawTime: function(val){
      var storageDrawName = this.storageDrawName,
          localDrawTime = utils.getStorage(storageDrawName) || 0;

      if(typeof val == 'undefined'){
        return localDrawTime * 1;
      }else{
        if(val === 'auto')
          val = localDrawTime * 1 + 1;
        utils.setStorage(storageDrawName,val);
      }
    },
    beforeLottery: function(){
      var maxTime = this.localTotalDrawTime(),
          drawTime = this.localDrawTime();

      if(drawTime < maxTime)
        return false;

      return true;
    },
    lottery: function(awardId,afterdrawFn,callback, isInstall){
      var self = this;

      Track.shoot(this.localDrawTime() + 1, isInstall);

      if(awardId == -1){
        AwardDialog.alertAwardDlg($scope.loseAward,null,callback);
        afterdrawFn && afterdrawFn();
        return;
      }

      Native.getImei(()=>{
        services.getDraw({prizeGroupId: awardId},function(data){
          self.showResult(data,callback);
          self.localDrawTime('auto');
          $scope.hasLottery = self.beforeLottery();
          afterdrawFn && afterdrawFn();
        });
      });
    },
    showResult(lotteryResult,end){
      var prize = lotteryResult.prize;
      if(!prize){
        AwardDialog.alertAwardDlg($scope.loseAward,null,end);
      }else{
        AwardDialog.alertAwardDlg($scope.prizesList[prize.prizeGroupId],prize,end);
      }
    }
  }
}
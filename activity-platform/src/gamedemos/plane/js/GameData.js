/**
 * Created by JunSong on 2017/5/3.
 */
// import android from '@flyme/business-fit/build/index';
// var stat = require('./stat.js');
// var $ = require('../../suning3/js/zepto.min.js');
//只做静态类,不实例化
class GameData {
    //static score = 0;
};

GameData.score = 0;
GameData.turns = ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三'];
GameData.currTurn = 0;
GameData.timePerTurn = 20;
GameData.gameCountdownTimer = null;
GameData.timeText = null;
GameData.bounds = null;
GameData.hitedNums = 0;
GameData.hitedTotalNums = 0;
GameData.appUrl = 'jike://page.jk/recommend?dialog=campaign';
GameData.downloadStartTime = 0;
GameData.downloadEndTime = 0;

GameData.init = function(){
    var self = this; 
    var urlobj = getUrlParams() || {
      business: 1,
      campaignId: 0,
      turnTo: 'a',
      from: 0
    };
    self.businessType = urlobj['business'];
    self.campaignId = urlobj['campaignId'];
    self.from = urlobj['from'];
    self.turnTo = urlobj['turnTo'];
    if(urlobj['pkg']) self.packageName = urlobj['pkg'];
    if(urlobj['appId']) self.appId = parseInt(urlobj['appId'],10);
    if(urlobj['versionCode']) self.appVC = urlobj['versionCode'];
    if(urlobj['pkgSize']) self.pkgSize = urlobj['pkgSize'];

    let key_prefix = self.key_prefix = 'jk_2495251_';
    key_prefix += urlobj['campaignId'];
    self.store_count_key = key_prefix + '_played_times';
    self.store_countDate_key = key_prefix + '_newDay';
    self.store_active_key = key_prefix + '_isAppActived';
};

GameData.reset = function(){
    this.score = 0;
    this.hitedNums = 0;
};

GameData.init();

function getUrlParams() {
    let s = location.search;
    if (s.length > 3) {
      let sArr = s.substr(1).split('&'),
        result = {},
        temp = null;
      for (let i = 0, ilen = sArr.length; i < ilen; i++) {
        temp = sArr[i].split('=');
        if (temp.length == 0) {
          continue;
        }
        if (temp.length == 1) {
          result[temp[0]] = '';
        } else {
          result[temp[0]] = temp[1];
        }
      };
      return result;
    } else {
      return undefined;
    }
}
export default GameData;
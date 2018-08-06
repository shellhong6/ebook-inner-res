/**
 * Created by JunSong on 2017/5/23.
 */
/**
 * Created by JunSong on 2017/3/29.
 */
import android from '@flyme/business-fit/build/index';
var utils = require('../../common/javascript/utils.js');
var GameData = require('./GameData.js');

var stat = {
    init(){
        var self = this;
        var urlobj = android.util.getUrlParams();
        self.businessType = urlobj['business'];
        self.campaignId = urlobj['campaignId'];
        self.carrier = urlobj['turnTo'];
        self.from = urlobj['from'] || 0;
        self.date = utils.timeFormat(new Date,'yy/mm/dd');
        if(urlobj['pkg']) self.packageName = urlobj['pkg'];
        if(urlobj['appId']) self.appId = parseInt(urlobj['appId'],10);
        if(urlobj['versionCode']) self.appVC = urlobj['versionCode'];
    },
    doFlow(data, imei){
        var self = this;
        $.extend(data,{turnTo:self.carrier,page:self.campaignId,appid:self.appId,imei:window.imei,from:self.from,
            appstore_activity_type:1,flyme_business_soruce:self.businessType,appstore_block_source:1,date:self.date,
            apkname:self.packageName,appname:'即刻'});
        android.util.doFlow(data);
    }
};

stat.init();

module.exports = stat;
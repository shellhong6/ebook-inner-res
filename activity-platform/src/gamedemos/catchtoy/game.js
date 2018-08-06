

// var $ = require('../suning3/js/zepto.min.js');
var States = require('./States.js');

window.$ = $;

window.setProgress = function(progress){
    $('#loadingProgress').find('.loadingProBar').css('width',progress+'%');
};

window.gameCreated = false;
var MainState;

function createGame(fn){   //待 Phaser 加载完成再创建
    if(typeof Phaser !== 'undefined'){
        if(window.gameCreated) return;
        var config = {
            width:1080,
            height:980,
            renderer:Phaser.AUTO,
            transparent:true,
            parent:'canvas_game'
        };
        var game = new Phaser.Game(config);
        window.gameCreated = true;
        window.game = game;

        game.state.add('boot', new States.Boot(game));
        game.state.add('preload', new States.Preload(game,loadingDialog));
        game.state.add('main', MainState = new States.Main(game,fn));
        game.state.add('over', new States.Over(game));
        game.state.start('boot');

        window.MainState = MainState; //TODO debug
    }else{
        setTimeout(function(){
            createGame(fn);
        },100)
    }
}

function notifyActivityState(activityState){
    console.log(activityState);
}

var game_total_count = 3, game_count = 0, key_prefix = 'sn6_751080_';
window.game_total_count = game_total_count;
window.game_count = game_count;
window.key_prefix = key_prefix;
// createGame();
var storage;
var Entry = {
    from:0,
    title:'',
    btnText:{
        initial:'preLottery.png',  //开始夺奖
        downloading:['startLoadPrizes.png','prizesLoading.png',/*'prizesLoaded.png',*/'startLottery.png'],  //装填娃娃机 填充中 填充完毕 准备抓奖
        installing:'',
        installed:'go.png',
        unactived:'add3times.png', // +3次抽奖机会
        actived:'火力全开',
        oneFree:'go.png',
        lottery:'go.png',
        lottering:'drawing.png',
        noChance:'tomorrowAgain.png',
        noChance4lastDay:''
    },
    dialogTips:{
        myAdwards:'温馨提示#空空如也，快去参与活动吧！#确定',
        unhited:'温馨提示#很遗憾未抓中，下次加油哦~#好哒',
        unlottery:'T^T很遗憾，未中奖~#下次活动继续努力#好的'
    },
    isAppInstalled:false,
    packageName:'com.suning.mobile.ebuy',
    appUrl:'suning://m.suning.com/index?utm_source=meizu-wc&utm_medium=ab-zt0&adTypeCode=1002&adId=https%3a%2f%2fcuxiao.m.suning.com%2fd12kmh.html',
    appDownloadUrl:'http://cc.res.meizu.com/fileserver/activity/ad/1/fb961a62d3ae43e490d9d5fa12089d2f.apk',
    appId:751080,
    appName:'苏宁易购',
    appVC:163,
    appActived:false,
    totalCount:game_total_count,
    playedCount:0,
    init(){
      createGame(()=>{

      });
      self.bindBtnEvent();
    },
    bindBtnEvent(){
        let self = this, btn = $('#button');
        btn.on('touchstart',()=>{
            let status = btn.attr('data-status');
            if(status!='disable') MainState.buttonDown();
        });
        btn.on('touchend',()=>{
            let status = btn.attr('data-status');
            if(status!='disable') MainState.buttonUp();

            if(!self.hit_play_reported){
                self.hit_play_reported = true;
                self.gameStartTime = Date.now();
                Track.doFlow({action:'hit_play',user_type:Native.isAppInstalled(self.packageName,+self.appVC,false)});
                // self.scrollTo(200,250);
            }

            switch (status){
                case 'disable':
                    if(Native.isAppInstalled(self.packageName,self.appVC,true)){
                        Track.doFlow({action:'open_web_end'});
                        Native.turnToAppPage(self.packageName,self.lastRedirectUrl);
                    }else{
                        dialog.confirm({
                            title:'系统提示',
                            content:self.tips4clickWelfare.initial, //TODO
                            okCallback(){
                                // stat.doFlow({action:'ex_click_commit',article_name:title,url:uri},self.IMEI);
                                Native.installApp(self.packageName,self.appId,self.appVC,self.appDownloadUrl||'',()=>{},self);
                                self.setBtnStatus('initial');
                            },
                            cancelCallback(){
                                // stat.doFlow({action:'ex_click_cancel',article_name:title,url:uri},self.IMEI)
                            },
                            sureStr:'确定',
                            cancelStr:'取消',
                            useBackground:false
                        });
                    }
                    break;

                case 'installed':
                    MainState.catchPrize(true,()=>{
                        Track.doFlow({action:'hit_prize_test'});
                        dialog.alert('T^T，没抓到大奖~\n小狮子祝你抢到最低价商品哦~');
                        self.setBtnStatus('oneFreed');
                        storage.set('oneFreed',true);
                    });
                    break;
                case 'oneFreed':
                    if(self.isAppInstalled = Native.isAppInstalled(self.packageName,self.appVC,true)){
                        Track.doFlow({action:'open_web'});
                        Native.turnToAppPage(self.packageName,self.appUrl);
                        MainState.updateTimesPanel(game_total_count-self.playedCount);
                        MainState.showTimesPanel();
                        storage.set('todayOpened_'+self.currDayFormat,true);
                        storage.set('actived',true);
                        self.setBtnStatus('actived');
                    }else{
                        dialog.confirm({
                            title:'系统提示',
                            content:self.tips4clickWelfare.initial, //TODO
                            okCallback(){
                                // stat.doFlow({action:'ex_click_commit',article_name:title,url:uri},self.IMEI);
                                Native.installApp(self.packageName,self.appId,self.appVC,self.appDownloadUrl||'',()=>{},self);
                            },
                            cancelCallback(){
                                // stat.doFlow({action:'ex_click_cancel',article_name:title,url:uri},self.IMEI)
                            },
                            sureStr:'确定',
                            cancelStr:'取消',
                            useBackground:false
                        });
                        self.setBtnStatus('initial');
                    }
                    break;
                case 'actived':
                    if(game_total_count-self.playedCount>0){
                        MainState.catchPrize(false,()=>{
                            self.lottery((res)=>{
                                let prizeImg = 'thanks', currPrize, prizes, offsetX = 0;
                                if(res.value.prize){
                                    prizes = res.value.prize;
                                    $.each(self.prizeGroups,(i,v)=>{
                                        if (prizes.prizeGroupId == v.id) {
                                            currPrize = {
                                                imgUrl: v.imgUrl,
                                                name: v.title || '',
                                                id: prizes.id || 0,
                                                desc: v.desc || '',
                                                winMessage: v.winMessage || '',
                                                voucher: prizes.voucher || '',
                                                type: v.type
                                            }
                                        }
                                    });
                                }else{
                                    currPrize = {};
                                    $.each(self.prizeGroups,(i,v)=>{
                                        if (v.type=='lose') {
                                            currPrize.desc = v.desc;
                                        }
                                    })
                                }
                                if(currPrize){
                                    let desc = currPrize.desc.toUpperCase();
                                    if(desc.indexOf('魅族PRO 7')!=-1){
                                        prizeImg = 'MZPRO-7', offsetX = 6.2/8;
                                    }else if(desc.indexOf('魅蓝 NOTE6')!=-1){
                                        prizeImg = 'MLNote-6', offsetX = 8.1/8;
                                    }else if(desc.indexOf('礼品卡100')!=-1){
                                        prizeImg = '100'
                                    }else if(desc.indexOf('礼品卡50')!=-1){
                                        prizeImg = '50'
                                    }else if(desc.indexOf('礼品卡20')!=-1){
                                        prizeImg = '20'
                                    }else if(desc.indexOf('魅蓝6')!=-1){
                                        prizeImg = 'ML6', offsetX = 6.8/8;
                                    }else if(desc.indexOf('5元话费')!=-1){
                                        prizeImg = '5'
                                    }
                                }
                                MainState.rodUp(false,(cb)=>{
                                    if(res.value.prize) {
                                        if(currPrize){
                                            self.showPrizeDialog(currPrize);
                                        }
                                    }else{
                                        dialog.alert(currPrize.desc || 'T^T，没抓到大奖~ 小狮子祝你抢到最低价商品哦~');
                                    }
                                    ++self.playedCount;
                                    MainState.updateTimesPanel(game_total_count-self.playedCount);
                                    storage.set('played_count_'+self.currDayFormat,self.playedCount);
                                    self.setBtnStatus('actived');
                                    if(self.playedCount>=game_total_count) {
                                        self.setBtnStatus('disable');
                                        MainState.hideTimesPanel();
                                    }
                                    cb&&cb();
                                },prizeImg+'.png',offsetX)
                            });
                        });
                    }else{
                        dialog.alert('今日机会已经用完~');
                        self.setBtnStatus('disable');
                        MainState.hideTimesPanel();
                    }
                    break;

            }
        });
        btn.on('click',function(e){
            console.log('onclick');
        });
    },

    setBtnStatus(status,progressText){
        let self = this, btn = $('#button'), appText = $('#app').find('.appSize');
        btn.attr('data-status',status);
        switch(status){
            case 'disable':
                MainState.setButtonText('lowPrize.png');
                if(self.lastDay){
                    MainState.addGameTips(MainState.gameTips.thanks4lastDay);
                }else{
                    MainState.addGameTips(MainState.gameTips.thanks);
                }
                MainState.hideTimesPanel();
                break;
            case 'initial':
                appText.text((self.pkgSize||0)+'MB');
                MainState.setButtonText('preLottery.png');
                MainState.addGameTips(MainState.gameTips.beforeInstall);
                break;
            case 'installed':
                MainState.setButtonText('go.png');
                MainState.addGameTips(MainState.gameTips.onefree);
                appText.text('已安装');
                break;
            case 'oneFreed':
                MainState.setButtonText('add3times.png');
                MainState.addGameTips(MainState.gameTips.beforeActive)
                break;
            case 'actived':
                MainState.setButtonText('go.png');
                MainState.addGameTips(MainState.gameTips.flying);
                MainState.showTimesPanel(game_total_count-self.playedCount);
                break;
            case 'installing':
                appText.text('安装中');
                MainState.addGameTips(MainState.gameTips.installing);
                break;
            case 'downloading':
                appText.text(progressText);
                MainState.addGameTips(MainState.gameTips.installing);
                break;
            case 'drawing':
                MainState.setButtonText('drawing.png');
                MainState.addGameTips(MainState.gameTips.drawing);
                break;
            case 'installFailureStatus':
                appText.text('安装失败')
                setTimeout(()=>{
                    self.setBtnStatus('initial');
                },500)
                break;
            default:
                break;
        }
    }
}

Entry.init();
// createGame();
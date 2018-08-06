/**
 * Created by JunSong on 2017/5/4.
 */
import State from './State.js';
import GameData from '../GameData.js';
import CommonUI from '../CommonUI.js';
import Event from '../Events.js';
import Constant from '../Constant.js';
// var Native = require('../Native.js');
// var stat = require('../stat.js');

export default class Over extends State{
    constructor(game){
        super(game);
        this.game = game;
        this.name = 'Over';
        // Native = Native.getInstance(game,this);
    }
    create(){
        let game = this.game;
        // 背景
        var bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        // 我的飞机
        this.player = game.add.sprite(game.width/2, 1265, 'player');
        this.player.anchor.setTo(0.5);
        this.player.animations.add('fly');
        this.player.animations.play('fly', 12, true);
        // 分数
        //var style = {font: "bold 32px Arial", fill: "#ff0000", boundsAlignH: "center", boundsAlignV: "middle"};
        //this.text = game.add.text(0, 0, "Score: " + GameData.score, style);
        //this.text.setTextBounds(0, 0, game.width, game.height);

        if(GameData.currTurn==2){
            this.tipsSprite = CommonUI.setTips(game,this,'两轮消除了 '+GameData.hitedTotalNums+' 个标题党，'+(this.isAppInstalled()?'去即刻看点好东西吧！':'大奖就在眼前，再稍等一下哦！'));
        }else{
            this.tipsSprite = CommonUI.setTips(game,this,'干得漂亮，恭喜你消除了 ' +GameData.hitedNums+ ' 个标题党，准备第二轮！');
        }

        CommonUI.create(game,this);
        CommonUI.setHeaderCanMove(game,this);

        // 重来按钮
        if(GameData.currTurn==2){
            this.replaybutton = CommonUI.createButton('startbutton',this.onReplayClick,game,this);
            if(this.isAppInstalled()){
                this.btnText.frameName = 'turnToLottery.png';
            }else{
                this.btnText.frameName = 'downloading.png';
                this.btn.alpha = 0;
            }
            Event.trigger('overGame');
        }else{
            setTimeout(()=>{
                this.game.state.start('start');
            },1500)
        }
    }
    isAppInstalled(){
        let game = this.game;
        return game.opts && game.opts.isAppInstalledFn && game.opts.isAppInstalledFn(Constant.app.packageName,Constant.app.versionCode)
    }
    setOverStatus(){
        CommonUI.addButtonToFooter(game,this);
        this.tipsSprite.setText('两轮消除了 '+GameData.hitedTotalNums+' 个标题党，去'+Constant.app.name+'看点好东西吧！');
    }
    onReplayClick(){
        CommonUI.removeEvents4Header(this.game,this);
        if(this.btnText.frameName=='turnToLottery.png'){
            // var result = Native.turnToAppPage();
            // stat.doFlow({action:'open_web',open_result:result});
            // console.log('result:'+result);
            Event.trigger('replayBtnClick',{action:'openApp'})
            return;
        }else if(this.btnText.frameName=='downloading.png'){
            Event.trigger('replayBtnClick',{action:'downloading'})
            return;
        }
        Event.trigger('replayBtnClick',{action:'restartGame'})
        this.game.state.start('start');
    }
}
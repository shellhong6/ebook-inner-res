/**
 * Created by JunSong on 2017/5/4.
 */
import State from './State.js';
import CommonUI from '../CommonUI.js';
import Constant from '../Constant.js';
import Event from '../Events.js';
// var Native = require('../Native.js');

export default class Main extends State{
    constructor(game){
        super(game);
        this.game = game;
        this.name = 'Main';
        // Native = Native.getInstance(game,this);
        // dialog.hideLoading();
        // $('body').css('background','#000');
    }
    create(){
        let game = this.game;
        // 背景
        var bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        // 我的飞机
        this.player = game.add.sprite(game.width/2, 1265, 'player');
        this.player.anchor.setTo(0.5);
        this.player.animations.add('fly');
        this.player.animations.play('fly', 24, true);

        CommonUI.create(game,this);
        CommonUI.setHeaderCanMove(game,this);
        // 开始按钮
        this.startbutton = CommonUI.createButton('startbutton',this.onStartClick,game,this);

        if(game.opts && game.opts.isAppInstalledFn && game.opts.isAppInstalledFn(Constant.app.packageName,Constant.app.versionCode)){
            this.tipsSprite = CommonUI.setTips(game,this,Constant.gameTips.installed.text);
        }else{
            this.tipsSprite = CommonUI.setTips(game,this,Constant.gameTips.default.text,Constant.gameTips.default.color);
        }
    }
    setOverStatus(){

    }
    onStartClick(){
        let game = this.game;
        CommonUI.removeEvents4Header(game,this);
        var headerTwn = game.add.tween(this.header).to({y: -1080}, 360, Phaser.Easing.Linear.None, true, 0, 0, false);
        headerTwn.onComplete.add(()=>{
            game.state.start('start');
            Event.trigger('startGame');
        }, this);
    }
}
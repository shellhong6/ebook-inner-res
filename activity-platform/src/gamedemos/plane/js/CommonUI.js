/**
 * Created by JunSong on 2017/5/20.
 */
// var Native = require('./Native.js');
import GameData from './GameData.js';
// var stat = require('./stat.js');

export default class CommonUI{

}

CommonUI.setTips = function(game,context,text,color){
    var sprite = game.add.text(game.width/2,game.height-256,text,{
        font:'34px', fill:color?color:'#ffffff', align:'center', boundsAlignH: "center", boundsAlignV: "middle"
    });
    sprite.anchor.setTo(0.5);
    sprite.alpha = 0.6;
    return sprite;
};

CommonUI.create = function(game, context){
    //血量条
    context.HPContainer = this.createLiveBar(game,context);
    //游戏倒计时
    context.clockContain = this.createClockSprite(game,context);
    //击中的敌方飞机数
    context.hitedEnemysContain = this.createHitedEnemysSprite(game,context);

    context.aboutSprite = this.createAbout(game,context);
    //banner
    context.header = game.add.sprite(0,context.name=="Main"?0:-1080, 'header');
    console.log(context.header);

    // if(!Native.hasInstanced) Native = Native.getInstance(game,context);
    // Native.game = game, Native.context = context;
    // Native.addEventListener4InstallApp(game,context);
    //添加底部栏
    this.createFooter(game,context);
};

CommonUI.createFooter = function(game,context){
    context.footer = game.add.graphics(0, game.height-186);
    context.footer.beginFill(0x590d09, 1);
    context.footer.drawRect(32, 0, 1016, 186);
    context.footer.endFill();
    // if(Native.isAppInstalled()){
    //     $('#app_progress').text('已安装');
    // }else{
        // $('#app_progress').text(currDownloadProgress?(currDownloadProgress=='正在安装'?'正在安装':'下载中 '+currDownloadProgress):GameData.pkgSize+'MB')
    // }
    return $('.footer').show();
    //添加icon
    context.icon = game.add.sprite(225,context.footer.y+38,'sprite','icon.png');
    context.iconText1 = game.add.text(380,context.footer.y+56,'即刻-没有标题党的资讯神器',{
        font:'38px', fill:'#ffffff', align:'center'
    });
    context.iconText2 = game.add.text(380,context.footer.y+108,/*Native.isAppInstalled()*/true?'已安装':(currDownloadProgress?('下载中 '+currDownloadProgress):GameData.pkgSize+'MB'),{
        font:'34px', fill:'#ffffff', align:'center'
    });
};

CommonUI.addButtonToFooter = function(game,context){
    if(context.name!='Start') return;
    $('.footer').hide();
    //context.icon.alpha = 0;
    //context.iconText1.alpha = 0;
    //context.iconText2.alpha = 0;

    context.footerButton = CommonUI.createButton('startbutton',function(){
        // var result = Native.turnToAppPage();
        // stat.doFlow({action:'open_web',open_result:result});
        // console.log('result:'+result);
    },game,context,game.height - 185/2,'turnToLottery.png');
    game.world.setChildIndex(context.footerButton,context.world.children.length-1);
    GameData.buttonAddedToFooter = true;
};

CommonUI.createAbout = function(game,context){
    var sprite = game.add.sprite(100,410,'btnText','about.png');
    sprite.inputEnabled = true;
    sprite.events.onInputUp.add(function(){
        // dialog.alertRule(GameData.Instruction||'暂无说明');
    },context);
    return sprite;
};

CommonUI.createButton = function(key,callback,game,context,y,textFrameName){
    var sprite = game.add.sprite(0, 0, '');
    context.btn = game.add.button(game.width/2, y||1520, key, function(){
        // if(!(Native.alreadyStartDownload || Native.isAppInstalled())){
        //     Native.installApp();
        //     stat.doFlow({action:'install_web'})
        // }
        callback&&callback.call(context);
    }, context, 1, 1, 0);
    context.btn.anchor.setTo(0.5);
    sprite.addChild(context.btn);
    context.btnText = game.add.sprite(game.width/2,y||1520,'btnText', textFrameName||'start.png');
    context.btnText.anchor.setTo(0.5,0.4);
    sprite.addChild(context.btnText);
    return sprite;
};

CommonUI.createLiveBar = function(game,context){
    var sprite = game.add.sprite(0,0,'');
    context.HPbar = game.add.sprite(177,321,'sprite','HPbar.png');
    window.HPbar = context.HPbar;
    context.HP = game.add.sprite(90,318,'sprite','HP.png');
    sprite.addChild(context.HPbar);
    sprite.addChild(context.HP);
    this.updateLiveBar(game,context,100);
    return sprite;
};

CommonUI.updateLiveBar = function(game,context,liveValue){
    var poly = new Phaser.Polygon();
    //长度区间:726 - 543 = 183;
    var duraX = 183 * (100 - liveValue) / 100;
    //  And then populate it via setTo, using any combination of values as above
    poly.setTo([ new Phaser.Point(735, 325), new Phaser.Point(726, 388), new Phaser.Point(726-duraX*2, 388), new Phaser.Point(735-duraX*2, 325) ]);

    let graphics = game.add.graphics(0, 0);

    graphics.beginFill(0x7c1f03);
    graphics.drawPolygon(poly.points);
    graphics.endFill();
};

CommonUI.createClockSprite = function(game,context){
    context.clock = game.add.sprite(792,323,'sprite','clock.png');
    context.clockX = game.add.sprite(887, 345, 'numbers', 'x.png');
    context.clockX.scale.setTo(0.1);
    context.clockTenDigit = game.add.sprite(916, 340, 'numbers', '2.png');
    context.clockTenDigit.scale.setTo(0.1);
    context.clockSingleDigit = game.add.sprite(947, 340, 'numbers', '0.png');
    context.clockSingleDigit.scale.setTo(0.1);
    var sprite = game.add.sprite(0,0,'');
    sprite.addChild(context.clock);
    sprite.addChild(context.clockX);
    sprite.addChild(context.clockTenDigit);
    sprite.addChild(context.clockSingleDigit);
    return sprite;
};

CommonUI.createHitedEnemysSprite = function(game,context){
    context.hitedEnemys = game.add.sprite(778, 415, 'sprite', 'lives.png');
    context.hitedEnemys.scale.setTo(0.5);
    context.hitedEnemysX = game.add.sprite(887, 455, 'numbers', 'x.png');
    context.hitedEnemysX.scale.setTo(0.1);
    context.hitedEnemysTenDigit = game.add.sprite(916, 450, 'numbers', '0.png');
    context.hitedEnemysTenDigit.scale.setTo(0.1);
    context.hitedEnemysSingleDigit = game.add.sprite(947, 450, 'numbers', '0.png');
    context.hitedEnemysSingleDigit.scale.setTo(0.1);
    var sprite = game.add.sprite(0,0,'');
    sprite.addChild(context.hitedEnemys);
    sprite.addChild(context.hitedEnemysX);
    sprite.addChild(context.hitedEnemysTenDigit);
    sprite.addChild(context.hitedEnemysSingleDigit);
    return sprite;
};

CommonUI.updateClockNums = function(numbers,context){
    this.updateNumberSprite(this._splitNums(this._formatNums(numbers)),context.clockTenDigit,context.clockSingleDigit);
};

CommonUI.updateHitedEnemysNums = function(numbers,context){
    this.updateNumberSprite(this._splitNums(this._formatNums(numbers)),context.hitedEnemysTenDigit,context.hitedEnemysSingleDigit);
};

CommonUI.updateNumberSprite = function(nums,tenSprite,singleSprite){
    this._setNumberFrameName(tenSprite,nums[0],916);
    this._setNumberFrameName(singleSprite,nums[1],947);
};

CommonUI.setToTop = function(game, context){
    game.world.setChildIndex(context.HPContainer,context.world.children.length-1);
    game.world.setChildIndex(context.aboutSprite,context.world.children.length-1);
    game.world.setChildIndex(context.clockContain,context.world.children.length-1);
    game.world.setChildIndex(context.hitedEnemysContain,context.world.children.length-1);
    game.world.setChildIndex(context.header,context.world.children.length-1);
    game.world.setChildIndex(context.footer,context.world.children.length-1);
    //game.world.setChildIndex(context.icon,context.world.children.length-1);
    //game.world.setChildIndex(context.iconText1,context.world.children.length-1);
    //game.world.setChildIndex(context.iconText2,context.world.children.length-1);
};

CommonUI.removeEvents4Header = function(game,context){
    context.header.events.onInputDown.removeAll(context);
    context.header.events.onInputUp.removeAll(context);
};

CommonUI.setHeaderCanMove = function(game,context){
    context.header.inputEnabled = true;
    let y = 0;

    let startX = 0, startY = 0, endX = 0, endY = 0;
    context.header.events.onInputDown.add(function(sprite, pointer){
        startX = pointer.clientX;
        startY = pointer.clientY;
    },context);
    context.header.events.onInputUp.add(function(sprite, pointer){
        endX = pointer.clientX;
        endY = pointer.clientY;
        var offset = endY - startY, move = false;
        if(offset>50){ //向下滑动
            if(context.header.y<0){
                move = true;
                y = 0;
            }
        }else if(offset<-50){  //向上滑动
            if(context.header.y>=0){
                move = true;
                y = -1080;
            }
        }
        if(move){
            game.add.tween(context.header).to({y: y}, 360, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
    },context)
};

CommonUI._formatNums = function(nums){
    return (100+parseInt(nums,10)+'').slice(-2);
};

CommonUI._splitNums = function(nums){
    return nums.split('');
};

CommonUI._setNumberFrameName = function(sprite,num,originX){
    sprite.x = originX + (num==1?12:0);
    sprite.frameName = num + '.png';
};
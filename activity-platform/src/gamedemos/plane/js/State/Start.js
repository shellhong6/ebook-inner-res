/**
 * Created by JunSong on 2017/5/4.
 */
import Enemy from '../Enemy.js';
import GameData from '../GameData.js';
import State from './State.js';
import CommonUI from '../CommonUI.js';
import Constant from '../Constant.js';
import Event from '../Events.js';
// var stat = require('../stat.js');
// var Native = require('../Native.js');

export default class Start extends State{
    constructor(game){
        super(game);
        this.game = game;
        this.name = 'Start';
        // Native = Native.getInstance(game,this);
        window.CommonUI = CommonUI;
    }
    create(){
        let game = this.game;
        // 物理系统
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // 背景
        var bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        GameData.bounds = game.add.sprite(66,285,'');
        GameData.bounds.width = game.width - 132;
        GameData.bounds.height = game.height - 285 - 286;
        // 我的飞机
        this.player = game.add.sprite(game.width/2, 1265, 'player');
        this.player.anchor.setTo(0.5);
        this.player.animations.add('fly');
        this.player.animations.play('fly', 24, true);
        game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        //this.player.level = 2;
        this.player.liveValue = 100;

        CommonUI.create(game,this);
        //倒计时
        let countdowmNum = 3;
        let countdownSprite = game.add.sprite(game.width/2,game.height/2-20,'countdown','3.png');
        countdownSprite.anchor.setTo(0.5);
        //countdownSprite.scale.setTo(0.5);

        let turnText = game.add.text(game.width/2, (game.height-countdownSprite.height)/2-82, '第'+(GameData.turns[GameData.currTurn++]||'N')+'轮',{
            font: "48px Arial", fill: "#ff0000"
        });
        turnText.anchor.setTo(0.5,0.5);
        // stat.doFlow({action:'game_times',g_times:GameData.currTurn});

        this.tipsSprite = CommonUI.setTips(game,this,Constant.gameTips.gameing.text);

        let countdownTimer = setInterval(()=>{
            --countdowmNum;
            countdownSprite.frameName = (countdowmNum?countdowmNum:'start')+'.png';
            if(countdowmNum<=0) {
                clearInterval(countdownTimer);
                // 动画
                var tween = game.add.tween(this.player).to({y: game.height - 186 - 200}, 1000, Phaser.Easing.Sinusoidal.InOut, true);
                tween.onComplete.add(()=>{
                    turnText.kill();
                    countdownSprite.kill();
                    this.tipsSprite.setText(Constant.gameTips.gameing.text);
                    this.onStart()
                }, this);
            }
        },800);
        window.game = game;
        window.self = this;
        console.log(game)
        console.log(game.world.getIndex(this.header));
        this.countdownTimer = countdownTimer;
    }
    setOverStatus(){
        CommonUI.addButtonToFooter(game,this);
    }
    onStart(){
        let game = this.game;
        Event.trigger('roundStart',{roundCount:GameData.currTurn})
        // 我的子弹
        this.mybullets = game.add.group();
        this.mybullets.enableBody = true;
        this.mybullets.createMultiple(25, 'myBullet');
        this.mybullets.setAll('outOfBoundsKill', true);
        this.mybullets.setAll('checkWorldBounds', true);
        this.myStartFire = true;
        this.bulletTime = 0;
        // 我的飞机允许拖拽
        this.player.inputEnabled = true;
        //this.player.input.allowVerticalDrag = false;
        this.player.input.enableDrag(false);
        this.player.input.boundsSprite = GameData.bounds;
        // 奖
        //this.awards = game.add.group();
        //this.awards.enableBody = true;
        //this.awards.createMultiple(1, 'award');
        //this.awards.setAll('outOfBoundsKill', true);
        //this.awards.setAll('checkWorldBounds', true);
        //this.awardMaxWidth = game.width - game.cache.getImage('award').width;
        //game.time.events.loop(Phaser.Timer.SECOND * 30, this.generateAward, this);
        // 分数
        //var style = {font: "32px Arial", fill: "#ff0000"};
        //this.text = game.add.text(0, 0, "Score: 0", style);
        GameData.reset();
        // 敌机
        var enemyTeam = {
            green: {
                game: this,
                selfPic: 'greenPlane',
                bulletPic: 'enemyBullet',
                explodePic: 'explode',
                selfPool: 10,
                bulletsPool: 30,
                explodePool: 10,
                life: 3,
                velocity: 210,
                bulletX: 0,
                bulletY: 20,
                bulletVelocity: 450,
                selfTimeInterval: 3,
                bulletTimeInterval: 1700,
                score: 10
            },
            white: {
                game: this,
                selfPic: 'whitePlane',
                bulletPic: 'enemyBullet',
                explodePic: 'explode',
                selfPool: 6,
                bulletsPool: 20,
                explodePool: 6,
                life: 5,
                velocity: 200,
                bulletX: 0,
                bulletY: 30,
                bulletVelocity: 840,
                selfTimeInterval: 4,
                bulletTimeInterval: 1900,
                score: 20
            },
            yellow: {
                game: this,
                selfPic: 'yellowPlane',
                bulletPic: 'enemyBullet',
                explodePic: 'explode',
                selfPool: 4,
                bulletsPool: 15,
                explodePool: 4,
                life: 7,
                velocity: 190,
                bulletX: 0,
                bulletY: 50,
                bulletVelocity: 1300,
                selfTimeInterval: 10,
                bulletTimeInterval: 2000,
                score: 50
            },
            red: {
                game: this,
                selfPic: 'redPlane',
                bulletPic: 'enemyBullet',
                explodePic: 'explode',
                selfPool: 2,
                bulletsPool: 10,
                explodePool: 2,
                life: 12,
                velocity: 160,
                bulletX: 0,
                bulletY: 50,
                bulletVelocity: 1300,
                selfTimeInterval: 12,
                bulletTimeInterval: 2100,
                score: 50
            }
        }
        this.greenPlane = new Enemy(enemyTeam.green, game);
        this.redPlane = new Enemy(enemyTeam.red, game);
        this.yellowPlane = new Enemy(enemyTeam.yellow, game);
        this.whitePlane = new Enemy(enemyTeam.white, game);
        //前置绘画层
        game.world.setChildIndex(this.player,this.world.children.length-1);
        CommonUI.setToTop(game,this);
        if(game.opts && game.opts.isAppInstalledFn && game.opts.isAppInstalledFn(Constant.app.packageName,Constant.app.versionCode)) CommonUI.addButtonToFooter(game,this);
        this.gameCountdown();
    }
    gameCountdown(){
        let time = GameData.timePerTurn, game = this.game;
        GameData.gameCountdownTimer = setInterval(()=>{
                CommonUI.updateClockNums(--time,this);
                if(time<=0) {
                    this.tipsSprite.setText('干得漂亮，恭喜你消除了 ' +GameData.hitedNums+ ' 个标题党，准备'+(GameData.currTurn==2?'去'+Constant.app.name+'抽奖！':'第二轮！'));
                    clearInterval(GameData.gameCountdownTimer);
                    this.myStartFire = false;
                    if (this.player.alive) {
                        this.player.input.disableDrag();
                        this.player.inputEnabled = false;
                        // 动画
                        var tween = game.add.tween(this.player).to({
                            y: 1265,
                            x: game.width / 2
                        }, 1800, Phaser.Easing.Linear.None, true);
                        tween.onComplete.add(()=>{
                            this.gotoOver();
                        },this);
                    }
                }
        },1000)
    }
    //generateAward(){
    //    let game = this.game;
    //    var award = this.awards.getFirstExists(false);
    //    if(award) {
    //        award.reset(game.rnd.integerInRange(0, this.awardMaxWidth), -game.cache.getImage('award').height);
    //        award.body.velocity.y = 500;
    //    }
    //}
    myFireBullet(){
        let game = this.game;
        if(this.player.alive && game.time.now > this.bulletTime) {
            var bullet_left, bullet_right;
            bullet_left = this.mybullets.getFirstExists(false);
            if(bullet_left) {
                bullet_left.reset(this.player.x-13-120, this.player.y-108);
                bullet_left.body.velocity.y = -1200;
                this.bulletTime = game.time.now + 200;
            }
            bullet_right = this.mybullets.getFirstExists(false);
            if(bullet_right) {
                bullet_right.reset(this.player.x-13+120, this.player.y-108);
                bullet_right.body.velocity.y = -1200;
                this.bulletTime = game.time.now + 200;
            }
            //if(this.player.level >= 2) {
            //    bullet = this.mybullets.getFirstExists(false);
            //    if(bullet) {
            //        bullet.reset(this.player.x-13, this.player.y-108);
            //        bullet.body.velocity.y = -1200;
            //        bullet.body.velocity.x = -40;
            //        this.bulletTime = game.time.now + 200;
            //    }
            //    bullet = this.mybullets.getFirstExists(false);
            //    if(bullet) {
            //        bullet.reset(this.player.x-13, this.player.y-108);
            //        bullet.body.velocity.y = -1200;
            //        bullet.body.velocity.x = 40;
            //        this.bulletTime = game.time.now + 200;
            //    }
            //}
            //if(this.player.level >= 3) {
            //    bullet = this.mybullets.getFirstExists(false);
            //    if(bullet) {
            //        bullet.reset(this.player.x-13, this.player.y-108);
            //        bullet.body.velocity.y = -1200;
            //        bullet.body.velocity.x = -80;
            //        this.bulletTime = game.time.now + 200;
            //    }
            //    bullet = this.mybullets.getFirstExists(false);
            //    if(bullet) {
            //        bullet.reset(this.player.x-13, this.player.y-108);
            //        bullet.body.velocity.y = -1200;
            //        bullet.body.velocity.x = 80;
            //        this.bulletTime = game.time.now + 200;
            //    }
            //}
        }
    }
    hitplayer(player, bullet){
        bullet.kill();
        if(player.level > 1) {
            player.level--;
        }
        if(player.liveValue > 1) {
            --player.liveValue;
            this.blinkPlane(player);
        } else {
            player.kill();
            this.dead();
        }
        CommonUI.updateLiveBar(this.game,this,player.liveValue);
        console.log('飞机生命值:'+player.liveValue);
    }
    blinkPlane(plane){
        let count = 6;
        let timer = setInterval(()=>{
                --count;
                if(plane.alpha==1){
                    plane.alpha = 0.1
                }else{
                    plane.alpha = 1
                }
                if(count<=0){
                    clearInterval(timer);
                }
            },200)
    }
    crashplayer(player, enemy){
        //enemy.explose();
        player.kill();
        clearInterval(GameData.gameCountdownTimer);
        this.tipsSprite.setText('糟糕，只消除了 '+GameData.hitedNums+' 个标题党，准备第二轮！');
        this.dead(player);
    }
    //getAward(player, award){
    //    award.kill();
    //    if(player.level < 3) {
    //        player.level++;
    //    }
    //    player.liveValue++;
    //}
    updateText(){
        //this.text.setText("Score: " + GameData.score);
        CommonUI.updateHitedEnemysNums(GameData.hitedNums,this);
    }
    // 挂了
    dead(player){
        let game = this.game;
        var myexplode = game.add.sprite(this.player.x, this.player.y, 'explode');
        myexplode.reset(this.player.x - myexplode.width/2, this.player.y - myexplode.height/2);
        var anim = myexplode.animations.add('explode');
        myexplode.animations.play('explode', 40, false, true);
        //anim.onLoop.add((sprite,animation)=>{
        //    console.log(arguments);
        //    if(animation.loopCount>=3){
        //        myexplode.animations.stop('explode');
        //        player.kill();
        //        this.gotoOver();
        //    }
        //},this);
        anim.onComplete.add(this.gotoOver, this);
        Event.trigger('playerDead')
    }
    // 跳转到Over场景
    gotoOver(){
        GameData.hitedTotalNums += GameData.hitedNums;
        this.game.state.start('over');
    }
    // 更新函数
    update(){
        let game = this.game;
        if(this.myStartFire) {
            this.myFireBullet();
            this.greenPlane.enemyFire();
            this.redPlane.enemyFire();
            this.yellowPlane.enemyFire();
            this.whitePlane.enemyFire();
            // 碰撞检测
            game.physics.arcade.overlap(this.mybullets, this.greenPlane.enemys, this.greenPlane.hitEnemy, null, this.greenPlane);
            game.physics.arcade.overlap(this.mybullets, this.redPlane.enemys, this.redPlane.hitEnemy, null, this.redPlane);
            game.physics.arcade.overlap(this.mybullets, this.yellowPlane.enemys, this.yellowPlane.hitEnemy, null, this.yellowPlane);
            game.physics.arcade.overlap(this.mybullets, this.whitePlane.enemys, this.whitePlane.hitEnemy, null, this.whitePlane);
            game.physics.arcade.overlap(this.greenPlane.enemyBullets, this.player, this.hitplayer, null, this);
            game.physics.arcade.overlap(this.redPlane.enemyBullets, this.player, this.hitplayer, null, this);
            game.physics.arcade.overlap(this.yellowPlane.enemyBullets, this.player, this.hitplayer, null, this);
            game.physics.arcade.overlap(this.whitePlane.enemyBullets, this.player, this.hitplayer, null, this);
            game.physics.arcade.overlap(this.greenPlane.enemys, this.player, this.crashplayer, null, this);
            game.physics.arcade.overlap(this.redPlane.enemys, this.player, this.crashplayer, null, this);
            game.physics.arcade.overlap(this.yellowPlane.enemys, this.player, this.crashplayer, null, this);
            game.physics.arcade.overlap(this.whitePlane.enemys, this.player, this.crashplayer, null, this);
            //game.physics.arcade.overlap(this.awards, this.player, this.getAward, null, this);
        }
    }
    destroy(){
        clearInterval(GameData.gameCountdownTimer);
        clearInterval(this.countdownTimer);
        GameData.currTurn = 0;
        GameData.reset();
    }
}
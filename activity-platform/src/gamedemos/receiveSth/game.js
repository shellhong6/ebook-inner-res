import eventEmitter from 'event-emitter';
import {CarManager, MushroomEmmit, SceneTalk} from './game/index';
import Constant from './Constant.js';

function getNow(){
  return Date.now();
}

function formatCounter(second){
  let sec = second % 60

  return sec;
}

function createGame(){
  let game;

  let Main = {
    afterListeners:[],
    isStop: true,
    playing: false,
    states:0, //0: 初始状态 1:游戏中 2:打落了所有球,一轮游戏结束 3: 游戏结束，显示再来一局的菜单选择 4: 游戏完全结束
    initGame(context){
      this.isInitial = true;
      this.endTime = Constant.endTime;
      game.totalScope = 0;
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.physics.arcade.checkCollision.down = false;
      game.physics.arcade.checkCollision.up = false;
      this.addBackground();
      this.carManage = new CarManager(game);
      this.mushroomEmmit = new MushroomEmmit(game);
      this.firstscene = SceneTalk(this, game);
      this.initTalk(0);
      this.addBeginCarText();
      this.bindEvent(context);
      this.afterListeners.forEach((fn)=>{
        fn();
      });

      //TODO:test
      game.time.advancedTiming = true;
    },
    initTalk(state){
      this.firstscene.restart(state);
    },
    bindEvent(context){
      game.input.onTap.add(this.onTap.bind(this), context);
    },
    addBackground(){
       game.add.sprite(0, 0, Constant.spriteImgs.gameBg);
    },
    preload() {
      var resImg = 'static/imgs/receiveSth',
          winW = document.body.clientWidth,
          ratio = winW / game.world.width;

      game.scale.maxWidth = winW;
      game.scale.maxHeight = game.world.height * ratio;
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

      game.input.touch.preventDefault = false;
      Phaser.Canvas.setTouchAction(game.canvas, 'initial');
      game.load.atlas('cars', resImg+ '/cars.png', resImg+ '/cars.json');
      game.load.atlas('pinkEf', resImg+ '/pinkEf.png', resImg+ '/pinkEf.json');
      game.load.atlas('blackEf', resImg+ '/blackEf.png', resImg+ '/blackEf.json');
      game.load.atlas('minusEf', resImg+ '/minusEf.png', resImg+ '/minusEf.json');
      game.load.atlas('mushJump', resImg+ '/mushtalkj.png', resImg+ '/mushtalkj.json');
      game.load.image(Constant.spriteImgs.gameBg, resImg + '/gamebg.webp');
    },
    create(context) {
      this.initGame(context);
      this.emit('create');
    },
    update(){
      var activePointer = game.input.activePointer,
          swapDir, distance,
          allYellorMr;

      if(this.isStop)
        return;
      if(activePointer.isDown){
        if (!Phaser.Rectangle.contains(this.carManage.car.sprite, game.input.x, game.input.y))
        {
            if(!!this.lastPoint){
              distance = activePointer.x - this.lastPoint.x;
              if(activePointer.id == this.lastPoint.id && Math.abs(distance) > 1){
                swapDir = distance > 0 ? 1 : -1;
                this.swapMove(activePointer,swapDir,distance);
              }
            }
        }
        this.lastPoint = {x: activePointer.x, y: activePointer.y,id: activePointer.id};
      }else{
        this.lastPoint = null;
      }
      this.mushroomEmmit.create();
      allYellorMr = this.mushroomEmmit.getAllMr();

      if(allYellorMr){
        game.physics.arcade.collide(allYellorMr.sprites, allYellorMr.sprites);
        game.physics.arcade.collide (allYellorMr.sprites, this.carManage.car.sprite, this.mushHitCar.bind(this),null,this);
        allYellorMr.room.forEach(this.checkMushroomBound.bind(this));
      }
    },
    checkMushroomBound(item){
      var car = this.carManage.car.sprite,
          mushBody = item.sprite.body,
          carbodyRight,
          mushVx,
          overlapLx,
          overlapRx;

      if(!item.isAlive)
        return;

      if(item.sprite.y >= (game.height - item.sprite.height/2 - 15)){
        item.sprite.body.velocity.setTo(0,0);
        // this.mushroomEmmit.destroyMushRoom(item);
        this.mushroomEmmit.hideMushRoom(item);
      }else if(item.sprite.y <= 0){
        // item.sprite.body.velocity.setTo(0,0);
        // this.mushroomEmmit.destroyMushRoom(item);
      }else if(mushBody.bottom > car.body.position.y){

        //car的body的bound与car的sprite的bound是不一样的
        carbodyRight = car.position.x + car.width;
        overlapLx = mushBody.right - car.position.x;
        overlapRx = carbodyRight - item.sprite.position.x + item.sprite.width / 2;
        mushVx = mushBody.velocity.x;

        if(overlapLx >= 0 && item.sprite.position.x < car.centerX){

          item.sprite.x -= overlapLx;
          mushBody.velocity.x = -20 - mushVx * mushBody.bounce.x;
          item.sprite.body.velocity.y += 30;

        }else if(overlapRx >= 0 && mushBody.right > car.centerX){

          item.sprite.x += overlapRx;
          mushBody.velocity.x = 20 + mushVx * mushBody.bounce.x;
          item.sprite.body.velocity.y += 30;

        }
      }
    },
    render(){

      // game.debug.spriteInfo(this.carManage.car.sprite, 32, 32,'#000');
      // game.debug.body(this.carManage.car.sprite);
      // game.debug.text( 'FPS:' + game.time.fps, 100, 280 );
      if(!this.isStop)
        this.updateDownCounter();
    },
    destroy(){
      game && game.destroy();
    },
    updateDownCounter(){
      let elapsedTime = game.time.totalElapsedSeconds() - this.beginTime,
          remainTime = this.endTime / 1000 - elapsedTime;

      remainTime = remainTime < 0 ? 0 : (remainTime | 0);

      $('.sec-hand-txt').text(formatCounter(remainTime));
    },
    showDownCount(count){
      var sprite = this.downCountSprite,
          tween;

      if(!sprite){
        sprite = game.add.sprite(game.world.centerX, 0, Constant.spriteImgs.carsMain);
        sprite.anchor.set(0.5);
        sprite.y = game.world.centerY - sprite.height *2;
        sprite.scale.x = 0.7;
        sprite.scale.y = 0.7;
        sprite.alpha = 0;
      }

      if(!count){
        sprite.frameName = Constant.spriteImgs.begin;
        setTimeout(()=>{
          sprite.exists = false;
        }, 1000);
      }else{
        sprite.frameName = Constant.spriteImgs['downCount' + count];
      }

      sprite.exists = true;

      game.add.tween(sprite.scale).from({ x: 1, y:1 }, 1000, "Quart.easeOut").start();
      tween = game.add.tween(sprite).from({ alpha: 1 }, 1000, "Quart.easeOut");
      tween.start();

      this.downCountSprite = sprite;
    },
    roundEnd(isAutoHide){
      var sprite = this.downCountSprite,
          tween;

      sprite.frameName = Constant.spriteImgs.end;
      sprite.exists = true;

      game.add.tween(sprite.scale).from({ x: 1, y:1 }, 2000, "Quart.easeOut").start();
      tween = game.add.tween(sprite).from({ alpha: 1 }, 2000, "Quart.easeOut");
      if(isAutoHide){
        tween.onComplete.add(()=>{

          sprite.exists = false;

        },this);
      }

      tween.start();
    },
    hideEndWord(){
      this.downCountSprite.exists = false;
    },
    addBeginCarText(){
      var carSprite = this.carManage.car.sprite;
      var sprite = game.add.sprite(carSprite.centerX , carSprite.centerY - 6, Constant.spriteImgs.carsMain,Constant.spriteImgs.beginwd);

      sprite.anchor.set(0.5);
      this.beginCarTxt = sprite;
    },
    setCarImgTxt(key){
      if(!key){
        if(this.beginCarTxt)
          this.beginCarTxt.exists = false;
        return;
      }

      if(!this.beginCarTxt){
        this.addBeginCarText();
      }else{
        this.beginCarTxt.exists = true;
      }

      this.carManage.car.setValue(['']);
      this.beginCarTxt.frameName = key;
    },
    toStartGame(){
      this.firstscene.destroy();
      this.beginCarTxt.exists = false;
      // this.beginCarTxt = null;
      this.playing = true;
      this.states = 1;
    },
    beginGame(){
      this.isStop = false;
      this.carManage.start();
      this.mushroomEmmit.start();

      let gameTimer = game.time.create(false);

      //游戏结束时间
      gameTimer.add(this.endTime, this.stopGame.bind(this), this);

      gameTimer.start();

      this.gameTimer = gameTimer;

      this.beginTime = game.time.totalElapsedSeconds();
    },
    stopGame(){

      this.carManage.stop();
      this.isStop = true;
      this.mushroomEmmit.stop();
      this.roundEnd(true);
      this.resetGame();
      this.initTalk(1);
      Main.setValue('游戏结束');
    },
    resetGame(){
      this.isStop = true;
      this.carManage.reset();
      this.game.totalScope = 0;
      this.mushroomEmmit.start();
    },
    clickCar(sprite,point){
      //TODO:test
      if(navigator.userAgent.indexOf('Mobile') >= 0){
        if(!point.isMouse){
          this._clickCarFn();
        }
      }else{
        if(point.isMouse){
          this._clickCarFn();
        }
      }
    },
    onTap(pointer){

      if(Phaser.Rectangle.contains(this.carManage.car.sprite, pointer.x, pointer.y)){
        setTimeout(()=>{
          this.clickCar(null,pointer);
        },100);
      }
    },
    swapMove(pointer, dir,distance){

      if(dir > 0){
        this.carManage.move(1,distance);
      }else{
        this.carManage.move(-1,distance);
      }
    },
    mushHitCar(mush, car){
      var frameName;
      switch(mush.instanceObj.groupType){
        case 0:
          frameName = Constant.spriteImgs.plusScopeMg;
          break;
        case 1:
          frameName = Constant.spriteImgs.minusScopeMg;
          break;
        case 2:
          frameName = Constant.spriteImgs.boomMg;
          break;
      }
      // if( mush.body.right < car.position.x || mush.position.x > (car.body.position.x + car.width)
      //     || mush.body.bottom < car.position.y || mush.position.y > (car.position.y + car.height) )
      //   return;
      this.mushroomEmmit.doHitAction(mush);
      // this.carManage.car.addMushRoom(frameName);
      $('.gold-count').text(this.game.totalScope);
    },
    setValue: function(value){
      value = value.split('|');
      this.carManage.car.setValue(value);
    },
    addCreateListener(fn){
      this.afterListeners.push(fn);
    },
    addClickCar(fn){
      this._clickCarFn = fn;
    },
    init(){
      game = this.game = new Phaser.Game(Constant.worldWidth, Constant.worldHeight, Phaser.AUTO, 'game-canvas', {
          preload: this.preload.bind(this),
          create: this.create.bind(this),
          update: this.update.bind(this),
          render: this.render.bind(this)
        },true);

      return this;
    }
  }

  Main.addClickCar(()=>{
    switch (Main.states) {
      case 0:
        Main.toStartGame();
        // Main.setCarImgTxt();
        secondCounter(3,(count)=>{
          var tmpl = '开始夺奖';
          Main.setValue(tmpl);
          Main.showDownCount(count);
        },true,1000).then(()=>{
          setTimeout(function(){
            Main.beginGame();
          }, 1000);
        });
        break;
      default:

    }
  });

  return eventEmitter(Main.init());
}

function secondCounter(count,callback,isImmediate,time){
  time = time || 1000;

  return new Promise((resolve)=>{
    let  _count = count;

    const _innerReady = function(){
      callback && callback(_count);
      if(_count-- === 0){
        resolve();
      }else{
        setTimeout(_innerReady,time);
      }
    };

    if(isImmediate)
      _innerReady();
    else{
      setTimeout(_innerReady,time);
    }
  });
}



export default createGame;

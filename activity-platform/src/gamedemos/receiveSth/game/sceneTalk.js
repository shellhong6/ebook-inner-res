import Constant from '../Constant.js';

let game;

function addFirstScene(context, gameContext){
  game = gameContext;
  var group = game.add.group(),
      isStop = true,
      talkState;

  group.y =-80;
  group.x = -30;
  function BaseTalk(key,x,y,wx,wy){
    var mainKey = Constant.spriteImgs.mushJump;

    // if(talkState != 0)
    //   mainKey = Main.spriteImgs.carsMain;

    wx = wx || x;
    wy = wy || y;

    if(talkState == 0){
      this.talkWord = group.create(wx, wy, Constant.spriteImgs.carsMain,key);
      this.talkWordWidth = this.talkWord.width;
      this.talkWord.scale.setTo(0);
      this.talkWord.anchor.setTo(0.5);
    }

    this.spriteTalk = group.create(x, y, mainKey);

    this.spriteTalk.anchor.setTo(0.5);
  }

  function endAnimation(sprite,tween,pingTalk,resolve){
    pingTalk.animations.stop();
    resolve();
  }

  function PingTalk(){
    var sprites = new BaseTalk(Constant.spriteImgs.pinkword,game.world.centerX + 40, 400, game.world.centerX),
        pingTalk = sprites.spriteTalk,
        talkWord = sprites.talkWord,
        frameTime = 13,
        generateFrameNames,
        tween;

    pingTalk.frameName = 'pinkJ1.png';

    if(talkState == 0){
      generateFrameNames = Phaser.Animation.generateFrameNames('pinkJ', 1, 9, '.png');
    }else{
      generateFrameNames = Phaser.Animation.generateFrameNames('pinkJ', 10, 11, '.png');
      frameTime = 4;
    }
    pingTalk.animations.add('talk', generateFrameNames, frameTime, true);

    return ()=>{
      if(talkState == 0 || talkState == 3)
        pingTalk.animations.play('talk');
      return new Promise((resolve)=>{
        if(talkWord){
          game.add.tween(talkWord.scale).to({ y: 1,x: 1}, 800, "Linear", true, 0, 0,true).yoyo(true, 1000);
          tween = game.add.tween(talkWord).to({ y: talkWord.y + 150}, 800, "Linear", true, 0, 0,true);
          tween.yoyo(true, 1000);
          tween.onComplete.add(endAnimation, this,null,pingTalk,resolve);
        }else{
          setTimeout(resolve,200);
        }

      });
    };
  }

  function YellowTalk(){
    var spriteX = game.width - 140,
        spriteY = game.height - 340,
        sprites = new BaseTalk(Constant.spriteImgs.yellowkword,spriteX, spriteY, spriteX, spriteY - 30),
        yellowTalk = sprites.spriteTalk,
        talkWord = sprites.talkWord,
        frameTime = 8,
        generateFrameNames,
        tween;

    yellowTalk.frameName = 'psn1.png';

    if(talkState == 0){
      generateFrameNames = Phaser.Animation.generateFrameNames('psn', 1, 5, '.png');
    }else{
      generateFrameNames = Phaser.Animation.generateFrameNames('psn', 6, 7, '.png');
      frameTime = 4;
    }

    yellowTalk.animations.add('talk', generateFrameNames, frameTime, true);

    return ()=>{
      if(talkState == 0 || talkState == 3)
        yellowTalk.animations.play('talk');
      return new Promise((resolve)=>{
        if(talkWord){
          game.add.tween(talkWord.scale).to({ x: 1, y:1}, 800, "Linear", true, 0, 0,true).yoyo(true, 1000);
          tween = game.add.tween(talkWord).to({ x: yellowTalk.x - sprites.talkWordWidth }, 800, "Linear", true, 0, 0,true).yoyo(true, 1000);
          tween.onComplete.add(endAnimation, this,null,yellowTalk,resolve);
        }else{
          setTimeout(resolve,200);
        }

      });
    }
  }

  function BlackTalk(){
    var sprites = new BaseTalk(Constant.spriteImgs.blackword,200, 550, 200, 575),
        talkWord = sprites.talkWord,
        blackTalk = sprites.spriteTalk,
        generateFrameNames,
        frameTime = 13,
        tween;

    blackTalk.frameName = 'boomJ1.png';

    if(talkState == 0){
      generateFrameNames = Phaser.Animation.generateFrameNames('boomJ', 1, 8, '.png');
    }else{
      generateFrameNames = Phaser.Animation.generateFrameNames('boomJ', 9, 10, '.png');
      frameTime = 4;
    }

    blackTalk.animations.add('talk', generateFrameNames, frameTime, true);

    return ()=>{
      if(talkState == 0 || talkState == 3)
        blackTalk.animations.play('talk');
      return new Promise((resolve)=>{
        if(talkWord){
          game.add.tween(talkWord.scale).to({ x: 1, y:1}, 800, "Linear", true, 0, 0,true).yoyo(true, 1000);
          tween = game.add.tween(talkWord).to({ x: blackTalk.centerX + blackTalk.width - 20}, 800, "Linear", true, 0, 0,true);
          tween.yoyo(true, 1000);
          tween.onComplete.add(endAnimation, this,null,blackTalk,resolve);
        }else{
          setTimeout(resolve,200);
        }

      });
    }
  }

  function CarTalk(){
    var cardWordKey;

    switch(talkState){
      case 0:
        cardWordKey = Constant.spriteImgs.carWord;
        break;
      case 2:
        cardWordKey = Constant.spriteImgs.lotterywd;
        break;
      case 3:
        cardWordKey = Constant.spriteImgs.gameendwd;
        break;
    }

    if(!cardWordKey)
      return;

    var carSprite = context.carManage.car.sprite,
        talkWord = group.create(carSprite.centerX, carSprite.y + 130, Constant.spriteImgs.carsMain, cardWordKey),
        tween;

    talkWord.anchor.setTo(0.5,1);
    talkWord.scale.setTo(0);

    return ()=>{
      return new Promise((resolve)=>{
        var tween, y;

        y = carSprite.y + 70;
        if(talkState == 3)
          y = carSprite.y + 100;
        game.add.tween(talkWord.scale).to({ x: 1, y:1}, 800, "Linear", true, 0, 0,true).yoyo(true, 1000);
        tween = game.add.tween(talkWord).to({ y: y}, 800, "Linear", true, 0, 0,true);
        tween.yoyo(true, 1000);
        tween.onComplete.add(resolve);
      });
    };
  }
  var pingTalkFn,
      yellowTalkFn,
      blackTalkFn,
      carTalkFn,
      startId = 0;//用来防止start方法递归死循环

  function initTalk(state){
    if(state == 3){
      group.y = -130;
    }
    else
      group.y =-80;

    talkState = state;
    pingTalkFn = PingTalk(),
    yellowTalkFn = YellowTalk(),
    blackTalkFn = BlackTalk(),
    carTalkFn = CarTalk();
    startId ++ ;

    start(startId);
  }

  function start(id){
    var chains = blackTalkFn().then(pingTalkFn).then(yellowTalkFn);

    if(carTalkFn)
      chains = chains.then(carTalkFn);

    chains.then(()=>{
      if(!isStop && id == startId)
        start(id);
    });
  }

  return {
    destroy(){
      if(!isStop){
        group.destroy(true,true);
        group.removeAll();
        isStop = true;
      }
    },
    restart(state){
      if(talkState != state)
        this.destroy();

      if(isStop){
        initTalk(state);
        isStop = false;
      }
    }
  }
}
export default addFirstScene;

import eventEmitter from 'event-emitter';

import Constant from './Constant.js';
import pixelParser from './pixelParser.js';
import tools from './tools.js';

//TODO: test
let word = new pixelParser();

word.width =6;
word.height = 10;
word.append(word.width,1)
    .append(word.width,1)
    .append(2,1).lineEnd()
    .append(2,1).lineEnd()
    .append(word.width,1)
    .append(word.width,1)
    .append(2,1).append(word.width-4,0).append(2,1)
    .append(2,1).append(word.width-4,0).append(2,1)
    .append(word.width,1)
    .append(word.width,1);

let word_6 = pixelParser.parseData(word.toBigInt());

let word1Paser = new pixelParser();
word1Paser.width = 2;
word1Paser.height = 10;

for(var i=0;i<word1Paser.height;i++){
  word1Paser.append(word1Paser.width,1)
}

let word_1 = pixelParser.parseData(word1Paser.toBigInt());

let word8Paser = new pixelParser();

word8Paser.width = 6;
word8Paser.height = 10;
word8Paser.append(word.width,1)
          .append(word.width,1)
          .append(2,1).append(word.width-4,0).append(2,1)
          .append(2,1).append(word.width-4,0).append(2,1)
          .append(word.width,1)
          .append(word.width,1)
          .append(2,1).append(word.width-4,0).append(2,1)
          .append(2,1).append(word.width-4,0).append(2,1)
          .append(word.width,1)
          .append(word.width,1)

let word_8 = pixelParser.parseData(word8Paser.toBigInt());


function createGame(){
  let game;

  const Main = eventEmitter({
    afterListeners:[],
    isStop: true,
    playing: false,
    actived: false,
    ballOnPaddle: true,
    states:0, //0: 初始状态 1:游戏中 2:打落了所有球,一轮游戏结束 3: 游戏结束，显示再来一局的菜单选择 4: 游戏完全结束
    initGame(context){

      this.isInitial = true;

      game.physics.startSystem(Phaser.Physics.ARCADE);

      game.physics.arcade.setBounds(Constant.borderdBound, Constant.boundTop, game.world.width - Constant.borderdBound*2, game.world.height - Constant.boundTopBottom);

      this.addBackground();

      this.bindEvent(context);

      this.afterListeners.forEach((fn)=>{
        fn();
      });
    },
    bindEvent(context){
      game.input.onTap.add(this.releaseBall.bind(this), context);
    },
    addBackground(){
      game.add.sprite(0, 0, Constant.starfieldMain);

      this.addBricks();
      this.addWeapon();
      this.addMenu();
      this.addMenuTip();

      let style = { font: "38px Arial", fill: "#41c4e2", wordWrap: true, align: "center",fontWeight:'bold'};

      this.counterTxt = game.add.text(Constant.borderdBound + Constant.counterLeft, Constant.counterTop , "0", style);
    },
    addBricks(){
      let bricks = game.add.group(),
          totalWidth,
          left,
          brick;

      bricks.enableBody = true;
      bricks.physicsBodyType = Phaser.Physics.ARCADE;

      let word6Width = word.width * Constant.brickWidth,
          word1Width = word1Paser.width * Constant.brickWidth,
          allSpace = Constant.wordSpace * 2;

      totalWidth = allSpace + word6Width + word1Width + word8Paser.width * Constant.brickWidth;
      left = (game.world.width - totalWidth) / 2;

      this.drawWord(bricks, word_6, word.width, left, 0);
      this.drawWord(bricks, word_1, word1Paser.width, left + Constant.wordSpace + word6Width, 1);
      this.drawWord(bricks, word_8, word8Paser.width, left + allSpace + word6Width + word1Width, 2);

      this.totalBrickCount = this.livingBrickCount = bricks.countLiving();
      this.bricks = bricks;
    },
    drawWord(bricksGroup,data, width, left, specIdx){
      const wordLen = data.length,
            top = Constant.wordTop,
            specBrickPos = Constant.specBrickPos[specIdx];

      let brick;

      for(let i=0; i < wordLen; i++){
        let row = Math.floor(i / width),
            col = i % width,
            num = 1;

        if(data[i] == 1){
          if(specBrickPos[row] && specBrickPos[row][col]){
            num = 2;
          }

          brick = bricksGroup.create(left + (col * Constant.brickWidth), top + (row * Constant.brickHeight), Constant.breakoutMain, 'brick_' + num + '.png');
          brick.body.bounce.set(1);
          brick.body.immovable = true;
          brick.elementType = num;
        }
      }
    },
    addWeapon(){
      const paddlePosY = game.world.height - Constant.paddleTop;

      let paddle = game.add.sprite(game.world.centerX, paddlePosY, Constant.breakoutMain, 'paddle.png');
      paddle.anchor.setTo(0.5);

      game.physics.enable(paddle, Phaser.Physics.ARCADE);

      paddle.body.collideWorldBounds = true;
      paddle.body.bounce.set(1);
      paddle.body.immovable = true;

      this.ballTop = paddle.y - Constant.ballPosPaddleTopFactor;

      let ball = game.add.sprite(game.world.centerX, this.ballTop, Constant.breakoutMain, 'ball.png');

      ball.anchor.set(0.5);
      ball.checkWorldBounds = true;

      game.physics.enable(ball, Phaser.Physics.ARCADE);

      ball.body.collideWorldBounds = true;
      ball.body.bounce.set(1);

      ball.events.onOutOfBounds.add(this.ballLost.bind(this), this);

      ball.body.onWorldBounds = new Phaser.Signal();
      ball.body.onWorldBounds.add(this.hitBound, this);

      this.paddle = paddle;
      this.ball = ball;
    },
    addMenu(){
      let menuGroup = game.add.group();

      let btn = game.add.button(game.world.centerX, Constant.btnTop, Constant.breakoutMain, this.clickMenu, this);

      btn.frameName = 'start.png';

      btn.anchor.setTo(0.5);

      let style = { font: "46px Arial", fill: "#fff", wordWrap: true,
                    wordWrapWidth: btn.width, align: "center", fontWeight:'bold'};

      let menuTxt = game.add.text(btn.x, btn.y + 2, "开始游戏", style);

      menuTxt.anchor.setTo(0.5);

      menuGroup.add(btn);
      menuGroup.add(menuTxt);

      this.menuTxt = menuTxt;
      this.menuGroup = menuGroup;
    },
    disabledMenu(){
      this.menuGroup.getAt(0).input.enabled = false;
      this.menuGroup.alpha = 0;
    },
    enableMenu(){
      this.menuGroup.getAt(0).input.enabled = true;
      this.menuGroup.alpha = 1;
    },
    clickMenu(sprite, point){
      //TODO:  will fixed 单击时被非正常的多触发了1次单击事件，所以设个超时，防止像弹框这种出现又消失
      setTimeout(()=>{
        this.handleClick(point, ()=>{
          switch (this.states) {
            case 0:
            case 3:
              this.beginGame();
              break;

          }
          this.emit('states', this.states);
        },this);
      },50);

    },
    setMenuTxt(val, fontsize = 46){
      if(fontsize)
        this.menuTxt.fontSize = fontsize;
      this.menuTxt.text = val;
      if(this.menuGroup.alpha == 0)
        this.enableMenu();
    },
    addMenuTip(){
      let style = { font: "36px Arial", fill: "#ff3960", wordWrap: true,
                      align: "center"};

      let menuTip = game.add.text(game.world.centerX + 10, this.menuTxt.y + this.menuTxt.height + 70, '', style);

      menuTip.anchor.setTo(0.5);

      this.menuTip = menuTip;
    },
    setMenuTip(val=''){
      this.menuTip.text = val;
      if(val){
        this.changeMenuTip(true);
      }else{
        this.changeMenuTip();
      }

    },
    changeMenuTip(isRevive){
      if(isRevive)
        this.menuTip.revive();
      else
        this.menuTip.kill();
    },
    addArrowTip(){
      let arrowTip = game.add.sprite(game.world.centerX, game.world.height - Constant.paddleTop, Constant.breakoutMain, 'arrowtip.png');

      arrowTip.anchor.setTo(0.5);

      this.arrowTipTween = game.add.tween(arrowTip.scale).to({ x: 1.5, y:1 }, 500, "Quart.easeOut", true, 0, -1,true).yoyo(true, 300).start();

      this.arrowTip = arrowTip;
    },
    removeArrowTip(){
      if(!this.arrowTip)
        return;

      this.arrowTipTween.stop();
      this.arrowTip.kill();
    },
    hitBound(sprite, up, down){
      if(down){
        this.ballLost();
      }
    },
    releaseBall(point){
      let ball = this.ball;

      this.handleClick(point, ()=>{
        if (this.ballOnPaddle && !this.isStop)
        {
          this.ballOnPaddle = false;
          ball.body.velocity.y = -Constant.ballSpeed;
          ball.body.velocity.x = -75;
        }
      }, this);
    },
    handleClick(point,callback,context){
      if(!point)
        return callback.call(context);

      //TODO:test
      if(navigator.userAgent.indexOf('Mobile') >= 0){
        if(!point.isMouse){
          callback.call(context);
        }
      }else{
        if(point.isMouse){
          callback.call(context);
        }
      }
    },
    ballLost(){
      let ball = this.ball,
          paddle = this.paddle;

      this.ballOnPaddle = true;

      paddle.x = game.world.centerX;
      ball.reset(paddle.x, this.ballTop);
    },
    preload() {
      var resImg = 'static/imgs/breakout',
          winW = document.body.clientWidth,
          ratio = winW / game.world.width;

      game.scale.maxWidth = winW;
      game.scale.maxHeight = game.world.height * ratio;
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

      game.input.touch.preventDefault = false;
      Phaser.Canvas.setTouchAction(game.canvas, 'initial');

      $('#game-canvas canvas').css({width: game.scale.maxWidth + 'px', height: game.scale.maxHeight + 'px'});

      game.load.atlas(Constant.breakoutMain, `${resImg}/breakout.png`, `${resImg}/breakout.json`);
      game.load.image(Constant.starfieldMain, `${resImg}/gmbg.webp`);
    },
    create(context) {
      if(process.env.NODE_ENV !== 'production'){
        console.log('create...');
      }
      this.initGame(context);
    },
    update(){
      if(this.isStop)
        return;

      let paddle = this.paddle,
          ball = this.ball;

      const paddleHW = Constant.borderdBound + paddle.width / 2;

      paddle.x = game.input.x;

      if (paddle.x < paddleHW)
      {
          paddle.x = paddleHW;
      }
      else if (paddle.x > game.width - paddleHW)
      {
          paddle.x = game.width - paddleHW;
      }

      if (this.ballOnPaddle)
      {
          ball.x = paddle.x;
      }
      else
      {
          game.physics.arcade.collide(ball, paddle, this.ballHitPaddle.bind(this), null, this);
          game.physics.arcade.collide(ball, this.bricks, this.ballHitBrick.bind(this), null, this);
      }
    },
    ballHitPaddle(ball, paddle){
      let diff = 0;
      const speed = 5;

      if (ball.x < paddle.x)
      {
          //  Ball is on the left-hand side of the paddle
          diff = paddle.x - ball.x;
          ball.body.velocity.x = (-speed * diff);
      }
      else if (ball.x > paddle.x)
      {
          //  Ball is on the right-hand side of the paddle
          diff = ball.x -paddle.x;
          ball.body.velocity.x = (speed * diff);
      }
      else
      {
          //  Ball is perfectly in the middle
          //  Add a little random X to stop it bouncing straight up!
          ball.body.velocity.x = 2 + Math.random() * 8;
      }
    },
    ballHitBrick(ball, brick){
      if(brick.elementType == 2){
        brick.frameName = 'brick_3.png';
        brick.elementType = 3;
      }else{

        if(brick.elementType == 3){
          brick.elementType = 2;
          brick.frameName = 'brick_2.png';
        }

        brick.kill();
        this.livingBrickCount --;
      }
      //  Are they any bricks left?
      if (this.livingBrickCount == 0)
      {
          //  New level starts

          ball.body.velocity.set(0);

          // reset the ball and paddle
          this.ballLost();

          this.stopGame();

          this.setDeadBrickCount(this.totalBrickCount - this.livingBrickCount);

          if(this.beforeBeginGameAgain()){
            this.states = 3;
            this.showPlayAgain();
          }else{
            this.resetGame();
            this.afterGameOver();
          }
      }
    },
    render(){
      if (this.isStop || this.ballOnPaddle)
        return;

      this.setDeadBrickCount(this.totalBrickCount - this.livingBrickCount);
    },
    destroy(){
      game && game.destroy();
    },
    setDeadBrickCount(val){
      this.counterTxt.text = val;
    },
    //可覆盖此方法
    beforeBeginGame(callback){
      callback();
    },
    //可覆盖此方法
    beforeBeginGameAgain(){
      return false;
    },
    //可覆盖此方法
    afterGameOver(){},
    beginGame(){
      this.beforeBeginGame(()=>{
        this.states = 1;
        this.isStop = false;
        this.livingBrickCount = this.totalBrickCount;
        this.disabledMenu();
        this.releaseBall();
      });
    },
    stopGame(){
      this.isStop = true;
    },
    resetGame(){
      this.isStop = true;
      this.ballLost();
    },
    showPlayAgain(){
      this.menuTxt.text = '再来一局';
      this.enableMenu();
      //bring the bricks back from the dead :)
      this.bricks.callAll('revive');
      this.isStop = true;
    },
    addCreateListener(fn){
      if(this.isInitial){
        fn();
      }
      this.afterListeners.push(fn);
    },
    init(){
      game = this.game = new Phaser.Game(Constant.worldWidth, Constant.worldHeight, Phaser.AUTO, 'game-canvas', {
        preload: this.preload.bind(this),
        create: this.create.bind(this),
        update: this.update.bind(this),
        render: this.render.bind(this)
      },true);

      // game = Main.world = createGame();
      return this;
    }
  });

  return Main.init();
}

// var game = createGame();

// window.game = Main;
// Main.world = game;
export default createGame;

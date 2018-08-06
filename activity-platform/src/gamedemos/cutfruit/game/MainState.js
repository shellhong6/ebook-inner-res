import State from './state.js';
import Fruit from './Fruit.js';
import ObjectEmitter from './ObjectEmitter.js';
import Blade from './Blade.js';
import Constant from '../Constant.js';
import EventEmitter from '../eventStore.js';
import Tools from '../tools.js';
import actions from './actions.js';

export default class MainState extends State{

  constructor(game){
    super(game);
    this.name = 'Main';
    this.endTime = Constant.endTime;
  }
  init(status){
    this.status = status || 'beginStatus';
    this.isPlay = this.isStart = false;
    this.sliceFruitScope = 0;
    this.stage.disableVisibilityChange = true;
  }
  preload() {
    let game = this.game,
        readyMain = Constant.readyMain;

    game.load.path = Constant.baseImgContext;

    game.load.atlas(readyMain, readyMain + '.png', readyMain + '.json');
  }
  create() {
    let game = this.game;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;

    let rect = new Phaser.Rectangle(0, 0, Constant.worldWidth, Constant.worldHeight);
    let bgPlatform = game.add.sprite(0, 0, Constant.resourceMain, 'plat1.png');
    bgPlatform.alignIn(rect,Phaser.BOTTOM_LEFT);
    bgPlatform.cacheAsBitmap = true;

    this.fruitsGroup = game.add.group();

    this.objectEmitter = new ObjectEmitter({
        game: game,
        group: this.fruitsGroup,
        startBombTime: Constant.startBombTime,
        emitBombInterval: Constant.emitBombInterval
    });
    this.blade = new Blade({game: game});

    this.addFruitCounter();

    this.isStart = true;

    game.paused = true;

    // if(this.status != 'beginStatus'){
      this.playReady();
    // }

  }
  //切的水果数量
  addFruitCounter(){
    let game = this.game;

    let countSprite = game.add.sprite(78, 88, Constant.resourceMain, 'count.png');

    countSprite.anchor.set(0.5);

    countSprite.cacheAsBitmap = true;
    let style = { font: "52px Arial", fill: "#fff", align: "center",fontWeight:'bold'};

    let counterTxt = game.add.text(countSprite.x + Constant.counterLeft, countSprite.y , "x 0", style);

    counterTxt.anchor.set(0, 0.5);

    counterTxt.setShadow(0, 5, '#ffb020', 0);

    this.counterTxt = counterTxt;
  }
  //倒计时
  addTimeCounter(){
    let game = this.game;

    let timer = game.add.sprite(857, 94, Constant.resourceMain, 'timer.png');

    timer.anchor.set(0.5);

    timer.cacheAsBitmap = true;

    let style = { font: "52px Arial", fill: "#fff", align: "center",fontWeight:'bold'};

    let timerTxt = game.add.text(timer.x + Constant.counterLeft, timer.y , `${Tools.formatCounter(Constant.endTime/1000)}`, style);

    timerTxt.anchor.set(0, 0.5);

    timerTxt.setShadow(0, 5, '#ffb020', 0);

    this.timerTxt = timerTxt;
    this.counterTimer = timer;
  }
  collideBladeAndFruits(){
    let bladePts = this.blade._points,
        p1 = bladePts[bladePts.length-1];

    if(bladePts.length < 2)
      return;

    let objects = this.objectEmitter.objects,
        len = objects.length;

    while(len--){
      let child = objects[len],
          body = child.sprite.body;

      //检测是否切到水果
      if( body.hitTest(p1.x, p1.y) && child.interacted)
      {
        child.interacted = false;
        if(child.name == 'bomb'){
          this.objectEmitter.exploding = true;
        }else{
          this.objectEmitter.createJuice(child);
        }
        this.sliceFruitScope = Math.max(this.sliceFruitScope + child.scope, 0);
        child.slice(this.blade.getAngle());
      }
    }

  }
  setDownCounter(){
    let elapsedTime = this.game.time.totalElapsedSeconds(),
        remainTime = this.endTime / 1000 - elapsedTime;

    remainTime = remainTime < 0 ? 0 : (remainTime | 0);

    this.timerTxt.text = Tools.formatCounter(remainTime);
  }
  update(){
    this.blade.update();
    this.objectEmitter.update();
    this.collideBladeAndFruits();
  }

  render(){
    if(this.game.paused)
      return;

    this.blade.render();
    this.counterTxt.text = 'x ' + this.sliceFruitScope  || 0;
    if(this.isPlay && this.timerTxt)
      this.setDownCounter();
  }
  setupTimeupTimer(sinceNow){
    const endTime = this.endTime;
    const self = this;

    let beginTime = sinceNow ? this.game.time.totalElapsedSeconds() : 0;

    clearTimeout(self.gameTimeupTimer);
//到达最短时间后触发判断是否安装成功，若安装成功则进入打开状态
    let _endGame = function(time){
      self.gameTimeupTimer = setTimeout(()=>{
        let duration = (self.game.time.totalElapsedSeconds()-beginTime) * 1000,
            deltaTime = endTime - duration;

        if(deltaTime <= 1000){
          self.timeToGameEnd();
        }
        else {
          _endGame(deltaTime);
        }
      }, time)
    }

    _endGame(endTime);
  }
  playReady(){
    this.game.paused = false;

    let game = this.game;

    let readyGif = game.add.sprite(game.world.centerX + 25, game.world.centerY, Constant.readyMain);

    readyGif.anchor.set(0.5);
    let goGif = readyGif.animations.add('readygo', Phaser.Animation.generateFrameNames('rg', 1, 26, '.png'));

    goGif.onComplete.add(this.play, this);

    goGif.play(10, false, true);
  }
  play(){
    this.game.paused = false;
    this.game.time.reset();
    this.objectEmitter.init();
    this.blade.activate();
    this.startTime = Date.now();
    this.setupTimeupTimer();
    this.isPlay = true;
    this.addTimeCounter();
    if(process.env.NODE_ENV !== 'production'){
      console.log('mainstate begin play');
    }
  }
  endGame(){
    // this.game.paused = true;
    this.objectEmitter.destroy();
    this.blade.inactivate();
    this.isStart = false;
    clearTimeout(this.gameTimeupTimer);
    EventEmitter.emit(EventEmitter.GAMEOVER, this);
  }
  showPlayAgain(){
    let stateManage = this.game.state;

    stateManage.start('Menu',true,false, 'againStatus');
  }
  timeToGameEnd(){

    EventEmitter.emit(EventEmitter.TIMETOGAMEEND, this);
    actions.states = 2;
  }
}

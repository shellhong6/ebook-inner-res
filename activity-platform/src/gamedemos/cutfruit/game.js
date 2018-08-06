import eventStore from './eventStore.js';

import Constant from './Constant.js';
import tools from './tools.js';
import {MainState, MenuState} from './game/index.js';

function createGame(){

  let game;

  const Main = {
    afterListeners:[],
    isStop: true,
    playing: false,
    waitToOpen: 1,
    readyToOpen: false,
    initGame(context){
      let mainstate = new MainState(game),
          menuState = new MenuState(game);

      game.state.add('Main', mainstate);
      game.state.add('Menu', menuState);
      game.state.start('Menu');

      this.isInitial = true;
      this.mainstate = mainstate;
      this.menuState = menuState;
    },
    preload() {
      var winW = document.body.clientWidth,
          ratio = winW / game.world.width;

      game.scale.maxWidth = winW;
      game.scale.maxHeight = game.world.height * ratio;
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.compatibility.scrollTo = false;//禁止页面被自动滚动到顶部
      game.stage.backgroundColor = '#6243b2';

      game.input.touch.preventDefault = false;
      Phaser.Canvas.setTouchAction(game.canvas, 'initial');
      game.input.maxPointers = 1;
      $('#game-canvas canvas').css({width: game.scale.maxWidth + 'px', height: game.scale.maxHeight + 'px'});
    },
    create(context) {
      if(process.env.NODE_ENV !== 'production'){
        console.log('create...');
      }
      this.initGame(context);

      eventStore.emit('create');
    },
    destroy(){
      this.menuState.destroy();

      if(this.mainstate.isStart)
        this.mainstate.endGame();
      game && game.destroy();

      //防止内部调用bindBuffer时获取到旧的buffer绑定到另一个新目标而报错
      Phaser.PIXI.WebGLGraphics.graphicsDataPool = [];
    },
    beginGame(){
      this.isStop = false;
      game.state.start('Main',true,false);
      this.menuState.isStart = false;
    },
    stopGame(){
      this.isStop = true;
      if(this.mainstate.isStart)
        this.mainstate.endGame();
    },
    beginPlay(){
      this.mainstate.play();
    },
    addCreateListener(fn){
      if(this.isInitial){
        fn();
      }
      this.afterListeners.push(fn);
    },
    toOpenState(){
      this.stopGame();
      game.state.start('Menu',true,false, 'openStatus',this.mainstate.sliceFruitScope);
    },
    toLotteryState(){
      this.stopGame();
      game.state.start('Menu',true,false, 'seeResultStatus', this.mainstate.sliceFruitScope);
    },
    backToMenu(){
      game.paused = false;
      this.mainstate.isStart = false;
      game.state.start('Menu',true,false, 'beginStatus');
    },
    //菜单相关
    setBtnTxt(val){
      let menuState = this.menuState;
      menuState.penddingOperation(()=>{
        menuState.setBtnTxt(val);
      });
    },
    setMenuTxt(val){

    },
    setMenuTip(val){
      this.menuState.setMenuTip(val);
    },
    addBeginScene(){
      this.menuState.addBeginScene();
    },
    getCutCount(){
      return this.mainstate.sliceFruitScope;
    },
    addTimeCounter(){
      this.mainstate.addTimeCounter();
    },
    killTimeCounter(){
      let mst = this.mainstate;

      mst.counterTimer.destroy();
      mst.timerTxt.destroy();
      mst.setupTimeupTimer(true);
    },
    init(){
      game = this.game = new Phaser.Game(Constant.worldWidth, Constant.worldHeight, Phaser.AUTO, 'game-canvas', {
        preload: this.preload.bind(this),
        create: this.create.bind(this)
      });

      return this;
    }
  }

  return Main.init();
}


export default createGame;

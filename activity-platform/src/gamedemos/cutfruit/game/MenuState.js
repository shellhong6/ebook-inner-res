import State from './state.js';
import Constant from '../Constant.js';
import EventEmitter from '../eventStore.js';
import actions from './actions.js';

export default class MenuState extends State{

  constructor(game){
    super(game);
    this.name = 'Menu';
    this.status = 'beginStatus';
    this.penddingOperations = [];
  }
  init(status, scope){
    if(status)
      this.status = status;
    this.sliceFruitScope = scope;
  }
  preload() {
    let game = this.game,
        resMain = Constant.resourceMain;

    game.load.path = Constant.baseImgContext;

    game.load.atlas(resMain, resMain + '.png', resMain + '.json');
  }

  create() {
    let game = this.game;

    let rect = new Phaser.Rectangle(0, 0, Constant.worldWidth, Constant.worldHeight);
    let bgPlatform = game.add.sprite(0, 0, Constant.resourceMain, 'plat1.png');

    bgPlatform.alignIn(rect,Phaser.BOTTOM_LEFT);

    bgPlatform.cacheAsBitmap = true;

    this.addBeginScene();

    this.addMenu();
    this.isStart = true;

    this.afterCreate();
    EventEmitter.emit('afterCreateMenu');
  }
  afterCreate(){
    let callback;
    while(callback = this.penddingOperations.shift()){
      callback();
    }
  }
  addBeginScene(){
    let scenes = ['scenewd.png', 'scorewd.png', 'noscore.png'];
    let game = this.game;
    let top = 340, left = 0;
    let beginScene = game.add.sprite(game.world.centerX, top, Constant.resourceMain, 'beginscene.png');
    let num = 2;

    if(this.sliceFruitScope == null){
      left = 50;
      num = 0;
    }
    else if(this.sliceFruitScope > 0){
      num = 1;
    }
    let sceneWd = game.add.sprite(game.world.centerX - left, top - 165, Constant.resourceMain, scenes[num]);

    beginScene.anchor.set(0.5, 0);
    sceneWd.anchor.set(0.5, 0);

    if(num == 1){
      let style = { font: "46px Arial", fill: "#e69a24", wordWrap: true,
                  wordWrapWidth: 50, align: "center", fontWeight:'bold'};
      let menuTxt = game.add.text(sceneWd.x + 48, sceneWd.y + 65, this.sliceFruitScope, style);
      menuTxt.anchor.set(0.5);
    }


  }
  addMenu(){
    let game = this.game;

    let menuGroup = game.add.group();

    let btn = game.add.button(game.world.centerX, Constant.btnTop, Constant.resourceMain , this.clickMenu, this);

    btn.frameName = 'start.png';

    btn.anchor.setTo(0.5);

    let btnWord = game.add.image(btn.x, btn.y, Constant.resourceMain, Constant.menuFrame[this.status]);

    btnWord.anchor.set(0.5);

    let style = { font: "28px Arial", fill: "#fff", wordWrap: true,
                  wordWrapWidth: btn.width, align: "center", fontWeight:'bold'};

    let menuTxt = game.add.text(btn.x, btn.y + 150, Constant.doc[this.status], style);

    menuTxt.anchor.setTo(0.5);

    menuGroup.add(btn);
    menuGroup.add(btnWord);
    menuGroup.add(menuTxt);

    this.btnWord = btnWord;
    this.menuTxt = menuTxt;
    this.menuGroup = menuGroup;
  }
  destroy(){
    actions.states = 0;
  }
  setBtnTxt(val){

    this.btnWord.frameName = val;
  }
  setMenuTip(val){
    this.menuTxt.text = val || '';
  }
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
  }

  clickMenu(sprite, point){
    if(this.isClick)
      return;

    this.isClick = true;
    setTimeout(()=>{
      this.isClick = false;
      this.handleClick(point, ()=>{
        // EventEmitter.emit(EventEmitter.RUNSTATEMACHINE);
        switch(actions.states){
          case 0:
            EventEmitter.emit(EventEmitter.BEGINGAME);
            actions.states = 1;
            break;
          default:
            EventEmitter.emit(EventEmitter.GAMESTATE, actions.states, actions);
        }
      },this);
    }, 100);
  }

  penddingOperation(cb){
    if(this.isStart){
      cb();
    }else{
      this.penddingOperations.push(cb);
    }
  }
}
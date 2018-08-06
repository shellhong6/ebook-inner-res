import CarWheel from './carWheel.js';
import Car from './car.js';

let game;

function CarManager(gameContext){
  game = gameContext;
  var group = game.add.group(),
      wheelGroup = game.add.group(),
      backWheelGroup = game.add.group(),
      car, carSprite,
      carWheel;

  var x,y,w,h,tempH;

  group.add(backWheelGroup);
  group.add(wheelGroup);

  car = new Car(this,group, game),
  carSprite = car.sprite;


  group.inputEnableChildren = true;
  this.manageGroup = group;

  this.resetPos();

  x = carSprite.centerX;
  y = carSprite.centerY;
  w = carSprite.width;
  h = carSprite.height;
  tempH = h/2 - 20;
  carWheel = new CarWheel(this,wheelGroup,x, y, game);

  carWheel.createBackWheel(backWheelGroup, -85, tempH-30);
  carWheel.createBackWheel(backWheelGroup, 110, tempH-30);
  carWheel.create(-95, tempH);
  carWheel.create(100, tempH);
  carWheel.createWheelShade(group,5, tempH + 5);

  this.car = car;
  this.carWheel = carWheel;
  this.bindEvent();
}

CarManager.prototype = {
  lastTime: 0,
  resetPos(){
    this.manageGroup.y = 0;
    this.manageGroup.x = 0;
  },
  bindEvent(){

  },
  move(dir,distance){
    this.car.update(dir,distance);
  },
  reset(){
    this.car.reset();
  },
  stop(){
    this.car.stopDrag();
  },
  start(){
    this.car.startDrag();
  }
}
export default CarManager;

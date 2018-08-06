import Constant from '../Constant.js';

let game;

function CarWheel(context,group,x,y, gameContext){
  game = gameContext;
  this.group = group;
  this.wheels = [];
  this.baseX = x;
  this.baseY = y;
  this.context = context;
}
CarWheel.prototype ={
  constructor: CarWheel,
  totalAngle:0,
  create(x, y){
    var sprite = this.group.create(this.baseX + x, this.baseY + y, Constant.spriteImgs.carsMain);
    sprite.frameName = Constant.spriteImgs.frontwheel;
    sprite.anchor.setTo(0.5);

    this.height = this.height || sprite.height;
    this.width = this.width || sprite.width;
    this.perimeter = this.perimeter || Math.PI * this.width;
    this.wheels.push({sprite:sprite,x:x,y:y,rotate:true});
  },
  createBackWheel(group,x,y){
    var sprite = group.create(this.baseX + x, this.baseY + y, Constant.spriteImgs.carsMain,Constant.spriteImgs.backwheel);
    sprite.anchor.setTo(0.5);

    this.wheels.push({sprite:sprite,x:x,y:y, rotate:false});
  },
  createWheelShade(group,x,y){
    var sprite = group.create(this.baseX + x, this.baseY + y, Constant.spriteImgs.carsMain,Constant.spriteImgs.wheelShade);

    sprite.width = 270;
    sprite.anchor.setTo(0.5);

    this.wheels.push({sprite:sprite,x:x,y:y, rotate:false});
  },
  update(dir, distance){
    var angle = distance / this.perimeter * 360,
        tween;

    this.totalAngle += angle;

    this.wheels.forEach((item)=>{

      item.sprite.x = this.baseX + item.x;
      item.sprite.y = this.baseY + item.y;

      if(!item.rotate)
        return;
      if(angle < 180)
        item.sprite.angle += angle;
      else{
        tween = game.add.tween(item.sprite).to({ angle: this.totalAngle }, Math.abs(angle)*0.8, "Quart.easeOut");
        tween.start();
      }

    });
  }
}
export default CarWheel;

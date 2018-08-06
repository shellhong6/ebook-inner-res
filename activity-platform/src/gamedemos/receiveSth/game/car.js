import Constant from '../Constant.js';

let game;

function Car(context,group, gameContext){
  game = gameContext;
  var sprite = group.create(0, 0, Constant.spriteImgs.carsMain),
      mushGroup = game.add.group();

  group.add(mushGroup);
  sprite.frameName = Constant.spriteImgs.car;
  game.physics.enable(sprite, Phaser.Physics.ARCADE);

  sprite.body.immovable = true;
  mushGroup.scale.set(0.6, 0.6);
  this.context = context;
  this.sprite = sprite;
  this.group = group;
  this.mushRoomGroup = mushGroup;
  this.resetPos();
  this.init();
}


Car.prototype = {
  constructor: Car,
  step: 15,
  mushIdx: 0,
  resetPos(){
    var wheel = game.add.sprite(-1000, -1000, Constant.spriteImgs.carsMain),
        halfW = this.sprite.width / 2;
    wheel.frameName = Constant.spriteImgs.frontwheel;

    this.sprite.y = game.height - this.sprite.height - wheel.height + 20;
    this.sprite.x = game.width / 2 - halfW;

    this.sprite.body.setSize(this.sprite.width * 0.4, 10, 100, 40);
    this.sprite.body.checkCollision.left = false;
    this.sprite.body.checkCollision.right = false;
     this.sprite.body.checkCollision.bottom = false;
    wheel.destroy();
  },
  init(){
    this.mushRoomGroup.x = this.sprite.centerX;
    this.mushRoomGroup.y = this.sprite.centerY - 90;
    this.addCarText();
    this.bindEvent();
  },
  bindEvent(){
    var sprite = this.sprite,
        bounds = new Phaser.Rectangle(0, this.sprite.y, game.width, this.sprite.height);;

    sprite.inputEnabled = true;
    // sprite.input.enableDrag();
    sprite.input.allowVerticalDrag = false;
    sprite.input.boundsRect = bounds;
    sprite.events.onDragUpdate.add(this.dragUpdate.bind(this));
  },
  stopDrag(){
    this.sprite.input.disableDrag();
  },
  startDrag(){
    this.sprite.input.enableDrag();
  },
  reset(){
    this.resetPos();
    this.dragUpdate(this.sprite);
  },
  move(dir,distance){
    var maxX = game.width - this.sprite.width;
    distance = distance || this.step * dir;

    this.sprite.x += distance;

    if(maxX < this.sprite.x){
      this.sprite.x = maxX;
    }else if(this.sprite.x < 0){
      this.sprite.x = 0;
    }
  },
  update(dir,distance){
    this.move(dir,distance);
    this.dragUpdate(this.sprite);
  },
  dragUpdate(sprite, pointer, dragX, dragY, snapPoint){
    var carWheel = this.context.carWheel,
        dir = carWheel.baseX < sprite.centerX ? 1 : -1,
        distance = sprite.centerX - carWheel.baseX;

    carWheel.baseX = sprite.centerX;
    carWheel.baseY = sprite.centerY;
    carWheel.update(dir,distance);
    this.carTxt.x += distance;
    this.mushRoomGroup.x += distance;
  },
  addMushRoom(key){
    var roomLen = this.mushRoomGroup.length,
        room;
    if(this.mushRoomGroup.length >= 4){
      room = this.mushRoomGroup.getChildAt(this.mushIdx);//this.mushRoomGroup.getFirstAlive();
      room.frameName = key;
      this.mushIdx = (this.mushIdx + 1) % 4;
      return;
      // room.kill();
      // this.mushRoomGroup.removeChild(room);
    }

    room = this.mushRoomGroup.create((roomLen-1)*100, -100, Constant.spriteImgs.carsMain,key);
    room.anchor.setTo(0.5);
  },
  addCarText(){
    var style = { font: "50px", fill: "#e93f3f", wordWrap: true, align: "center",fontWeight:'bold'};
    this.carTxt = game.add.text(this.sprite.x + 185, this.sprite.y + 152, "", style);
    this.carTxt.anchor.set(0.5);
  },
  setValue(value){
    var txtLen,
        fontSize;
    if(value.length == 1){
      this.carTxt.text = value[0];
      txtLen = this.carTxt.text.length;
      if(txtLen > 5)
        fontSize = '30px';
      else if(txtLen == 5)
        fontSize = '38px';
      else
        fontSize = '50px';

      this.carTxt.fontSize = fontSize;
    }
    else{
      this.carTxt.text = value.join('\n');
      this.carTxt.fontSize = '30px';
    }
  }
}

export default Car;

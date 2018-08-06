import Constant from '../Constant.js';

class Fruit{
  constructor(props){
    var game = props.game;

    $.extend(this, Constant.fruitProps,{
      canSlice: true
    },props);

    this._callbacks = [];
  }
  create(isNotInit){
    if(process.env.NODE_ENV !== 'production'){
      if(this.group == null){
        console.log('group must not be null')
      }
    }

    var resMain = Constant.resourceMain,
        game = this.game,
        group = this.group,
        sprite = group.create(0, 0, resMain, this.name + '.png'),
        gravityY = this.gravityY;

    sprite.anchor.setTo(0.5);

    sprite.smoothed = false;

    game.physics.arcade.enable(sprite);
    sprite.checkWorldBounds = true;

    sprite.events.onOutOfBounds.add(this.outofBounds, this);

    this.sprite = sprite;

    this.maxVy0 = Math.sqrt(this.maxHeight * 2 * gravityY);

    this.minVy0 = Math.sqrt(this.minHeight * 2 * gravityY);

    this.y = game.height - Constant.fruitProps.throwBottom;

    this.worldCenterX = game.world.centerX;

    if(!isNotInit)
      this.init();
  }
  init(){
    var resMain = Constant.resourceMain,
        game = this.game,
        group = this.group,
        sprite = this.sprite,
        gravityY = this.gravityY,
        body = sprite.body,
        flag;

    this.x = 100 + game.rnd.between(0,game.width - 200);

    flag= this.x < this.worldCenterX ? 1 : -1;

    this.interacted = true; //可以被切的状态
    this.isSliced = false;
    sprite.alpha = 1;
    sprite.reset(this.x, this.y);
    body.gravity.set(flag * 100, gravityY);
    body.velocity.set(flag * game.rnd.between(0,this.maxXSpeed), game.rnd.between(-this.minVy0,-this.maxVy0));
    body.acceleration.set(0, this.yAcceleration);
    body.angularVelocity = 100 * Math.random();

    if(this.canSlice){
      this.slicePartA = this.slicePartA || this.createSlicePart(game, resMain, '1', gravityY);
      this.slicePartB = this.slicePartB || this.createSlicePart(game, resMain, '2', gravityY);
    }
  }
  createSlicePart(game, resMain, id, gravity){
    var slicePart = game.world.create(0, 0, resMain, `${this.name}-${id}.png`, false);

    slicePart.anchor.setTo(0.5);
    game.physics.arcade.enable(slicePart);
    slicePart.body.gravity.set(0, gravity);
    slicePart.checkWorldBounds = true;

    slicePart.events.onOutOfBounds.add(()=>{
      //TODO: test
      slicePart.kill();

      // slicePart.destroy();
    }, this);

    return slicePart;
  }
  outofBounds(){
    let cbs = this._callbacks,
        cb;

    // while(cb = cbs.shift()){
    //   cb();
    // }
    cbs.forEach((cb)=>{
      cb();
    })

    this.kill();
  }
  addOutofBoundsCallback(cb){
    this._callbacks.push(cb);
  }
  kill(){
    this.sprite.kill();
  }
  remove(){
    this.sprite.destroy();
    this.group.removeChild(this.sprite);
    this.sprite = null;
    if(!this.isSliced && this.canSlice){
      this.slicePartA.destroy();
      this.slicePartB.destroy();
    }
  }
  update(){

  }
  /**
   * @param {*} angle 刀光的角度，顺时针方向，水平向右为0
   */
  slice(angle){

    if(this.isSliced || !this.canSlice)
      return;

    let spriteAngle = this.sprite.angle;

//加上sliceAngle使切割后分开的两部分水果初始旋转角度置于水平线。
    angle = (angle + (this.sliceAngle || 0)) % 360;

    this.isSliced = true;
    this.sprite.body.angularVelocity = 0;

    let sign = (spriteAngle + 360) % 360 >= 180;
    let left = sign ? this.slicePartA : this.slicePartB;
    let right = !sign ? this.slicePartA : this.slicePartB;

    left.reset(this.sprite.x - 50, this.sprite.y);
    right.reset(this.sprite.x + 50, this.sprite.y);

    if(!sign && angle > 180)
      angle -= 180;
    else if(sign && angle < 180)
      angle += 180;

    left.angle = right.angle = angle;
    left.body.velocity.x = -50;
    right.body.velocity.x = 50;

    this.sprite.alpha = 0;
    this.sprite.y = 9999;

    //TODO: test
    // this.sprite.alpha = 0.5
    // this.sprite.body.velocity.set(0);
    // this.sprite.body.gravity.set(0);
    // this.sprite.body.angularVelocity=0;
    // left.body.velocity.y=0;
    // left.body.velocity.x=-15;
    // left.body.gravity.set(0);
    // right.body.velocity.y=0;
    // right.body.velocity.x=15;
    // right.body.gravity.set(0);
    // setTimeout(()=>{
    //   this.sprite.y = 9999;
    // }, 100000);
    // setTimeout(()=>{
      // console.log('part : ' + angle);
      // this.game.paused = true;
    // }, 1000);
  }
}

export default Fruit;
const BITMAPNAME = 'ray';
const DEG_TO_RADIAN = Math.PI / 180;

export default class Ray{
  constructor(props){
    let {game, maxNum} = $.extend(this, {
      maxNum: 10,
      deltaTime: 0.2, //多久创建一条光线, 单位：秒
      currentNum: 0, //目前已创建光线数量
      isActived: true
    },props);

    let group = game.add.group();

    group.x = this.x;
    group.y = this.y;

    this.rayGroup = group;

    this.createRay(0, maxNum);

    this.startTime = Date.now();
  }

  static createRayBitmap(props){

    let {width, height, range, game} = $.extend({
      width: 30,
      height: 100,
      range: 20
    }, props);

    let bmd = game.make.bitmapData(width, height),
        ctx = bmd.context;

    ctx.beginPath();
    ctx.moveTo(width >> 1, 0);
    ctx.lineTo((width - range)>>1, height);
    ctx.lineTo((width + range)>>1, height);
    ctx.closePath();

    ctx.fillStyle = '#fff';
    ctx.fill();

    game.cache.addBitmapData(BITMAPNAME, bmd);
  }

  update(){
    let {game, deltaTime, currentNum, maxNum} = this;

    let len = maxNum - 1,
        passTime;

    if(currentNum >= maxNum){

      if(this.isActived){
        this.createMask();
        this.isActived = false;
      }

      return;
    }

    passTime = game.time.elapsedSecondsSince(this.startTime);

    if((passTime - deltaTime * currentNum) > deltaTime){
      this.createRay(currentNum, maxNum);
    }
  }

  createRay(i, maxNum){
    let rayItem = this.rayGroup.create(0,0, this.game.cache.getBitmapData(BITMAPNAME));

    rayItem.anchor.set(0.5,0);
    rayItem.angle = i * (360 / maxNum);

    this.currentNum ++;
  }

  createMask(){
    let {game} = this;

    let bmd = game.make.bitmapData(game.width, game.height),
        ctx = bmd.context;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, bmd.width, bmd.height);

    let sprite = game.add.sprite(0,0,bmd);

    let tween = game.add.tween(sprite).to( { alpha:0 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 500);

    this.rayGroup.destroy(true);

    this.removeAll();

    tween.onComplete.add(()=>{
      sprite.destroy();
    })

    return sprite;
  }
}
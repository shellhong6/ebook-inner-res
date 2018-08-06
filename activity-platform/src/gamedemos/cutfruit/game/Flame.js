import Constant from '../Constant.js';

class FlameParticle extends Phaser.Particle{
  constructor(game, x, y, key, frame){
    super(game, x, y, game.cache.getBitmapData(key));
    this.radioPerAngle = Math.PI / 180;
  }
  onEmit(){
    let angle = this.game.rnd.between(0, 360);

    this.rotation = this.getRadian(angle);

    let velocity = this.game.rnd.between(100,200),
        xVel = Math.cos(this.getRadian(angle)) * velocity,
        yVel = Math.sin(this.getRadian(angle)) * velocity;

    this.body.velocity.set( xVel, yVel);

  }
  getRadian(degrees){
    return this.radioPerAngle * degrees;
  }
}

class FlameBitmap{

  static createBitmap(props){
    props = $.extend({
      radius: 42,
      range: 10
    }, props);

    let game = props.game,
        radius = props.radius,
        range = props.range,
        halfRadius = radius >> 1;

    let p1 = {
        x: 0,
        y: halfRadius
      },
      p2 = {
        x: radius,
        y: halfRadius
      },
      p3 = {
        x: halfRadius,
        y: halfRadius - range
      },
      p4 = {
        x: halfRadius,
        y: halfRadius + range
      };

    let bmd = game.make.bitmapData(radius, radius),
        ctx = bmd.context,
        radgrad = bmd.ctx.createLinearGradient(p1.x, p1.y, p2.x,p2.y);

    radgrad.addColorStop(0, '#f0ef9c');
    radgrad.addColorStop(1, '#fafad9');

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.quadraticCurveTo(p3.x, p3.y, p2.x, p2.y);
    ctx.quadraticCurveTo(p4.x, p4.y, p1.x, p1.y);
    ctx.closePath();

    ctx.fillStyle = radgrad;
    ctx.fill();

    game.cache.addBitmapData('flame', bmd);
  }
}

class Flame{

  constructor(props){
    $.extend(this, {
      life: 1000
    }, props);

    this._flames = [];

    let game = props.game;

    let group = this.group;

    let emitter = game.add.emitter(this.x, this.y, 60);

    emitter.particleClass = FlameParticle;

    emitter.makeParticles('flame');

    emitter.gravity = 0;

    emitter.setXSpeed(-300, 300);

    emitter.setYSpeed(-300, 300);

    emitter.setRotation(0, 0);

    emitter.setAlpha(1, 0, this.life*2);

    emitter.setScale(2, 0.1, 1, 0.1, this.life*2, Phaser.Easing.Quintic.Out);

    let smoke = game.make.sprite(0,0, Constant.resourceMain, 'smoke.png');

    smoke.anchor.set(0.5);

    group.addChild(smoke);
    group.addChild(emitter);

    this.emitter = emitter;
    this.group = group;
  }
  init(){
    // if(this.isKill)
    //   this.group.revive();

    this.emitter.start(false, this.life, 16);
    this.isKill = false;
  }
  kill(){
    this.isKill = true;
    // this.group.kill();
  }
  destroy(){
    this.group.destroy(true);
  }
}

export {FlameBitmap, Flame};

class JuiceParticle extends Phaser.Particle{
  constructor(game, x, y, key, frame){
    super(game, x, y, game.cache.getBitmapData(key));
  }
}
class JuiceBitmap{
  static create(props){
    let {game, radius, colors, name} = $.extend({
      radius: 10
    }, props);


    let width = radius * 2;

    let bmd = game.add.bitmapData(width, width),
        // radgrad = bmd.ctx.createRadialGradient(32, 32, 4, 32, 32, 32),
        context = bmd.context;

    // radgrad.addColorStop(0, colors[0]);
    // radgrad.addColorStop(1, colors[1]);

    context.beginPath();
    context.arc(radius , radius, radius, 0, Math.PI * 2, 0);
    context.closePath();
    context.fillStyle = colors[0];
    context.fill();
    game.cache.addBitmapData(name, bmd);
  }
}
class Juice{
  constructor(props){

    $.extend(this, {
      width: 30,
      gravity: 500,
      life: 3000,
      count: 20,
      alive: true
    }, props);

    let game = props.game;

    let emitter = game.make.emitter(this.x, this.y, this.count);

    emitter.width = this.width;

    emitter.particleClass = JuiceParticle;

    emitter.makeParticles(this.name);

    emitter.gravity = this.gravity;

    // emitter.setXSpeed(-50, 50);

    emitter.setYSpeed(-350, 50);

    emitter.setRotation(0, 100);
;
    emitter.setAlpha(1, 0, this.life);

    emitter.setScale(1, 0.1, 1, 0.1, this.life * 2, Phaser.Easing.Quintic.Out);

    this.emitter = emitter;

    if(this.alive){
      this.initial = true;
      game.particles.add(emitter);
      emitter.start(true, this.life, null, this.count);
      this.addKillSignal();
    }

  }
  restart(x,y){
    let emitter = this.emitter;

    if(!this.initial){
      this.initial = true;
      this.game.particles.add(emitter);
    }
    emitter.emitX = x;
    emitter.emitY = y;
    emitter.start(true, this.life, null, this.count);
    this.addKillSignal();
  }
  destroy(){
    this.emitter.destroy();
  }

  addKillSignal(){
    this.game.time.events.add(this.life, ()=>{
      this.emitter.kill();
      this.onKill();
    }, this);
  }
}

export {JuiceBitmap, Juice, JuiceParticle};

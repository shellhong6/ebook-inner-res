import Constant from '../Constant.js';

let game;

function BaseMushRoom(key,effKey, gameContext){
  game = gameContext;

  var sprite = game.add.sprite(0, 0, Constant.spriteImgs.carsMain,key),
      frameNames = key.split('_'),
      effect;

  game.physics.enable(sprite, Phaser.Physics.ARCADE);

  sprite.anchor.set(0.5);
  sprite.body.collideWorldBounds = true;
  sprite.body.checkCollision.up = false;
  sprite.body.bounce.setTo(1, 1);
  sprite.body.gravity.y = game.rnd.integerInRange(50, 100);

  if(frameNames.length == 2){
    sprite.animations.add('blink', Phaser.Animation.generateFrameNames(frameNames[0]+'_', 1, 2, '.png'), 4, true);
    sprite.animations.play('blink');
  }

  effect = game.add.sprite(0, 0, effKey);

  effect.anchor.setTo(0.5, 0.5);
  effect.animations.add('kaboom');

  this.sprite = sprite;
  this.effect = effect;
  this.init = function(){
    var dir = 1;
    // this.sprite.x = game.world.randomX;
    // this.sprite.y = -this.sprite.height;
    this.sprite.reset(game.world.randomX,-this.sprite.height);
    if(this.sprite.x > 10){
      dir = game.rnd.integerInRange(0, 1) ? 1: -1;
    }
    this.sprite.body.velocity.y = game.rnd.integerInRange(250, 350);
    this.sprite.body.velocity.x = game.rnd.integerInRange(-100, 300) * dir;
    this.sprite.alpha = 1;
    this.isAlive = true;
  }
}
export default BaseMushRoom;

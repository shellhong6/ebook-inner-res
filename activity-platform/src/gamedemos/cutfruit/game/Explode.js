import Constant from '../Constant.js';

export default class Explode{

  constructor(props){
    $.extend(this,{
     onComplete: $.noop
    },props);

    let game = this.game;

    let explodeSprite = game.add.sprite(this.x, this.y, Constant.resourceMain);

    explodeSprite.anchor.set(0.5);

    let explodeAni = explodeSprite.animations.add('explode', Phaser.Animation.generateFrameNames('', 1, 16, '.png'));

    explodeAni.onComplete.add(this.endAnimation, this);

    this.explodeSprite = explodeSprite;
    this.explodeAni = explodeAni;
  }
  endAnimation(){
    this.explodeSprite.kill();
    this.onComplete();
  }
  position(x, y){
    this.explodeSprite.position.set(x,y);
  }

  play(){
    this.explodeSprite.revive();
    this.explodeAni.play(16, false);
  }
}
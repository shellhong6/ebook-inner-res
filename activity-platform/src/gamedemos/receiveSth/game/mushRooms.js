import BaseMushRoom from './baseMushRoom.js';
import Constant from '../Constant.js';

function PinkMushRoom(gameContext){

  BaseMushRoom.call(this, Constant.spriteImgs.plusScopeMg, Constant.spriteImgs.pinkEfMain, gameContext);

  this.doHitAction = function(){
    gameContext.totalScope += 10;
    this.effect.reset(this.sprite.x,this.sprite.y);
    this.effect.play('kaboom', 30, false, true);
  }
}

function BlackMushRoom(gameContext){
  BaseMushRoom.call(this,Constant.spriteImgs.boomMg, Constant.spriteImgs.blackEfMain, gameContext);
  // this.sprite.anchor.set(0.5);

  this.doHitAction = function(){
    gameContext.totalScope = 0;
    this.effect.reset(this.sprite.x,this.sprite.y);
    this.effect.play('kaboom', 24, false, true);
  }
}

function YellowMushRoom(gameContext){
  BaseMushRoom.call(this,Constant.spriteImgs.minusScopeMg, Constant.spriteImgs.minusEfMain, gameContext);

  this.doHitAction = function(){
    gameContext.totalScope -= 20;
    if(gameContext.totalScope < 0)
      gameContext.totalScope = 0;
    this.effect.reset(this.sprite.x,this.sprite.y);
    this.effect.play('kaboom', 30, false, true);
  }
}

export {PinkMushRoom, BlackMushRoom, YellowMushRoom};

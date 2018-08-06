import Fruit from './Fruit.js';
import {Flame} from './Flame.js';
import Explode from './Explode.js';

// import Ray from './Ray.js';

export default class Bomb extends Fruit{

  constructor(props){
    super(props);
    this.canSlice = false;
  }
  create(){
    super.create(true);

    let sprite = this.sprite,
        body = sprite.body;

    this.flame = new Flame({game: this.game, x: body.halfWidth, y: -body.halfHeight, group: this.sprite});

    this.init();

  }
  init(){
    let game = this.game,
        flame = this.flame;
    super.init();

    // flame.group.position.set(this.x + (this.sprite.width >> 1), this.y- (this.sprite.height >> 1));
    flame.init();
  }

  update(){
    let {x,y} = this.sprite.position;
    // this.flame.group.position.set(x + (this.sprite.width >> 1), y - (this.sprite.height >> 1));

    super.update();

    if(this.ray){
      this.ray.update();
    }

  }
  kill(){
    super.kill();
    this.flame.kill();
  }
  remove(){
    super.remove();
    this.flame.destroy();
    this.flame = null;
  }

  slice(){
    let sprite = this.sprite,
        game = this.game,
        body = sprite.body,
        x = sprite.x,
        y = sprite.y;

    body.velocity.set(0);
    body.angularVelocity = 0;
    body.gravity.set(0);
    body.acceleration.set(0);
//TODO: no end the game
    // this.ray = new Ray({game: this.game, x: sprite.x, y: sprite.y, removeAll: this.removeAll});
    this.flame.kill();

    sprite.alpha = 0;
    sprite.y = 9999;

    if(!this.explodeAnimation)
      this.explodeAnimation = new Explode({game: game, x: x, y: y});
    else{
      this.explodeAnimation.position(x, y);
    }
    this.explodeAnimation.play();
  }
}
window.explode = Explode;


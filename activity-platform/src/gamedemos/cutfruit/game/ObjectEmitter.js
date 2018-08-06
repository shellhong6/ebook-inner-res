import Fruit from './Fruit.js';
import Bomb from './Bomb.js';
import {JuiceBitmap, Juice, JuiceParticle} from './Juice.js';
import {FlameBitmap} from './Flame.js';
// import Ray from './Ray.js';
import Constant from '../Constant.js';

const juiceParticleBmd = 'juiceBmd',
      cacheJuiceCount = Constant.cache.juiceCount;

class ObjectEmitter{

  constructor(props){
    $.extend(this, {
      emitInterval: 1000,
      minCount: 2,
      maxFruitCount: Constant.maxFruitCount,
      maxCount: 2,
      increateStep: 0 //每x秒递增一个最大水果数
    }, props);

    this.objects = [];
    this.recycleObjects = {};
    this.recycleJuices = [];
    this.fruitTypes = Constant.fruitTypes;
  }

  init(){
    let game = this.game,
        recycleJuices = this.recycleJuices;

    JuiceBitmap.create({game: game, colors: Constant.fruitProps.juiceColor, name: juiceParticleBmd});

    for(let i=0; i < cacheJuiceCount; i++){
      recycleJuices.push(new Juice({
          game: game,
          name: juiceParticleBmd,
          alive: false,
          onKill(){
            if(recycleJuices.length < cacheJuiceCount)
              recycleJuices.push(this);
            else{
              this.destroy();
            }
          }
        })
      )
    }

    FlameBitmap.createBitmap({game: game});

    // Ray.createRayBitmap({game: game, width: 100, range: 80, height: game.height});

    this.start();
  }
  start(){
    this.isStart = true;
    this.startTime = Date.now();
    this.doEmit();

    //TODO: test
    // let bomb = new Bomb({game: this.game, group: this.game.world, name: 'bomb'});

    // bomb.create();

    // bomb.sprite.body.gravity.set(0);
    // bomb.sprite.body.velocity.set(0);
    // bomb.sprite.body.acceleration.set(0);
    // bomb.sprite.body.angularVelocity = 0;

    // bomb.sprite.position.set(300,200);
    // window.flame = bomb.flame;
    // window.bomb = bomb;
  }
  doEmit(){
    const num = this.game.rnd.between(this.minCount,this.maxCount - this.objects.length ) ;
    this.emitting = true;
    for(var i = 0; i < num; i++){
      (function(time,self){
        setTimeout(()=>{
          if(!self.isStart)
            return;

          let obj = self.createRandomObject();

          self.objects.push(obj);

          self.emitObject(obj);

          if(time == num - 1){
            self.emitting = false;
          }
        }, 200 * time);
      })(i, this);

    }
  }
  emitObject(obj){
    if(obj.beRecycle){
      obj.group.addChild(obj.sprite)
      return obj.init();
    }


    //水果掉出去了
    obj.addOutofBoundsCallback(()=>{
      let recyleArray = this.recycleObjects[obj.name];

      this.objects = this.objects.filter((item)=>{
        return item != obj;
      })

      obj.beRecycle = true;
      obj.group.removeChild(obj.sprite);
      if(!recyleArray)
        recyleArray = this.recycleObjects[obj.name] = [];

      recyleArray.push(obj);

      if(obj.name == 'bomb')
        this.bomb = null;

      obj == null;

      if(this.objects.length <= this.minCount && !this.emitting && this.isStart){
        clearTimeout(this.emitTimer);
        this.emitTimer = setTimeout(()=>{
          // console.time('doEmit')
          this.doEmit();
          // console.timeEnd('doEmit')
        }, this.emitInterval);
      }
    })
  }
  createRandomObject(){
    const game = this.game,
          type = this.getRandomType();

    let recyles = this.recycleObjects[type.name],
        obj;

    if(recyles && recyles.length){
      //TODO: hitcache
      window.hitCache++;
      obj = recyles.pop();
      if(obj.name == 'bomb')
        this.bomb = obj;
      return obj;
    }else if(type.name == 'bomb'){
      obj = new Bomb({game: game, removeAll: this.destroy.bind(this)});
      this.bomb = obj;
    } else {
      obj = new Fruit({
            hasJuice: true,
            game: game
          });
    }

    $.extend(obj, type, {
      group: this.group
    });

    obj.create();

//TODO: nohit cache
    window.nohit++;

    return obj;
  }
  getRandomType(){
    let game = this.game;
    const types = this.fruitTypes;

    const passTime = game.time.elapsedSecondsSince(this.startTime);

    if(this.maxCount < this.maxFruitCount){
      if(passTime - this.increateStep > 2){
        this.maxCount++;
        this.increateStep += 2;
      }
    }

    if(!this.bomb && passTime > this.startBombTime &&
        (!this.lastEmitBombTime || (game.time.elapsedSecondsSince(this.lastEmitBombTime)) > this.emitBombInterval)){
      this.lastEmitBombTime = Date.now();
      return types[types.length - 1];
    }

    return types[this.game.rnd.between(0,types.length - 2)];
  }
  createJuice(fruit){
    let game = this.game;
    let sprite = fruit.sprite,
        typeName = fruit.name;
    if(fruit.hasJuice){
      let recycleJuicesList = this.recycleJuices,
          x = sprite.x,
          y = sprite.y;
      // let juice = new Juice({game: game, x: sprite.x, y: sprite.y, name: typeName});

      if(!recycleJuicesList.length){
        //TODO: hit
        window.noHitJuice++;
        new Juice({
          game: game,
          x: x,
          y: y,
          name: juiceParticleBmd,
          onKill(){
            if(recycleJuicesList.length < cacheJuiceCount)
              recycleJuicesList.push(this);
            else{
              this.destroy();
            }
          }
        })
      }else{
        let juice = recycleJuicesList.pop();

        juice.restart(x, y);
        //TODO: hit
        window.hitJuiceCache++
      }
    }

  }
  destroy(){
    this.isStart = false;
    this.bomb = null;
    var obj;
    while(obj = this.objects.shift()){
      obj.remove();
    }
  }
  update(){
    if(this.isStart){
      var fruits = this.objects,
          len = fruits.length;
      while(len--){
        fruits[len].update();
      }
    }
  }
}

//TODO: test
window.nohit = window.hitCache = window.hitJuiceCache = window.noHitJuice = 0;
export default ObjectEmitter;
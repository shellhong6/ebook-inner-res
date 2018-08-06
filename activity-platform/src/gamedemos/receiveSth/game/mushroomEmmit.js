
import {PinkMushRoom, BlackMushRoom, YellowMushRoom} from './mushRooms.js';

let game;

function MushroomEmmit(gameContext){
  game = gameContext;
  this.count = 0;
  this.initCount = 10;
  this.totalCount = 10;
  this.createTime = 700; // 700ms创建1个
  this.reachTime = 0; //自从上次创建后是否经过createTime的时间
  this.mushRoomGroup = [];
  this.recycleMushRoomGroup = [];
  this.mushRoomType = [PinkMushRoom,YellowMushRoom,BlackMushRoom];

  this.init();
}

MushroomEmmit.prototype = {
  constructor: MushroomEmmit,
  isStop: false,
  init(){
    // var len = this.initCount;
    // while(len--){
    //   this.create(true);
    // }
  },
  create(immediately){
    var sprite,
        radType,
        activeType,
        beMushRoom,
        curGroup;

    this.reachTime += game.time.elapsed;
    if((this.count > this.totalCount || this.reachTime < this.createTime) && !immediately || this.isStop)
      return;

    this.reachTime = 0;
    this.count++;

    radType = game.rnd.integerInRange(0, 10);
    if(radType <= 7){
      activeType = 0;
    }else if(radType <= 9){
      activeType = 1;
    }else{
      activeType = 2;
    }

    curGroup = this.recycleMushRoomGroup[activeType];

    if(curGroup && curGroup.length){
      sprite = curGroup.pop();
    }else if(this.count < this.totalCount){
      beMushRoom = this.mushRoomType[activeType];
      sprite = new beMushRoom(game);
    }

    if(!sprite)
      return null;

    sprite.groupType = activeType;
    sprite.init();

    if(!this.mushRoomGroup[activeType])
      this.mushRoomGroup[activeType] = [];

    this.mushRoomGroup[activeType].push(sprite);
    sprite.id = this.mushRoomGroup[activeType].length - 1;
    sprite.sprite.instanceObj = sprite;

  },
  destroyMushRoom(room){
    var groupType = room.groupType,
        mushrooGroup = this.mushRoomGroup[groupType];

    if(!room.isAlive){
      return;
    }
    if(!this.recycleMushRoomGroup[groupType])
      this.recycleMushRoomGroup[groupType] = [];

    this.recycleMushRoomGroup[groupType].push(room);
    for(var i=room.id+1; i < mushrooGroup.length; i++){
      mushrooGroup[i].id -= 1;
    }
    this.mushRoomGroup[groupType].splice(room.id,1);
    this.count --;
    // room.sprite.visible = false;
    room.sprite.alpha = 0;
    room.sprite.body.velocity.setTo(0,0);
    room.sprite.y += 1000;
    room.isAlive = false;
    room.sprite.kill();
  },
  hideMushRoom(room){
    // var tween = game.add.tween(room.sprite).to({ alpha: 0}, 500, "Quart.easeOut");
    // tween.start();
    // tween.onComplete.add(()=>{
    //   this.destroyMushRoom(room);
    // });
    var count=4,
        self = this;

    if(room.isTweening || !room.isAlive)
      return;

    room.isTweening = true;

    var _inner = function(){
      room.sprite.alpha ^=  1;
      if(count > 0){
        setTimeout(_inner,100);
      }else{
        room.isTweening = false;
        self.destroyMushRoom(room);
      }
      count --;
    }
    setTimeout(_inner,20);
  },
  doHitAction(sprite){
    sprite.instanceObj.doHitAction();
    this.destroyMushRoom(sprite.instanceObj);
  },
  getAllMr(){
    var sprites,
        rooms = [],
        sprites = [];
    this.mushRoomGroup.forEach((group)=>{

      group.forEach((item)=>{
        rooms.push(item);
        sprites.push(item.sprite);
      });
    });

    return {room:rooms,sprites:sprites};
  },
  stop(){
    this.isStop = true;
  },
  start(){
    this.isStop = false;
  }
}

export default MushroomEmmit;

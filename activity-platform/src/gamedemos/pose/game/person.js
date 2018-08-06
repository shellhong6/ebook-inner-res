import BoneDatas from '../boneDatas.js';
import Utils from './utils.js';

import Constant from '../Constant.js';

let {ANGLE, DISTANCE, toAngle} = Utils;

export default class Person{
  constructor(game, sex = 0, faceTo=0, clothNo=0, hairNo = 0){
    this.game = game;
    this.headGroup = game.add.group();
    this.bodyGroup = game.add.group();
    this.manGroup = game.add.group();
    this.otherHair = game.add.sprite();
    this.cloakSprite = game.add.sprite();
    this.maskSprite = game.add.sprite();
    this.detailDrag = false;
    this.sex = sex;
    this.clothNo = clothNo;
    this.hairNo = hairNo;
    this.initFaceTo(faceTo);
    this.penddingDestroy = [];
  }
  initFaceTo(faceTo){
    this.faceTo = faceTo;
    this.scaleSign = faceTo == 2 ? -1 : 1;
  }
  drawOutLine(){
    let {worldPosition:{x, y}, width, height} = this.manGroup,
        game = this.game,
        endX = 120 + width,
        endY = this.getHeight() + 20;

    let graphics = Utils.drawOutLine(game, -10, this.hairSprite.worldPosition.y - y - 10, endX, endY, ()=>{
      this.destroy();
    });

    if(this.faceTo == 2)
      graphics.scale.x = -1;

    this.manGroup.addChild(graphics);

    this.outLine = graphics;
  }
  acitved(){
    if(this.isActived)
      return;

    this.isActived = true;
    if(!this.outLine)
      this.drawOutLine();
    this.outLine.visible = true;
  }
  unActived(){
    this.isActived = false;
    this.outLine.visible = false;
  }
  moveStart(activePointer){
    let {game, moveBoneName:name, manGroup:{scale}, faceTo} = this,
        scaleSign = this.scaleSign,
        isToTop = !faceTo,
        topSprite;

    this.acitved();

    this.lastPoint = {x: activePointer.x, y: activePointer.y};

    if(name == 'body' || name == 'head'){
      this.draging = true;
      return;
    }

    if(!this.scaleManTimer){
      this.originScale = {x: scale.x, y: scale.y};
      game.add.tween(scale).to({x: scaleSign*0.05+ scale.x, y: scale.y + 0.05}, 300, Phaser.Easing.Circular.Out, true);
    }
    else{
      clearTimeout(this.scaleManTimer);
      this.scaleManTimer = null;
    }

    let dragSprite = activePointer.targetObject.sprite;


    if(name == 'larm' || name == 'rarm'){
      topSprite = dragSprite.parent;

      if(!this.detailDrag)
        dragSprite = faceTo == 3 ? dragSprite.children[0] : dragSprite.children[1];
    }else if(name == 'lhand' || name == 'rhand'){
      topSprite = dragSprite.parent.parent;
    }


    if(name == 'lleg' || name == 'rleg'){
      // this.manGroup.bringToTop(dragSprite.parent);

      topSprite = dragSprite.parent;

      if(this.detailDrag)
        dragSprite = dragSprite.parent;
      else
        dragSprite = faceTo == 3 ? dragSprite.children[1] : dragSprite.children[0];

    }else if(name == 'lfoot' || name == 'rfoot'){
      topSprite = dragSprite.parent.parent;
    }

    if(isToTop)
      this.manGroup.bringToTop(topSprite);

    let dragSpriteGlobalPivot = this.getGlobalPivot(dragSprite);

    if(!this.detailDrag){
      let endDragSpriteWorldPos = dragSprite.children[0].worldPosition,

          dragSpriteParentGlobalPivot = this.getGlobalPivot(dragSprite.parent);

      this.dragStartAngle = ANGLE(endDragSpriteWorldPos, dragSpriteParentGlobalPivot);

      this.dragStartPos = {...endDragSpriteWorldPos};

      this.a = DISTANCE(dragSpriteGlobalPivot, endDragSpriteWorldPos);

      this.b = DISTANCE(dragSpriteParentGlobalPivot, dragSpriteGlobalPivot);

      this.parentAngle = dragSprite.parent.parent.rotation;

      dragSprite.parent.ponePivot = dragSpriteParentGlobalPivot;
    }

    //other control
    this.startAngle = ANGLE(activePointer, dragSpriteGlobalPivot);

    this.dragSprite = dragSprite;

    dragSprite.ponePivot = dragSpriteGlobalPivot;

  }
  moveFinish(){
    let game = this.game,
        scaleSign = this.scaleSign;

    if(this.dragSprite && !this.draging){
      this.dragSprite = null;

      this.scaleManTimer = setTimeout(()=>{
        game.add.tween(this.manGroup.scale).to(this.originScale, 300, Phaser.Easing.Circular.Out, true);
        this.scaleManTimer = null;
      }, 1000);
    }

    if(this.draging)
      this.draging = false;
  }
  move(){
    if(this.draging)
      return this.movePerson();

    if(this.dragSprite){
      if(!this.detailDrag)
        this.linkedBoneRotate();
      else{
        let nowAngle = ANGLE(this.game.input.activePointer, this.dragSprite.ponePivot);
        this.dragSprite.rotation += (nowAngle - this.startAngle)* this.scaleSign;
        this.startAngle = nowAngle;
      }

    }
  }
  movePerson(){
    let {x, y} = this.game.input.activePointer,
        manPos = this.manGroup.position;

    this.manGroup.position.set(x + manPos.x - this.lastPoint.x, y + manPos.y - this.lastPoint.y);
    this.lastPoint = {x, y};
  }
  linkedBoneRotate(){
    if(!this.dragSprite)
      return;

    let activePointer = this.game.input.activePointer,
        endPos = this.dragStartPos,
        parentPos = this.dragSprite.parent.ponePivot,
        curAngle = ANGLE(activePointer, parentPos),
        name = this.dragSprite.name,
        superParentSprite = this.dragSprite.parent.parent,
        parentSprite = this.dragSprite.parent,
        scaleSign = this.scaleSign,
        parentAngle, spriteAngle;

    this.c = DISTANCE({
      x: activePointer.x - this.lastPoint.x + endPos.x,
      y: activePointer.y - this.lastPoint.y + endPos.y
    }, parentPos);

    let aAngle = toAngle(Math.acos((this.b * this.b + this.c * this.c - this.a * this.a) / (2 * this.b * this.c))),
        bAngle = toAngle(Math.acos((this.c * this.c + this.a * this.a - this.b * this.b) / (2 * this.c * this.a)));

    if(this.c > this.a + this.b){
      aAngle = bAngle = 0;
    }

    superParentSprite.rotation = (curAngle - this.dragStartAngle + this.parentAngle * scaleSign) * scaleSign;

    if(isNaN(aAngle) || isNaN(bAngle))
      return;

    let rotateFlag = this.dragStartAngle <= Math.PI ? curAngle - this.dragStartAngle < Math.PI && curAngle - this.dragStartAngle > 0 : !(curAngle - this.dragStartAngle < 0 && curAngle - this.dragStartAngle > -Math.PI);

    if(rotateFlag){
      parentAngle = -aAngle;
      spriteAngle = aAngle + bAngle;
    }else{
      parentAngle = aAngle;
      spriteAngle = -aAngle - bAngle;
    }

    parentSprite.rotation = parentAngle * scaleSign;

    this.dragSprite.rotation = spriteAngle * scaleSign;
  }
  getGlobalPivot(sprite){
    return sprite.toGlobal(sprite.pivot);
  }
  putOnCloths(clothNo, hairNo){
    this.clothNo = clothNo;

    let game = this.game,
        spriteName = this.getClothSpriteName(),
        sexName = this.getSexName(),
        manCloth = BoneDatas[sexName + 'Cloth'][this.faceTo][clothNo],
        cloakItem = manCloth.cloak,
        mastSpriteItem = manCloth.mask || {},
        hairSheetName = spriteName,
        shoes;

    this.resetSprite(this.clothSprite,manCloth.clothPosition.x, manCloth.clothPosition.y, spriteName, manCloth.clothUrl);

    this.changeHair(typeof hairNo != 'undefined' ? hairNo : manCloth.hairNo);

    if(cloakItem){
      this.resetSprite(this.cloakSprite, cloakItem.x, cloakItem.y, spriteName, cloakItem.url);
    }else
      this.cloakSprite.kill();

    if(this.maskSprite){
      this.resetSprite(this.maskSprite, mastSpriteItem.x, mastSpriteItem.y, spriteName, mastSpriteItem.url);
    }

    if(shoes = manCloth.shoeUrls){
      shoes.forEach((shoe,idx)=>{
        let oldChild = this.shoesGroups[idx];

        this.resetSprite(oldChild, shoe.x, shoe.y, spriteName, shoe.url);
      });
    }

    this.takeBonesCloth(manCloth, spriteName);
  }
  takeBonesCloth(manCloth, spriteName){
    let partClothUrl = manCloth.part || [];
    manCloth.bones.forEach((bone, idx)=>{
      // if(!bone)
      //   return;

      let {bone1,bone2} = bone,
          boneParts = this.bonePartGroups[idx].children[0],
          pos1 = bone1 && bone1.position || {},
          pos2 = bone2 && bone2.position || {},
          cloths = partClothUrl[idx],
          sprite1, sprite2;

      sprite1 = this.getBone(idx, 0);
      sprite2 = this.getBone(idx, 1);

      // if(sprite1)
        this.resetSprite(sprite1, pos1.x, pos1.y, spriteName, cloths && cloths[0]);
      // if(sprite2)
        this.resetSprite(sprite2, pos2.x, pos2.y, spriteName, cloths && cloths[1]);
    });
  }
  changeHair(hairNo){
    let sexName = this.getSexName(),
        manHair = BoneDatas[sexName + 'Hair'][this.faceTo][hairNo],
        otherHair = manHair.other,
        hairSheetName = this.getHairSpriteName(hairNo),
        otherFaceHair = manHair['face' + this.faceTo];

    this.hairNo = hairNo;

    if(manHair.spriteName){
      hairSheetName = manHair.spriteName;
    }

    if(otherFaceHair){
      manHair = otherFaceHair;
    }

    this.resetSprite(this.hairSprite, manHair.x, manHair.y, hairSheetName, manHair.url);

    if(otherHair){
      this.resetSprite(this.otherHair, otherHair.x, otherHair.y, hairSheetName, otherHair.url);
    }else{
      this.resetSprite(this.otherHair);
    }
  }
  destroy(){
    this.manGroup.destroy();
    this.game = null;
    this.headGroup = null;
    this.bodyGroup = null;
    this.manGroup = null;
    this.otherHair = null;
    this.cloakSprite = null;
    clearTimeout(this.scaleManTimer);

    this.penddingDestroy.forEach((fn)=>fn());
    this.penddingDestroy = null;
  }
  listenerDestroy(fn){
    this.penddingDestroy.push(fn);
  }
  resetSprite(sprite, x, y, spriteName, key){
    sprite.reset(x, y);
    if(key){
      sprite.loadTexture(spriteName, key);
      sprite.revive();
    }else
      sprite.kill();
  }
  getBone(idx, id){
    let boneParts = this.bonePartGroups[idx].children[0],
        faceTo = this.faceTo;

    if(faceTo == 3){
      if(idx < 2)
        idx += 2;
      else
        idx -= 2;
    }

    if(idx < 2){
      if(!id) {
        return boneParts.children[0];
      } else if(id === 1) {
        return boneParts.children[1].children[1]
      }
    }else if(!id){
      return boneParts.children[2]
    }else if(id ===1){
      return boneParts.children[0].children[1];
    }
  }
  getClothSpriteName(clothNo){
    let cloth_no = typeof clothNo !== 'undefined'? clothNo : this.clothNo,
        sexName = this.getSexName();

    if(!cloth_no)
      return Constant.sprites[sexName.toUpperCase()][this.faceTo];

    return `${this.getFaceTo()}${sexName}cloth${cloth_no}`;
  }
  getHairSpriteName(hairNo){
    let hair_no = typeof hairNo !== 'undefined'? hairNo : this.hairNo,
        sexName = this.getSexName();

    if(!hair_no)
      return this.getClothSpriteName(0);

    return `${this.getFaceTo()}${sexName}hair`;
  }
  getSexName(){
    return this.sex ? 'girl' : 'man';
  }
  getFaceTo(){
    let name = '',
        faceTo = this.faceTo;
    if(faceTo == 1 || faceTo == 2)
      name = 'left';
    else if(faceTo == 3)
      name = 'back';
    return name;
  }
  getHeight(){
    let shoe = this.shoesGroups[0];

    return shoe.worldPosition.y + shoe.height - this.hairSprite.worldPosition.y;

  }
  toTop(){
    this.game.world.bringToTop(this.manGroup);
  }
  setPos(x,y){
    let {position, pivot} = this.manGroup;

    position.set(x + pivot.x, y + pivot.y);
  }
}
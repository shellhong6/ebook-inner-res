import eventEmitter from 'event-emitter';
import Person from './person.js';
import BoneDatas from '../boneDatas.js';
import Constant from '../Constant.js';

let personId = -1;

let _events = eventEmitter();

let personLen = 0;

BoneDatas.man[2] = BoneDatas.man[1];
BoneDatas.manCloth[2] = BoneDatas.manCloth[1];
BoneDatas.manHair[2] = BoneDatas.manHair[1];

BoneDatas.girl[2] = BoneDatas.girl[1];
BoneDatas.girlCloth[2] = BoneDatas.girlCloth[1];
BoneDatas.girlHair[2] = BoneDatas.girlHair[1];

class personManage{
  static create(game, sex, faceTo, clothNo = 0, manPos){
    let sexName = !sex ? 'man' : 'girl',
        manBones = BoneDatas[sexName][faceTo],
        manBodyCloth = BoneDatas[sexName + 'Cloth'][faceTo][clothNo],
        manHair = BoneDatas[sexName + 'Hair'][faceTo][manBodyCloth.hairNo],
        spritesName = Constant.sprites[sex? 'GIRL': 'MAN'][faceTo],
        bodyPosition = manBones.bodyPosition,
        globalX, globalY;

    this.personLen = ++personLen;

    if(manPos){
      globalX = manPos.x;
      globalY = manPos.y;
    }else{
      globalX = manBones.globalPosition.x + game.rnd.integerInRange(-50,50);
      globalY = manBones.globalPosition.y + game.rnd.integerInRange(-50,50);
    }

    personId += 1;

    let newObj = new Person(game, sex, faceTo, clothNo);

    newObj.listenerDestroy(()=>{
      this.personList = this.personList.map((item)=>{
        return newObj == item ? true : item;
      });
      newObj = null;

      this.personLen = --personLen;

      this.updatePersonList();
    });

    let {manGroup, headGroup, bodyGroup, otherHair, cloakSprite} = newObj;

    manGroup.position.set(globalX, globalY);
    headGroup.position = bodyPosition;
    bodyGroup.position = bodyPosition;

    manGroup.name = this.generateName('people');

    let bodySprite = bodyGroup.create(manBones.bodyImgPosition.x, manBones.bodyImgPosition.y, spritesName, manBones.bodyUrl);

    bodySprite.name = this.generateName('body');

    bodySprite.inputEnabled = true;

    let clothSprite = bodyGroup.create(manBodyCloth.clothPosition.x, manBodyCloth.clothPosition.y, spritesName, manBodyCloth.clothUrl);

    let headSprite = headGroup.create(manBones.headPosition.x, manBones.headPosition.y, spritesName, manBones.headUrl);

    let hairSprite = game.add.sprite();

    headSprite.addChild(hairSprite);

    // headSprite.name = this.generateName('head');

    // headSprite.inputEnabled = true;

    let {bonePartGroups, shoesGroups} = this.createBones(game, manBones, manBodyCloth, spritesName, newObj.faceTo);

    if(!faceTo)
      manGroup.addMultiple([otherHair, cloakSprite, bodyGroup, headGroup, bonePartGroups[2],bonePartGroups[3],newObj.maskSprite,bonePartGroups[0],bonePartGroups[1]]);
    else if(faceTo == 3 )
      manGroup.addMultiple([bonePartGroups[2],bonePartGroups[3],bonePartGroups[0],bonePartGroups[1], bodyGroup, headGroup, cloakSprite, otherHair])
    else if(faceTo == 1 || faceTo == 2){
      manGroup.addMultiple([bonePartGroups[0],bonePartGroups[2],otherHair, cloakSprite, bodyGroup, bonePartGroups[3], newObj.maskSprite, headGroup,bonePartGroups[1]]);
    }
    // }

    $.extend(newObj, {clothSprite, hairSprite, bonePartGroups, shoesGroups});

    if(!clothNo){
      newObj.resetSprite(hairSprite,manHair.x, manHair.y, spritesName, manHair.url);

      if(manHair.other)
        newObj.resetSprite(otherHair,manHair.other.x, manHair.other.y, spritesName, manHair.other.url);

      newObj.takeBonesCloth(manBodyCloth, spritesName);
    }
    else
      newObj.putOnCloths(clothNo);

    manGroup.pivot.set(manGroup.width/2, manGroup.heigth / 2);
    manGroup.position.set(manGroup.x + manGroup.pivot.x, manGroup.y + manGroup.pivot.y);

    newObj.drawOutLine();

    if(faceTo == 2)
      manGroup.scale.x = -1;

    this.personList.push(newObj);

    this.updatePersonList(newObj);

    return newObj;
  }

  static createBones(game, manBones, manBodyCloth, spritesName, faceTo){
    let bonePartGroups = [],
        shoes = manBodyCloth.shoeUrls || [],
        partbones = manBones.bones,
        shoesGroups = [],
        boneNames = BoneDatas.boneNames;

    manBones.part.forEach((bone, idx)=>{
      let partbone = partbones[idx],
          {position: {x:pos1x, y: pos1y}, pivot: pivot1, name: name1,rotation:rotation1} = partbone.bone1,

          {position: {x:pos2x, y: pos2y}, pivot: pivot2, name: name2,rotation:rotation2} = partbone.bone2;

      let gp = game.add.group(),
          bone1Group = game.add.group(),
          bone2Group = game.add.group();

      gp.position.set(pos1x + pivot1.x, pos1y + pivot1.y);
      gp.pivot.copyFrom(pivot1);

      let bone1 = gp.create(pivot1.x, pivot1.y);
      let bone2 = game.add.sprite(pos2x + pivot2.x, pos2y + pivot2.y, spritesName, bone[1]);

      bone1.pivot.copyFrom(pivot1);
      bone2.pivot.copyFrom(pivot2);

      let bone2End = game.add.graphics(partbone.end.position.x, partbone.end.position.y);

      bone2.addChild(bone2End);
      bone2.addChild(game.add.sprite());
      bone1.addChild(bone2);

      diyBonesByFaceTo(idx, bone1, bone2, bone)

      if(idx > 1){
        let shoeItem = shoes[idx - 2] || {};

        shoesGroups[idx - 2] = game.add.sprite(shoeItem.x, shoeItem.y, shoeItem.url ? spritesName : undefined, shoeItem.url);

        bone2.addChild(shoesGroups[idx - 2]);
      }

      gp.addChild(bone1);

      gp.rotation = rotation1;
      bone2.rotation = rotation2;

      bone1.name = this.generateName(boneNames[idx][0]);

      bone2.name = this.generateName(boneNames[idx][1]);
      // bone1.addChild(armCloth);

      bonePartGroups[idx] = gp;

      bone1.inputEnabled = true;
      bone2.inputEnabled = true;

    });

    return {bonePartGroups, shoesGroups}

    function diyBonesByFaceTo(idx, bone1, bone2, bone) {
      if(faceTo == 0 || faceTo == 1 || faceTo == 2){
        if(idx < 2){
          bone1.addChildAt(game.add.sprite(), 0);

          bone1.loadTexture(spritesName, bone[0]);

          if(faceTo == 2 && bone[2])
            bone2.frameName = bone[2];
        }else{
          bone1.addChild(game.add.sprite(0, 0, spritesName, bone[0]));
          bone1.addChild(game.add.sprite());//cloth
        }
      }else if(faceTo == 3){
        if(idx < 2){
          bone1.addChild(game.add.sprite(0, 0, spritesName, bone[0]));
          bone1.addChild(game.add.sprite());
        }else{
          bone1.addChildAt(game.add.sprite(), 0);

          bone1.loadTexture(spritesName, bone[0]);
        }
      }
    }
  }
  static listenerPersonList(fn){
    _events.on('updatePersonList', fn);
  }
  static updatePersonList(person){
    _events.emit('updatePersonList', this.personLen, person);
  }
  static generateName(name){
    return personId + '-' + name;
  }
  static getPerson(name){
    let arr = name.split('-');

    let person = personManage.personList[arr[0]];

    if(person)
      person.moveBoneName = arr[1];

    return person;
  }
}
personManage.personList = [];

export default personManage;
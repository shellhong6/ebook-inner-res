import Constant from './Constant.js';
import BoneDatas from './boneDatas.js';
import personManage from './game/personManage';
import Utils from './game/utils.js';
import {debounce} from '../../assets/lib/ba-throttle-debounce.js';
import eventEmitter from 'event-emitter';

let randomInt = ()=>{
  return Game.game.rnd.integerInRange(-100,100);
};

let Game = eventEmitter({
  resImg: Constant.baseImgContext,
  createGame(){
    let winW = document.body.clientWidth,
        ratio = Constant.worldWidth / winW;

    this.game = new Phaser.Game(Constant.worldWidth, Constant.worldHeight, Phaser.CANVAS, 'game-canvas', {
      preload: this.preload.bind(this),
      create: this.create.bind(this),
      update: this.update.bind(this),
      render: this.render.bind(this)
    });

    this.ratio = ratio;

    this.detailDrag = false;

    this._listeners = [];

    this.saving = false;

    return this;
  },
  preload(){
    let game = this.game,
        resImg = this.resImg,
        winW = document.body.clientWidth,
        ratio =  game.world.width / winW;

    game.stage.backgroundColor = '#fff';


    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.load.image('scene4', `${resImg}/scenes/4.png`);
    game.load.image('close', `${resImg}/close.png`);
    game.load.image('rotate', `${resImg}/rotate.png`);
    game.load.atlas(Constant.sprites.MAN[0], `${resImg}/man.png`, `${resImg}/man.json`);
    game.load.atlas(Constant.sprites.GIRL[0], `${resImg}/girl.png`, `${resImg}/girl.json`);
  },
  create(context) {
    let game = this.game;

    this.gameGroup = game.add.group();

    this.gameBg = game.add.sprite(0,0, 'scene4');

    this.addChild(this.gameBg);

    this.bindEvents();

    this.emit('create');

    this.isMount = true;

    if(process.env.NODE_ENV === 'develop'){
      //TODO: debug
      let debugGroup = game.add.group();
      let graphics = game.add.graphics(0, 0);

      graphics.beginFill(0xFFFF00, 1);
      graphics.drawCircle(0,0, 20);
      debugGroup.addChild(graphics);

      graphics = game.add.graphics(0, 0);
      graphics.beginFill(0x00FF00, 1);
      graphics.drawCircle(0, 0, 20);
      debugGroup.addChild(graphics);

      graphics = game.add.graphics(0, 0);
      graphics.beginFill(0x000FFF, 1);
      graphics.drawCircle(0,0, 20);
      debugGroup.addChild(graphics);

      graphics = game.add.graphics(0, 0);
      graphics.beginFill(0xFF00FF, 1);
      graphics.drawCircle(0,0, 25);
      debugGroup.addChild(graphics);

      window.debugGroup=debugGroup;
    }

    if(process.env.NODE_ENV !== 'production')
      console.log('create game');
  },
  addChild(sprite){
    this.gameGroup && this.gameGroup.addChild(sprite);
  },
  getSex(){
    return this.currentPerson && this.currentPerson.sex;
  },
  createPeople(sex, faceTo, clothNo, position){
    let person = personManage.create(this.game, sex, faceTo, clothNo, position);

    this.addChild(person.manGroup);

    if(this.currentPerson)
      this.currentPerson.unActived();

    this.currentPerson = person;
  },
  bindEvents(){
    let game = this.game;

    game.load.onLoadComplete.add(this.fileLoadComplete, this);

    // game.input.touch.touchMoveCallback = (evt)=>{

    //   this.currentPerson && this.currentPerson.move();
    // };

    game.input.moveCallbacks.push({
      callback: (evt)=>{
        this.currentPerson && this.currentPerson.move();
      }
    })

    game.input.onTap.add(debounce(200,(pointer, doubleTap)=>{
      let currentPerson = this.currentPerson;

      if(doubleTap && currentPerson && !currentPerson.dragSprite)
        currentPerson.detailDrag ^= 1;
      })
    );

    personManage.listenerPersonList((personLen, person)=>{
      let sex = personLen ? person && person.sex : 2,
          topPerson;

      if(sex == null){
        let childIdx = this.gameGroup.children.length;
        while(--childIdx >=0){
          let tempChild = this.gameGroup.getChildAt(childIdx);
          if(tempChild instanceof Phaser.Group){
            topPerson = tempChild;
            break;
          }
        }

        if(topPerson){
          this.currentPerson = personManage.getPerson(topPerson.name);
          sex = this.currentPerson.sex;
        }

      }
      $('.show-bar section[data-showsex]').attr('data-showsex', sex);
    });
    // this.resizeGame(game);

    $(window).on('resize', ()=>{
      this.resizeGame(game);
    })
  },
  resizeGame(game){
    if(game.height != window.innerHeight){
      if(process.env.NODE_ENV === 'develop'){
        console.log('initial size: ', game.height, window.innerHeight)
      }
      game.scale.setGameSize(game.width, window.innerHeight * this.ratio);

      if(this.saving){
        requestAnimationFrame(()=>{
          // this.copyCanvas();
          $('.temp-imgs').css('height', game.canvas.style.height);
        })

      }
    }
  },
  update(){
    // const leftHand = this.bonePartGroups[0];

    const activePointer = this.game.input.activePointer;
    const activedSprite = activePointer.targetObject && activePointer.targetObject.sprite;
    const name = activedSprite ? activedSprite.name : '',
          currentPerson = this.currentPerson;

    if(this.saving)
      return;

    if(activePointer.isDown && this.isRotate){

       // let scaleFlag = Utils.DISTANCE(activePointer, this.rotatePos) > this.lastDistance ? 1 : -1;

       let scaleData = this.lastScale.y + /*scaleFlag *Math.abs*/(Utils.DISTANCE(activePointer, this.rotatePos)-this.lastDistance)*2 / this.diagonal,
           scaleDataX;

       if(scaleData < 0.2){
         scaleData = 0.2;
       }

       scaleDataX = scaleData;

       if(this.lastScale.x < 0)
        scaleDataX *= -1;

       this.rotateSprite.scale.set(scaleDataX, scaleData);

       this.rotateSprite.rotation = Utils.ANGLE(activePointer, this.rotatePos) - this.lastAngle + this.lastPersonRotate;

       return;
    }

    if(activePointer.isDown){

      if(!name){
        this.hidePropOutline();
        return currentPerson && !currentPerson.dragSprite && currentPerson.unActived();
      }

      if(name == 'rotate' && (!currentPerson || !currentPerson.dragSprite)){
        this.rotateSprite = activedSprite.parent.parent;
        this.rotatePos = {x: this.rotateSprite.x, y: this.rotateSprite.y};
        this.lastAngle = Utils.ANGLE(activePointer, this.rotatePos);
        this.lastPersonRotate = this.rotateSprite.rotation;
        this.lastScale = {x:this.rotateSprite.scale.x, y:this.rotateSprite.scale.y};
        this.diagonal = Math.sqrt(Math.pow(this.rotateSprite.width,2), Math.pow(this.rotateSprite.height,2));
        this.lastDistance = Utils.DISTANCE(activePointer, this.rotatePos);

        return this.isRotate = true;
      }

      if(name !== 'prop')
        this.hidePropOutline();

      if(!currentPerson || currentPerson.dragSprite || currentPerson.draging)
        return;

      let person = personManage.getPerson(name);

      if(!person)
        return;

      this.toTop(person.manGroup);

      person.moveStart(activePointer);

      if(person != currentPerson){
        currentPerson.unActived();
        this.currentPerson = person;
        $('.show-bar section[data-showsex]').attr('data-showsex', person.sex);
      }

    }else if(activePointer.isUp/*&& activePointer.isMouse*/){
      currentPerson && currentPerson.moveFinish();
      this.isRotate = false;
    }
  },
  render(){
    if(process.env.NODE_ENV === 'develop'){
      let game = this.game;

    // var name;

    // try{
    //   name = (game.input.activePointer.targetObject) ? game.input.activePointer.targetObject.sprite.name : 'none';
    // }catch(e){

    // }

    // game.debug.text("Pointer Target: " + name, 32, 32);
    // game.debug.text("point movement: " + game.input.activePointer.movementX + " " + game.input.activePointer.movementY, 32, 60);

    // window.bonesGroup.forEach(item=>{
    //   game.debug.geom( new Phaser.Circle( item.children[0].worldPosition.x, item.children[0].worldPosition.y, 20 ), '#fff' ) ;
    //   game.debug.geom( new Phaser.Circle( item.children[0].children[0].worldPosition.x, item.children[0].children[0].worldPosition.y, 20 ), '#f00' ) ;
    // })

    // game.debug.inputInfo(game.input.activePointer.x, game.input.activePointer.y, 'red')
    // let sprite = this.currentPerson.dragSprite;
      if(this.currentPerson && this.currentPerson.manGroup){


        debugGroup.children[1].position = this.currentPerson.getGlobalPivot(this.currentPerson.manGroup);

        debugGroup.children[2].position = this.currentPerson.manGroup.worldPosition;

        debugGroup.children[3].position = this.currentPerson.manGroup.position;
      }
      // debugGroup.children[0].position = this.manGroup.worldPosition;
    }
  },
  destroy(){
    this.game && this.game.destroy();
  },
  toTop(sprite){
    this.gameGroup.bringToTop(sprite);
  },
  adjustFaceTo(faceTo){
    let {sex, clothNo, hairNo} = this.currentPerson,
        game = this.game,
        resImg = this.resImg,
        name = Constant.sprites[this.currentPerson.getSexName().toUpperCase()][faceTo];

    if(faceTo == this.currentPerson.faceTo)
      return;

    this.currentPerson.faceTo = faceTo;

    this.addFileLoadListener(()=>{
      let {position, pivot, scale, rotation} = this.currentPerson.manGroup;

      this.currentPerson.destroy();
      this.createPeople(sex, faceTo, clothNo, {x: position.x - pivot.x, y: position.y - pivot.y});
      this.currentPerson.changeHair(hairNo);

      // let newManGroup = this.currentPerson.manGroup;

      // newManGroup.scale.set(newManGroup.scale.x * scale.x, newManGroup.scale.y * scale.y);
    });

    this.loadAtlas(name, `${resImg}/${name}`);

    // if(!clothNo)
    //   return game.load.start();

    this.loadImage(clothNo, hairNo);
  },
  changeCloth(clothNo){
    this.addFileLoadListener(()=>{

      this.currentPerson.putOnCloths(clothNo, this.currentPerson.hairNo);
    });

    this.loadImage(clothNo);
  },
  changeHair(hairNo){
    let name = this.currentPerson.getHairSpriteName(hairNo),
        game = this.game,
        resImg = this.resImg;

    if(!hairNo)
      return this.currentPerson.changeHair(hairNo);

    this.addFileLoadListener(()=>{
      this.currentPerson.changeHair(hairNo);
    });

    this.loadAtlas(name, `${resImg}/${name}`);

    game.load.start();

  },
  changeScene(no){
    var game = this.game,
        resImg = this.resImg + '/scenes',
        name = `scene${no}`;

    this.addFileLoadListener(()=>{
      this.gameBg.loadTexture(name);
    });

    game.load.image(name, `${resImg}/${no}.png`);

    game.load.start();
  },
  hidePropOutline(){
    if(this.prop && this.prop.exists)
      this.prop.children[0].visible = false;
  },
  putProp(no){
    var game = this.game,
        resImg = this.resImg + '/props',
        name = `prop${no}`;

    let _addProp = ()=>{

      let prop = game.add.sprite(game.world.centerX + randomInt(), game.world.centerY + randomInt(), name),
          propW = prop.width,
          propH = prop.height,
          propOutline = Utils.drawOutLine(game, -(propW /2 + 10), -(propH /2 + 10), propW + 10, propH + 10);

      prop.anchor.set(0.5);
      prop.inputEnabled = true;
      prop.input.enableDrag();
      prop.name = 'prop';
      prop.addChild(propOutline);

      this.addChild(prop);

      this.hidePropOutline();

      prop.events.onInputDown.add(()=>{
        if(this.prop != prop){
          this.hidePropOutline();
          this.prop = prop;
        }
        this.gameGroup.bringToTop(prop);
        prop.children[0].visible = true;
        this.currentPerson && this.currentPerson.unActived();
      });

      this.prop = prop;
    }

    if(game.cache.checkImageKey(name))
      return _addProp();

    this.addFileLoadListener(()=>{
      _addProp();
    });

    game.load.image(name, `${resImg}/${no}.png`);

    game.load.start();

  },
  doSave(isSave){
    let game = this.game;

    this.addFileLoadListener(()=>{
      let gameGroup = this.gameGroup,
          scaleFactor = 0.858,
          viewWidth = game.width * scaleFactor,
          viewX = (game.width - viewWidth) >> 1;

      if(process.env.NODE_ENV !== 'production')
        console.log('afterLoad shareing: ', isSave)

      gameGroup.pivot.set(540, 0);

      gameGroup.position.set(540, 0);

      gameGroup.scale.set(scaleFactor);

      let mask = game.add.graphics(0, 0);

      mask.beginFill(0xffffff);

      mask.drawRect(viewX, 0, viewWidth, game.height);

      this.gameGroup.mask = mask;

      this.currentPerson && this.currentPerson.unActived();

      this.hidePropOutline();

      this.saving = true;

      // this.game.input.touch.touchMoveCallback = false;
      game.input.moveCallbacks.pop();

      if(isSave)
        this.addShareBanner(isSave);
      else{
        setTimeout(()=>{

          // this.copyCanvas();
          this.generateImg('temp-imgs');

          this.addShareBanner();

          if(process.env.NODE_ENV !== 'production')
            console.log('appstore share');
        }, 500);

      }

    });

    if(!game.cache.checkImageKey('sharetop'))
      game.load.image('sharetop', `${this.resImg}/sharetop.png`);

    if(!game.cache.checkImageKey('sharebt'))
      game.load.image('sharebt', `${this.resImg}/sharebt1.png`);

    game.load.start();
  },
  addShareBanner(isAnimate){
    let game = this.game,
        rectHeight = 120,
        rectY = game.height - rectHeight,
        bottomRect = game.add.graphics(0, rectY),
        shareBt = game.add.sprite(0, 0, 'sharebt'),
        pos = isAnimate ? Phaser.LEFT_CENTER : Phaser.CENTER;

    let shareTopSprite = game.add.sprite(0, 0, 'sharetop');

    bottomRect.beginFill(0xFFFFFF);
    bottomRect.drawRect(0, 0, game.width, rectHeight);

    shareBt.anchor.set(0.5);

    shareBt.alignIn(new Phaser.Rectangle(0, rectY, game.width, rectHeight), pos, isAnimate ? -75 : 0);

    this.gameGroup.position.set(540, shareTopSprite.height);

    if(isAnimate){
      game.add.tween(shareBt)
              .to( { x: game.world.centerX }, 1500, Phaser.Easing.Bounce.Out, true, 1800)
              .onComplete.add(function(){
                  this.generateImg();
               }, this);
    }else{
      requestAnimationFrame(()=>{
        this.generateImg();
        // $('#game-canvas').hide();
      });
    }

    if(process.env.NODE_ENV !== 'production')
        console.log('addsharebanner')
  },
  coverToImg(){
    return $('#game-canvas canvas')[0].toDataURL("image/jpeg");
  },
  generateImg(clz){
    let savedImg = this.coverToImg();

    clz = clz || 'saved_img';

    $('#game-canvas').parent().append(`<div class="${clz}"><img src=${savedImg}></div>`);
  },
  loadAtlas(name, url){
    if(!this.game.cache.checkImageKey(name)){
      this.game.load.atlas(name, `${url}.png`, `${url}.json`);
    }
  },
  loadImage(clothNo, hairNo){

    var game = this.game,
        resImg = this.resImg,
        hairNo = hairNo == null ? clothNo : hairNo,
        name = this.currentPerson.getClothSpriteName(clothNo),
        hairName = this.currentPerson.getHairSpriteName(hairNo);

    this.loadAtlas(hairName, `${resImg}/${hairName}`);

    this.loadAtlas(name, `${resImg}/${name}`);

    game.load.start();
  },
  fileLoadComplete(progress, cacheKey, success, totalLoaded, totalFiles){
    let fn;

    while(fn = this._listeners.pop()){
      fn();
    }
  },
  addFileLoadListener(fn){
    this._listeners.push(fn);
  }
});

if(process.env.NODE_ENV !== 'production'){
  //TODO: test
  window.Game = Game;
}
export default Game;
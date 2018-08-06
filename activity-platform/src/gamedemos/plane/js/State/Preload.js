/**
 * Created by JunSong on 2017/5/4.
 */
import State from './State.js';

export default class Preload extends State{
    constructor(game){
        super(game);
        this.game = game;
        this.name = 'Preload';
    }
    preload(){
        let game = this.game;
        let resImg = 'static/imgs/plane';

        let winW = document.body.clientWidth,
          ratio = winW / game.world.width;

          game.scale.maxWidth = winW;
          game.scale.maxHeight = game.world.height * ratio;
          game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //var preloadSprite = game.add.sprite(game.width/2, game.height/2, 'loading');
        //preloadSprite.anchor.setTo(0.5);
        //game.load.setPreloadSprite(preloadSprite);
        let loading = game.add.sprite(game.width/2, game.height/2, 'loading');
        loading.anchor.setTo(0.5);
        loading.animations.add('fly');
        loading.animations.play('fly', 10, true);

        game.load.image('background', resImg+'/tileSprite.webp');
        game.load.image('header', resImg+'/header.webp');
        game.load.image('myBullet', resImg+'/myBullet.webp');
        game.load.image('enemyBullet', resImg+'/enemyBullet.webp');
        game.load.image('greenPlane', resImg+'/greenPlane.webp');
        game.load.image('redPlane', resImg+'/redPlane.webp');
        game.load.image('yellowPlane', resImg+'/yellowPlane.webp');
        game.load.image('whitePlane', resImg+'/whitePlane.webp');
        game.load.spritesheet('startbutton', resImg+'/startButton.webp', 483, 155, 2);
        game.load.atlasJSONHash('player', resImg+'/player.webp', resImg+'/player.json', true);
        game.load.atlasJSONHash('btnText', resImg+'/btnText.webp', resImg+'/btnText.json', true);
        game.load.atlasJSONHash('sprite', resImg+'/sprite.webp', resImg+'/sprite.json', true);
        game.load.atlasJSONHash('countdown', resImg+'/countdown.webp', resImg+'/countdown.json', true);
        game.load.atlasJSONHash('numbers', resImg+'/numbers.webp', resImg+'/numbers.json', true);
        game.load.atlasJSONHash('explode', resImg+'/explode.webp', resImg+'/explode.json', true);
    }
    create(){
        this.game.state.start('main');
    }
}
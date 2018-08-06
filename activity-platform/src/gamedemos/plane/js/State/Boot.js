/**
 * Created by JunSong on 2017/5/4.
 */
import State from './State.js';

export default class Boot extends State{
    constructor(game){
        super(game);
        this.game = game;
        this.name = 'Boot';
    }
    preload(){
        let game = this.game;
        var resImg = 'src/gamedemos/plane/imgs';
        if(typeof(GAME) !== "undefined") {
            this.load.baseURL = GAME + "/";
        }
        if(!game.device.desktop){
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.forcePortrait = true;
            this.scale.refresh();
        }
        game.load.atlasJSONHash('loading', resImg+'/loading.webp', resImg+'/loading.json', true);
        //game.load.image('loading', 'imgs/loading.gif');
    }
    create(){
        this.game.state.start('preload');
    }
}
var State = require('./State.js');

class Boot extends State{
    constructor(game){
        super(game);
        this.game = game;
        this.name = 'Boot';
    }
    preload(){
        let game = this.game;
        if(typeof(GAME) !== "undefined") {
            this.load.baseURL = GAME + "/";
        }
        if(!game.device.desktop){
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.forcePortrait = true;
            this.scale.refresh();
        }
    }
    create(){
        this.game.state.start('preload');
    }
}

module.exports = Boot;
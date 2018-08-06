var State = require('./State.js');

class Preload extends State{
    constructor(game,preloadDialog){
        super(game);
        this.game = game;
        this.preloadDialog = preloadDialog;
        this.name = 'Preload';
    }
    preload(){
        let self = this;
        let game = self.game;

        game.load.onFileComplete.add(function(){
            console.log(arguments);
            if(window.progressTimer){
                clearInterval(window.progressTimer);
                window.progressTimer = null;
            }
            setProgress(arguments[0]);
        }, self);

        game.load.image('bg','./imgs/gameBg.webp');
        game.load.image('tilesprite','./imgs/tilesprite.png');
        game.load.image('telescopicRod','./imgs/telescopicRod.png');
        game.load.image('prizes','./imgs/prizes.png');
        game.load.image('prizesBg','./imgs/prizesBg.png');
        game.load.image('timesPanel','./imgs/timesPanel.png');
        game.load.atlasJSONHash('sprite', 'imgs/sprite.webp', 'imgs/sprite.json', true);
        game.load.atlasJSONHash('awards', 'imgs/awards.webp', 'imgs/awards.json', true);
        game.load.atlasJSONHash('button', 'imgs/button.webp', 'imgs/button.json', true);
        game.load.atlasJSONHash('prizesFg', 'imgs/prizesFg.webp', 'imgs/prizesFg.json', true);
    }
    create(){
        this.preloadDialog.hideLoading();
        this.game.state.start('main');
    }
}

module.exports = Preload;
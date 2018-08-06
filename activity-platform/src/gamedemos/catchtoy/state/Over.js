var State = require('./State.js');

class Over extends State{
    constructor(game){
        super(game);
        let self = this;
        self.game = game;
        self.name = 'Over';
    }
    create(){
        console.log('created Over state');
    }
}

module.exports = Over;
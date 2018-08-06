class State{
    constructor(game){
        this.game = game;
        this.name = 'State super class';
    }
    preload(){

    }
    create(){

    }
    update(){

    }
    toString(){
        return this.name;
    }
}

module.exports = State;
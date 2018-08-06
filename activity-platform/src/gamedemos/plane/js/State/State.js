/**
 * Created by JunSong on 2017/5/4.
 * 父类
 */
export default class State{
    constructor(game){
        this.game = game;
        this.name = 'State super class';
    }
    preload(){

    }
    create(){

    }
    toString(){
        return this.name;
    }
}
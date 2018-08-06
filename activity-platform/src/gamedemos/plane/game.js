import States from './js/States.js';
import $ from './js/zepto.min.js';
import Event from './js/Events.js';
import Constant from './js/Constant.js';
var WinWidth = $('body').width();

var noop = function(){};

var game;
var entry = {
    init(){
        this.initGame({
            isAppInstalledFn:noop //实际根据业务传入检测应用是否已安装的函数
        });
        this.bindEvent();
    },
    bindEvent(){
        let self = this;
        Event.on('replayBtnClick',function([data]){
            console.log('replayBtnClick',data);
            switch (data.action){
                case 'openApp':
                    // var result = Native.turnToAppPage();  //根据业务逻辑自己写
                    // stat.doFlow({action:'open_web',open_result:result});
                    // console.log('result:'+result);
                    break;
                case 'restartGame':  //开始新一轮游戏
                    break;
                case 'downloading':  //下载中
                    break;
            }
        });
        Event.on('roundStart',([data])=>{
            console.log('round start', data)
            // data.roundCount 可区分第一轮/第二轮
            // stat.doFlow({action:'game_times',g_times:data.roundCount});
            // stat.doFlow({action:'start_game'});
        });
        Event.on('overGame',()=>{
            console.log('game over')
        });
        Event.on('startGame',()=>{
            console.log('start game')
        });
        Event.on('playerDead',()=>{
            console.log('player dead!')
        })
    },
    initGame(data){
        let self = this;
        if(typeof window.Phaser != 'undefined'){
            var config = {
                width:1080,
                height:1920,
                renderer: Phaser.AUTO,
                canvasStyle:'width:'+WinWidth+'px;',
                transparent:true,
                parent:'game-canvas'
            };
            game = new Phaser.Game(config);
            game.state.add('boot', new States.Boot(game));
            game.state.add('preload', new States.Preload(game));
            game.state.add('main', new States.Main(game));
            game.state.add('start', new States.Start(game));
            game.state.add('over', new States.Over(game));

            game.opts = data;

            game.state.start('boot');

            window.game = game;
        }else{
            setTimeout(()=>{
                self.initGame(data);
            },200);
        }
    },
    start(){
        game.state.start('boot');
    },
    destroy(){
        game.state.states.start.destroy();
        game && game.destroy();
        Event.removeAll();
        $(window).off('resize', resizeFooter);
    }
}

function resizeFooter(){
    var winH = $(window).height();
    var footerHeight = winH*186/1920;
    $('.footer').css('height',footerHeight);
}

$(function(){
    resizeFooter();

    $(window).on('resize',resizeFooter);
});

export default entry;
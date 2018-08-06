var State = require('./State.js');

class Main extends State{
    constructor(game,callback){
        super(game);
        let self = this;
        self.game = game;
        self.name = 'Main';
        self.rodDownTimer = null;
        self.rodUpTimer = null;
        self.catching = false;
        self.addPrizesTimer = null;
        self.prizesInternalAdding = false;
        self.changePrizesTimer = null;
        self.callback = callback;

        self.gameTips = {
            beforeInstall:'点击安装苏宁易购APP，获取抓奖机会',  //未安装
            beforeActive:'打开苏宁易购返回活动，机会+'+game_total_count+'次哦！',   //已安装 未激活
            afterInstall:'打开苏宁易购返回活动，机会+'+game_total_count+'次哦！',   //在本活动安装完成，未激活
            activeTips4Alert:'打开苏宁易购返回活动，机会+'+game_total_count+'次哦！',
            thanks:'今天大奖已经抓完，明天再来！',
            thanks4lastDay:'娃娃机已经被掏空啦，请期待下次活动哦╰(￣▽￣)╭！',
            flying:'看准下爪，看好你哦~',
            onefree:'试着抓一下，大奖在召唤你哦~',
            installing:'正在安装苏宁易购，马上就能抓大奖啦~',
            drawing:'请耐心等待哦~'
        }
    }
    create(){
        let self = this;
        let game = self.game;

        self.setFaceBtn();
        // 背景
        var bg = game.add.sprite(0,0, 'bg');

        self.addTimesPanel();
        self.hideTimesPanel();
        self.addGetMusic();
        self.addPrizes(true);
        self.addMask();
        self.addRoker();
        self.addButton();

        self.addGameTips(self.gameTips.beforeInstall);

        self.callback && self.callback();
        // game.debug.spriteBounds(self.getMusic);
        // self.rodDown();
        self.sway();
    }
    addGameTips(txt){
        let self = this;
        let game = self.game;
        if(self.gameTipsSp){
            self.gameTipsSp.setText(txt)
        }else{
            self.gameTipsSp = game.add.text(0,862,txt||'',{
                font:'30px 微软雅黑', fill:'#f5c27e', align:'center'
            });
        }
        self.gameTipsSp.x = (game.width-self.gameTipsSp.width)/2;
    }
    setFaceBtn(){
        let self = this;
        let btn = $('#button');
        let winWidth = $('body').width();
        let ratio = winWidth / 1080;
        btn.css({width:427*ratio+'px',height:94*ratio+'px'});
    }
    addTimesPanel(count){
        let self = this;
        let game = self.game;
        self.timesPanel = game.add.sprite(156,146,'timesPanel');
        self.timesPanelTxt = game.add.text(258,186,count?('X '+count):'X 0',{
            font:'30px 微软雅黑', fill:'#ffffff', align:'center'
        });
    }
    updateTimesPanel(count){
        let self = this;
        let game = self.game;
        self.timesPanelTxt.setText('X '+count);
    }
    showTimesPanel(count){
        let self = this;
        let game = self.game;
        self.updateTimesPanel(count);
        self.timesPanel.visible = true;
        self.timesPanelTxt.visible = true;
    }
    hideTimesPanel(){
        let self = this;
        let game = self.game;
        self.timesPanel.visible = false;
        self.timesPanelTxt.visible = false;
    }
    addButton(){
        let self = this;
        let game = self.game;
        //按钮常态
        self.button = game.add.sprite(0,0,'button','button.png');
        self.button.x = 428;
        self.button.y = 664;
        //按钮激活态
        self.buttonDownSp = game.add.sprite(0,0,'button','button_down.png');
        self.buttonDownSp.x = self.button.x;
        self.buttonDownSp.y = self.button.y + (self.button.height - self.buttonDownSp.height);
        self.buttonDownSp.visible = false;
        //按钮文案
        self.setButtonText('preLottery.png');
    }
    setButtonText(frameName){
        let self = this;
        let game = self.game;
        if(self.buttonText){
            self.buttonText.frameName = frameName;
        }else{
            self.buttonText = game.add.sprite(0,0,'button',frameName);
        }
        self.buttonText.x = self.button.x + (self.button.width-self.buttonText.width)/2;
        self.buttonText.y = self.button.y + (self.button.height-18-self.buttonText.height)/2;
    }
    buttonDown(){
        let self = this;
        console.log('down')
        self.button.visible = false;
        self.buttonDownSp.visible = true;
        self.buttonText.y += 9;
    }
    buttonUp(lottery){
        let self = this;
        console.log('up');
        self.button.visible = true;
        self.buttonDownSp.visible = false;
        self.buttonText.y -= 9;

        if(lottery) self.catchPrize();
    }
    addRoker(){
        let self = this;
        let game = self.game;
        self.rockerBed = game.add.sprite(157,696,'sprite','rockerBed.png');
        self.rocker = game.add.sprite(157,590,'sprite','rocker.png');
        self.rocker.x = self.rockerBed.x + (self.rockerBed.width - self.rocker.width)/2;
    }
    addMask(){
        let self = this;
        let game = self.game;
        self.mask = game.add.sprite(0,0,'sprite','light.png');
        self.mask.x = (game.width-self.mask.width)/2;
        self.mask.y = 28;
    }
    addPrizes(immediately,fromDownloading,skip){
        let self = this;
        let game = self.game;
        if(self.addPrizesTimer || self.prizesInternalAdding || self.prizesConfirm) return;
        if(fromDownloading) self.prizesInternalAdding = true;
        self.prizes = new Array(14);
        self.prizesGroup = game.add.sprite(0,0,'');
        let showIndex = [
            {name:'14',y:424,x:595},{name:'12',x:482,y:396},{name:'1',x:579,y:371},{name:'9',x:458,y:400},
            {name:'11',x:194,y:416},{name:'10',y:449,x:148},{name:'8',x:740,y:406},{name:'7',x:634,y:454},{name:'13',x:673,y:437},
            {name:'6',y:430,x:740},{name:'5',x:540,y:534},{name:'4',x:834,y:478},{name:'3',x:412,y:448},
            {name:'2',y:460,x:300}
            ], time = 600;

        if(immediately) time = 10;

        self.addPrizesTimer = setInterval(()=>{
            if(showIndex.length){
                let item = showIndex.shift();
                self.prizes[item.name-1] = game.add.sprite(item.x, 112, 'prizesFg', item.name+'.png');
                self.prizes[item.name-1].alpha = 0;
                self.prizesGroup.addChild(self.prizes[item.name-1]);

                game.add.tween(self.prizes[item.name-1]).to({y:item.y, alpha:1}, time, Phaser.Easing.Linear.None,true);
            }else{
                self.prizesBg = game.add.sprite(0,0,'prizesBg')
                self.prizesBg.x = (game.width - self.prizesBg.width) / 2;
                self.prizesBg.y = 358;
                game.world.setChildIndex(self.prizesBg,1);
                clearInterval(self.addPrizesTimer);
                self.addPrizesTimer = null;
                if(fromDownloading){
                    setTimeout(()=>{
                        if(!self.prizesConfirm) self.clearPrizes();
                        self.prizesInternalAdding = false;
                    },500)
                }
            }
        },time);
    }
    clearPrizes(){
        let self = this;
        let game = self.game;
        self.prizesBg && self.prizesBg.kill();
        for(let i=0; i<self.prizes.length; i++){
            self.prizes[i] && self.prizes[i].kill();
        }
        self.prizesGroup && self.prizesGroup.kill();
    }
    changePrizes(){
        let self = this;
        let game = self.game;
        if(!self.prizesConfirm){
            self.clearPrizes();
            self.changePrizesTimer = setInterval(()=>{
                self.addPrizes(false,true);
            },500)
        }
    }
    cancelChangePrizes(){
        this.prizesConfirm = true;
    }
    addGetMusic(){
        let self = this;
        let game = self.game;
        self.getMusic = game.add.sprite(0,0,'');
        //滑轮
        self.moveWheeler = game.add.sprite(138,82,'sprite','moveWheeler.png');
        self.getMusic.addChild(self.moveWheeler);
        //拉伸杠
        self.tilesprite = game.add.tileSprite(138+27.5,119,58,43,'tilesprite');
        self.getMusic.addChild(self.tilesprite);
        //抓头
        self.telescopicRod = game.add.sprite(138+27.5,119+43,'telescopicRod');
        //抓爪
        self.leftClip = game.add.sprite(self.telescopicRod.x+self.telescopicRod.width/2,119+43+30,'sprite','leftClip.png');
        self.leftClip.anchor.setTo(1,0);
        self.rightClip = game.add.sprite(self.telescopicRod.x+self.telescopicRod.width/2,119+43+30,'sprite','rightClip.png');

        self.getMusic.addChild(self.leftClip);
        self.getMusic.addChild(self.rightClip);
        self.getMusic.addChild(self.telescopicRod);
    }
    rotateClip(){
        let self = this;
        self.leftClip.angle = -5;
        self.rightClip.angle = 5;
    }
    resetClip(fn){
        let self = this;
        self.leftClip.angle = 0;
        self.rightClip.angle = 0;
        fn&&fn();
    }
    rodDown(onefree,fn,prizeImg,offsetX){
        let self = this;
        if(self.rodDownTimer) return;
        self.rodDownTimer = setInterval(()=>{
            self.tilesprite.height += 2;
            self.telescopicRod.y += 2;
            self.leftClip.y += 2;
            self.rightClip.y += 2;
            if(self.tilesprite.height>=240){
                clearInterval(self.rodDownTimer);
                self.rodDownTimer = null;
                self.rotateClip();
                if(onefree){
                    setTimeout(()=>{
                        self.rodUp(onefree,fn,prizeImg,offsetX);
                    },500)
                }else{
                    fn&&fn();
                }
            }
        },10)
    }
    rodUp(onefree,fn,prizeImg,offsetX){
        let self = this;
        if(!offsetX) offsetX = 11/8;
        if(self.rodUpTimer) return;
        if(self.currPrizeSp){
            self.currPrizeSp.frameName = prizeImg;
        }else{
            self.currPrizeSp = game.add.sprite(0,0,'awards',prizeImg||'thanks.png');
            // self.currPrizeSp.scale.x = 0.6;
            // self.currPrizeSp.scale.y = 0.6;
            game.world.setChildIndex(self.currPrizeSp,2);
            self.currPrizeSp.x = self.getMusic.x + self.currPrizeSp.width*offsetX;
            self.currPrizeSp.y = self.telescopicRod.y + self.telescopicRod.height;
        }
        if(onefree){
            self.rodUpTimer = setInterval(()=>{
                self.currPrizeSp.y -= 2;
                self.tilesprite.height -= 2;
                self.telescopicRod.y -= 2;
                self.leftClip.y -= 2;
                self.rightClip.y -= 2;
                if(self.tilesprite.height<=44){
                    clearInterval(self.rodUpTimer);
                    self.rodUpTimer = null;
                    self.currPrizeSp.kill();
                    self.currPrizeSp = null;
                    self.resetClip();
                    self.getMusicTwn.resume();
                    setTimeout(()=>{
                        self.catching = false;
                    },200);
                    fn&&fn();
                }
            },10)
        }else{
            self.rodUpTimer = setInterval(()=>{
                self.currPrizeSp.y -= 2;
                self.tilesprite.height -= 2;
                self.telescopicRod.y -= 2;
                self.leftClip.y -= 2;
                self.rightClip.y -= 2;
                if(self.tilesprite.height<=44){
                    clearInterval(self.rodUpTimer);
                    self.rodUpTimer = null;
                    fn&&fn(()=>{
                        self.currPrizeSp.kill();
                        self.currPrizeSp = null;
                        self.resetClip();
                        self.getMusicTwn.resume();
                        setTimeout(()=>{
                            self.catching = false;
                        },200);
                    });
                }
            },10)
        }
    }
    catchPrize(onefree,fn,prizeImg,offsetX){
        let self = this;
        if(self.catching) return;
        self.catching = true;
        self.getMusicTwn.pause();
        self.rodDown(onefree,fn,prizeImg,offsetX);
    }
    sway(){
        let self = this;
        let game = self.game;
        self.getMusicTwn = game.add.tween(self.getMusic).to({ x: 1080-138*2-self.moveWheeler.width}, 2000, Phaser.Easing.Linear.None, true, 0, -1, true);
    }
}

module.exports = Main;
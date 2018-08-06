"use strict";
require('./css/index.less');
let dialog = require('@flyme/modaldialog');
let notifyBackpress = require('@flyme/utils/src/appStoreClient/notifyBackpress.js')();
import Track from './Track.js';
import Native from './Native.js';

import {debounce} from '../../assets/lib/ba-throttle-debounce.js';
import Game from './game.js';

import Constant from './Constant.js';

dialog.config({
  useHash: true,
  notifyBackpress: notifyBackpress
});

let Activity = {
  init(options){
    this.options = options;

    let game = Game.createGame();
    this.bindEvents();
    this.sex = 0;

    return game;
  },
  bindEvents(){
    $('.tobegin-btn').one('click',()=>{
      // if(document.documentElement.webkitRequestFullScreen)
      //   document.documentElement.webkitRequestFullScreen();
      Track.clickStart();
      $('.first-page').hide();
      $(".guide, #game-canvas").removeClass('none');
      this.initFootbar();
      setTimeout(function(){
        Track.exposureDemo();
      }, 1000);
    });

    $('.guide').click(function(){
      Track.clickDemostart();
      $(this).hide();

      setTimeout(function(){
        Track.exposureGaming();
      }, 1000);
    });

    Game.on('create',()=>{
      $('.footbar').removeClass('none');
      $('#game-canvas').css('opacity', 1);
    });
  },
  initFootbar(){
    let targetContainer = this.options.targetContainer || 'body';

    $(targetContainer).append($('#footbar').html());

    let activedClz = 'actived',
        selMap = {'sel-people': 0, 'sel-faceto': 1, 'sel-cloth': 2, 'sel-hair': 3, 'sel-scene': 4, 'sel-props': 5},
        curSelIdx = 0;

    let perWidth = 59,
        paddingLeft = 21,
        $showBar = $('.show-bar'),
        $allShowSection = $showBar.find('section'),
        $hasDataSexSection = $showBar.find('[data-showsex]');


    if(Game.isMount)
      $('.footbar').removeClass('none');

    $('.select-bar').delegate('li', 'click', function(){
      let $target = $(this);

      $target.siblings().removeClass(activedClz);
      $target.addClass(activedClz);

      curSelIdx = selMap[$target.attr('id')];

      $allShowSection.removeClass('actived')
        .eq(curSelIdx).addClass('actived');

      if(($showBar).hasClass('hide'))
        $('.toggle-open').click();

      Track.clickTab(curSelIdx);
    });



    $('.show-bar').delegate('.show-bar-items', 'click', (evt)=>{
      let count = evt.target.dataset.count*1 - 1,
          idx = (evt.offsetX - paddingLeft)/ perWidth | 0,
          factor = (evt.offsetX - paddingLeft) % perWidth;

      // if(factor > perWidth -15)
      //   idx += 1;

      if(process.env.NODE_ENV === 'develop')
        console.log(evt.target.className, evt.pageX, evt.offsetX, idx, factor);

      if(isNaN(count))
        return;

      if(idx > count)
        idx = count;

      if(!curSelIdx){
        if(idx > 1)
          idx = 1;

        this.sex = idx;
        Game.createPeople(idx,0);
        $hasDataSexSection.attr('data-showsex', idx);
        if(!$('.play-tip').hasClass('none'))
          $('.play-tip').addClass('none');
      }else if(curSelIdx == 1){
        Game.adjustFaceTo(idx);
      }else if(curSelIdx == 3){
        Game.changeHair(idx);
      }else if(curSelIdx == 4){
        Game.changeScene(idx);
      }else if(curSelIdx == 5){
        Game.putProp(idx);
      }else{
        Game.changeCloth(idx, idx);
      }

      Track.clickStyle(curSelIdx, idx, Game.getSex());
    });

    $('.toggle-open').click((evt)=>{
      $(evt.target).toggleClass('closed');
      $showBar.toggleClass('hide');
    });

    $('.dosave').one('click',(evt)=>{
      let {isAppStore, isBrowser} = Native,
          hasApp = isAppStore || isBrowser;

      $('.footbar').hide();

      Game.doSave(!hasApp);

      if(!hasApp){
        this.showSaveTip();
      }else{
        $('.share-content').removeClass('none');

        $('.sharefriend').click(()=>{

          if(!Native.share(Game.coverToImg())){
            // dialog.alert('请升级系统版本才能分享哦');
            // $(".temp-canvas").hide();
            // $('.share-content').addClass('none');
            // this.showSaveTip();
            // Game.doSave(true);
          }

          Track.clickShare();
        });
      }

      Track.clickCreate();

      $('.show-bar').off();
    });

    $('.guess').click(function(){
      //TODO: test
      Native.goTo('qunaraphone://hy?loadview=hold&type=navibar-none&url=https%3A%2F%2Fm.flight.qunar.com%2Fhy%2FworldCup%3Fad_channel%3Dmzsjb%26ad_type%3D02%26ad_other%3D&isTransferHome=true', 'com.Qunar', 303048)
      Track.clickBet();
    });
  },
  showSaveTip(){
    let $saveTip = $('.save-tip');

    $saveTip.removeClass('none');

    setTimeout(()=>{
      $saveTip.css('opacity', 0);
    }, 30);
  }
}

export default Activity;

//TODO: test
// window.setHairPos = function(x,y){
//   if(x == null)
//     return Game.currentPerson.hairSprite.position;
//   else
//     Game.currentPerson.hairSprite.position.set(x,y);
// }
// window.setCloth = function(id, part, x, y){
//   if(x == null)
//     return Game.currentPerson.getBone(id, part).position;
//   else
//     Game.currentPerson.getBone(id, part).position.set(x,y);
// }


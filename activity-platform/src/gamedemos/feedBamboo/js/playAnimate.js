import utils from 'commonJsDir/utils.js';
// import smileDatas0 from '../imgs/smile1-0.json';
// import smileDatas1 from '../imgs/smile1-1.json';
// import smileDatas2 from '../imgs/smile1-2.json';
import feedDatas0 from '../images/eff/feed-0.json';
import feedDatas1 from '../images/eff/feed-1.json';
import feedDatas2 from '../images/eff/feed-2.json';
// import feedDatas3 from '../imgs/feed-3.json';

import smileDatas0 from '../images/eff/smile-0.json';
import smileDatas1 from '../images/eff/smile-1.json';

let getSmileFrame = (spriteDatas, idx)=>{
  let data;

  let len = spriteDatas.length;

  while(--len >= 0){
    if(data = spriteDatas[len].frames[idx])
      break;
  }

  if(data){
    let size = spriteDatas[len].meta.size;

    return {value: data.frame, num: len, size};
  }
};

let play = (sprites, ret)=>{

  let {value:frame, num, size} = ret;

  let sprite = sprites.eq(num);

  if(sprite.hasClass('none')){
    sprites.addClass('none');
    sprite.removeClass('none');
  }
  sprite.css({
    "background-position": `-${frame.x}px -${frame.y}px`,
    width: `${frame.w}px`,
    height: `${frame.h}px`
    // "background-size": `${size.w}px ${size.h}px`
  });
};

let req = function(fn,delay){
  let lastTime = 0,
      duration = 20,
      isRun = !delay;

  let _loop = function(timestamp){
    let passTime = timestamp - lastTime;

    lastTime = lastTime || timestamp;

    if(!isRun && passTime > delay)
      isRun = true;

    if(passTime > duration && isRun){
      lastTime = timestamp;
      if(!fn())
        return;
    }

    requestAnimationFrame(_loop);
  }

  _loop();
}

if(process.env.NODE_ENV == 'develop'){
  window.play = play;
}

function playAnimate(options){
  const {smileImgs, smileDatas, clz, container, autoPlay, loop, playEndCallback=$.noop, autoHide, delay} = options;
  let $children,
      animatePromise;

  animatePromise = new Promise(function(resolve){
    utils.loadImages(smileImgs, (datas)=>{

      let str = '',
          $playSmile;

      smileImgs.forEach((url, idx)=>{
        let item = datas[url];
        str += `<i class="none" style="background:url(${url}) no-repeat;"background-size":${item.width}px ${item.height}px;"></i>`;
      });

      $playSmile = $(`<div class="animate-effects ${clz}">${str}</div>`);

      $(container).append($playSmile).css('background','none');

      $children = $playSmile.children();

      resolve({
        playStart: 0,
        isStop: false,
        play(fn, firstFrameCallback){
          this.playStart = 0;
          this.isStop = false;
          $playSmile.removeClass('none-visible');
          req(()=>{
            if(this.isStop)
              return;

            let idx = '_' + (this.playStart++); //("00"+ (this.playStart++)).slice(-3);

            let ret = getSmileFrame(smileDatas, idx);

            if(!ret){
              playEndCallback();
              fn && fn();
              if(!loop){
                this.stop(autoHide);
                return;
              }

              this.playStart = 0;
              ret = getSmileFrame(smileDatas, '_0');
            }

            if(this.playStart == 1)
              firstFrameCallback && firstFrameCallback();

            play($children, ret);

            return true;
          }, delay);
        },
        stop(isHide){
          this.isStop = true;
          if(isHide)
            $playSmile.addClass('none-visible');

          play($children, getSmileFrame(smileDatas, '_0'));
        }
      });
    });
  });

  return animatePromise.then(function(animateState){
    if(autoPlay)
      animateState.play();

    return animateState;
  })

}

export function playBeginState(){
  // const smileImgs = ['./imgs/smile1-0.png','./imgs/smile1-1.png','./imgs/smile1-2.png'];
  const smileImgs = ['../static/imgs/feedBamboo/eff/smile-0.webp','../static/imgs/feedBamboo/eff/smile-1.webp'];
  const smileDatas = [smileDatas0, smileDatas1];

  return playAnimate({
    smileImgs,
    smileDatas,
    clz: 'panda-effects',
    container: '.panda',
    autoPlay: true,
    loop: true
  });
}

export function playFeedState(){
  const smileImgs = ['../static/imgs/feedBamboo/eff/feed-0.webp','../static/imgs/feedBamboo/eff/feed-1.webp','../static/imgs/feedBamboo/eff/feed-2.webp'];
  const smileDatas = [feedDatas0, feedDatas1, feedDatas2];

  let readdFrames = feedDatas0.frames,
      frame117 = readdFrames['_117'],
      frame118 = feedDatas0.frames['_118'];;

  $.extend(readdFrames,{
    "_118": frame117,
    "_119": frame117,
    "_120": frame118,
    "_121": frame118
  })

  return playAnimate({
    smileImgs,
    smileDatas,
    clz: 'feed-effects',
    container: '.panda',
    autoHide: true
  });
};
export default playAnimate;
<template>
    <div id="game-canvas">
      <div class="stopwatch"><em class="sec-hand-txt">20</em><span>
        s</span>
        <div class="life-info"><span>×</span><em class="life-time">0</em></div>
      </div>
      <div class="gold-content">
        <i class="goldIcon"></i>
        <div class="life-info"><span>×</span><span class="gold-count">0</span></div>
      </div>
    </div>

</template>
<script>
import createGame from './game.js'

// let loopCount = 1;
//
// game.beforeBeginGameAgain = function (callback) {
//   if(loopCount-- > 0)
//     return true;
// }

export default {
  name: 'receive',
  mounted(){
    let game = createGame();

    game.on('create', ()=>{

      // setTimeout(()=>{
      //   game.stopGame();
      //   game.roundEnd(true);
      //   game.resetGame();
      //   game.initTalk(1);
      // }, 30000);
    });

    this.game = game;
  },
  beforeDestroy(){
    this.game.destroy();
  }
}
</script>
<style lang="less">
  @stopwatchIcon: '../../../static/imgs/receiveSth/stopwatch.webp';
  @goldIcon: '../../../static/imgs/receiveSth/goldIcon.webp';
  em{
    font-style: normal;
  }
  .stopwatch{
    text-align: center;
    position: absolute;
    top: 55px;
    right: 38px;
    width: 33px;
    height: 37px;
    line-height: 37px;
    background: url(@stopwatchIcon) no-repeat;
    background-size: contain;
    color: #ffffff;
    padding-top: 2px;
    em{
      font-size: 12px;
    }
    span{
      font-size: 10px;
    }
    .life-info{
      color: #fb543c;
    }
  }
  .life-info{
    position: absolute;
    top: 0px;
    left: 115%;
    color: #ffd572;
    font-size: 13px;
  }
  .gold-content{
    position: absolute;
    top: 99px;
    right: 39px;
    line-height: 30px;
    .goldIcon{
      display: inline-block;
      width: 30px;
      height: 30px;
      background: url(@goldIcon) no-repeat;
      background-size: contain;
    }
  }
</style>
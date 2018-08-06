<template>
    <div id="game-canvas" class="game">
      <!-- <canvas id="mycanvas" width="108" height="2"></canvas> -->
      <div class="footer" style="display: none">
        <img src="static/imgs/plane/icon.png" class="icon">
        <div class="textCont">
          <p>即刻-没有标题党的资讯神器</p>
          <p id="app_progress">13.6MB</p>
        </div>
      </div>
    </div>
</template>
    <style scoped>

      /*canvas {display: block; margin: 0 auto; max-width:100% !important; }*/
      /*.game { width: 100%; height: 100%; }*/
      .dialog-instruction section{
          text-align: left !important;
          line-height: 1.6;
          font-size: 14px;
      }
      .footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .footer .textCont{
        width: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .footer img{
        width: 44px;
      }
      .footer p{
        color: #fff;
        margin: 0;
        height: 22px;
        line-height: 22px;
        color: #fff;
        font-size: 14px;
        margin-left: 10%;
      }
      .footer .progres {
        font-size: 12px;
      }
    </style>
<script>
import game from './game.js'

export default {
    name: 'plane',
    mounted(){
      game.init();
    }
    ,
    beforeDestroy(){
      game.destroy();

    }
}
</script>
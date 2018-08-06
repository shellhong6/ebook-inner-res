<template>
    <div class="game-container">
      <section class="first-page">
     <div class="first-top"></div>
     <div class="first-content">
        <img src="static/imgs/pose/start.gif" class="demo-gif">
        <div class="tobegin-btn"></div>
        <div class="first-pagefooter"></div>
     </div>
 </section>
 <section class="guide none">
     <div class="guide-bg">
        <div class="guide-header"></div>
        <div class="guide-action"></div>
        <em class="guide-info">像这样拖拽四肢，摆出你的玄学竞猜姿势吧!</em>
        <div><em class="guide-info">双击界面可挪动个别部位</em></div>
        <div class="tostart-btn">开始游戏</div>
     </div>
 </section>
  <div id="game-canvas" class="none"></div>
  <div class="save-tip none"><i class="solid-circle"></i><em>长按保存你的竞猜姿势</em></div>
  <div class="share-content clearfix none">
    <div class="left">
      <strong>我的玄学竞猜姿势</strong>
      <div class="btns"><button class="guess">免费竞猜</button><button class="sharefriend">分享好友</button></div>
      <em>*跳转内容由去哪儿app提供，请依据规则进行操作</em>
    </div>
    <i class="share-apps right"></i>
  </div>
  <div class="share-content1 clearfix none">
    <div class="left">
      <strong>我的玄学竞猜姿势</strong>
      <div class="btns"><button class="sharefriend">分享好友</button><div class="mz-store"></div></div>
    </div>
    <i class="qrcode right"></i>
  </div>
<script id="footbar" type="text/html">
  <footer class="footbar none">
    <div class="dosave">保存</div>
    <div class="toggle-open"></div>
      <div class="show-bar">
          <section class="sex actived">
            <div class="show-bar-items persons" data-count='2'>
              <div class="play-tip">
                <sub class="arrow-guide"></sub>
                <i></i><p>
                来选个人吧</p>
              </div>
            </div>

          </section>
          <section class="show-face" data-showsex="2">
            <div class="show-bar-items man-faceto" data-count='4'></div>
            <div class="show-bar-items girl-faceto" data-count='4'></div>
          </section>
          <section class="cloth" data-showsex="2">
            <div class="show-bar-items man-cloth" data-count='8'></div>
            <div class="show-bar-items girl-cloth" data-count='8'></div>
          </section>
          <section class="hairs" data-showsex="2">
            <div class="show-bar-items man-hair" data-count='7'></div>
            <div class="show-bar-items girl-hair" data-count='7'></div>
          </section>
          <section class="scene">
            <div class="show-bar-items show-scenes" data-count='5'></div>
          </section>
          <section class="props">
            <div class="show-bar-items show-props" data-count='15'></div>
          </section>
      </div>
      <div class="select-bar">
          <ul class="clearfix">
              <li class="actived" id="sel-people"><i></i><em>选人</em></li>
              <li id="sel-faceto"><i></i><em>朝向</em></li>
              <li id="sel-cloth"><i></i><em>服装</em></li>
              <li id="sel-hair"><i></i><em>发型</em></li>
              <li id="sel-scene"><i></i><em>场景</em></li>
              <li id="sel-props"><i></i><em>道具</em></li>
          </ul>
      </div>
  </footer>
</script>
    </div>
</template>
<script>
import Activity from './index.js'

// let loopCount = 1;

// game.beforeBeginGameAgain = function (callback) {
//   if(loopCount-- > 0)
//     return true;
// }

export default {
  name: 'pose',
  mounted(){

    this.game = Activity.init({
      targetContainer: '.game-container'
    });
  },
  beforeDestroy(){
    this.game.destroy();
  }
}
</script>

<style>
  .game-container{
    width: 360px;
    height: 640px;
    margin: 0 auto;
    position: relative;
    background: #6bb2ff;
    -webkit-overflow-scrolling: touch;
    overflow: hidden;
    text-align: center;
    font-size: 13px;
  }
</style>
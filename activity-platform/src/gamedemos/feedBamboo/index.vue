<template>
<div class="root">
    <div class="container">
        <div class="signin-area"></div>
        <p class="game-tip">安装<span class="signapp-name">App</span>，每天打开返回后领竹子</p>
        <div class="game-progress">
            <div class="rc-progress">
                <div class="progress-bar"></div>
                <ul class="progress-stage">
                    <li></li>
                    <li></li>
                    <li>
                        <i class="progress-prize"></i>
                        <span class="prize-name">充话费</span>
                    </li>
                </ul>
                <div class="progress-len animate-progress-len"></div>
            </div>
            <p class="win-tip">还需投喂<span class="remain-count"></span>次可领奖品</p>
        </div>
        <div class="winnower">
            <i class="winnowerholder"></i>
            <i class="flabellum wind-rotate"></i>
        </div>
        <div class="car-content">
            <i class="cigarette flow-cigarette"></i>
            <i class="cigarette flow-cigarette flow-delay"></i>
            <i class="cigarette flow-cigarette flow-delay2 last"></i>
            <i class="car"></i>
        </div>
        <div class="character-content">
            <div class="panda-main"><div class="panda"></div></div>
            <div class="food-content disabled">
                <p class="feed-word"></p>
                <i class="food-count">0</i>
                <em class="feedover-tip">领完奖了,休息一下吧</em>
            </div>
        </div>
        <div class="applist-container">
            <div class="oneclick install-all">
            一键领取8袋竹子
            </div>
            <div class="applist-tip">下载应用并打开即可获得竹子喔～</div>
        </div>
        <dl class="tip-menus">
            <dt class="tip-menu-btn"></dt>
            <dd class="activity-desc"></dd>
            <dd class="award-mine"></dd>
        </dl>
        <div class="guide-mask">
            <i class="up-arrow"></i>
            <strong class="guide-tip">做任务领竹子，每日喂养<em class="guide-count">多</em>次<br/>即可获得奖品</strong>
            <button class="guide-okbtn">知道了</button>
        </div>
        <div class="debug">
            <button id="resetStorage">清缓存</button>
        </div>
    </div>
</div>
</template>
<style>
.root{
    width: 100%;
    height: 100%;
    background-color: rgb(78, 182, 67);
}
.debug{
    position: absolute;
    top:10px;
    z-index: 1000;
}
.debug button{
    text-align: left;
    display: block;
    height: 30px;
    width: 80px;
    margin-bottom: 10px;
    padding: 0;
}
</style>
<script>
import game from './game.js'

export default {
    name: 'feedBamboo',
    mounted(){
      game.init();
    }
    ,
    beforeDestroy(){
      game.destroy();

    }
}
</script>

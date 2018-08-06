<template>

  <div class="ele-container">
    <ul class="ele-list clearfix">
      <li v-for="item in gameConfig">
        <a href="javascript:void(0);" @click="chooseGame(item)">
          <div class="img-height"><img :src="baseContext + item.img" :alt="item.title"></div>
          <strong>{{item.title}}</strong>
        </a>
      </li>
    </ul>
    <el-dialog title="游戏例子" :visible.sync="dialogVisible" :before-close="closeDialog">
      <div class="dialog-operate" slot="title"><el-button type="primary" icon="el-icon-rank" @click="toggleFullScreen" >进入全屏</el-button></div>
      <component v-bind:is="currentComponentName"></component>

    </el-dialog>
  </div>
</template>
<script>
import gameConfig from './gameconfig.js';

function toggleFullScreen(element) {
  var doc = window.document;
  var docEl = element || doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}

export default {
  name: 'gamedemos',
  // components: {cutfruit: cutfruit},
  data:function(){
    return {
      baseContext: 'static/imgs',
      gameConfig: gameConfig,
      currentComponentName: '',
      dialogVisible: false,
    }
  },
  methods: {
    chooseGame: function (item) {
      item.component().then((component)=>{
        component = component.default || component;

        let componentName = component.name;

        this.$options.components[componentName] = component;

        this.currentComponentName = componentName;
        this.dialogVisible = true;

        this.currentComponent = component;
      })
    },
    closeDialog: function(){
      // this.$children[0].$children[0].game.destroy();
      this.$children[0].$children[1].$destroy();
      this.dialogVisible = false;
      this.currentComponentName = '';
    },
    toggleFullScreen: function(){
      toggleFullScreen(document.querySelector('#game-canvas'))
    }
  },
  mounted(){

  }
}
</script>

<style lang="less">
.el-dialog{
  overflow: hidden;
}
.ele-container{
  width: 90%;
  margin: 10px auto;
}
.ele-list{
  text-align: center;
  li{
    list-style: none;
    float: left;
    width: 25%;
    padding-right: 15px;
    margin-top: 20px;
    .img-height{
      height: 0;
      padding-top: 100%;
      position: relative;
    }
    img{
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    strong{
      font-weight: 400;
      margin-top: 5px;
      display: block;
    }
  }
}
.dialog-operate{
  text-align: center;
}
#game-canvas{
  width: 360px;
  // height: 640px;
  margin: 0 auto;
  position: relative;
  &:fullscreen{
    width: auto;
  }
}
@media only screen and (max-width: 600px) {
  .el-dialog{
    width: 100%;
  }
}
</style>
<template>
    <div id="game-canvas"></div>
</template>
<script>
import createGame from './game.js'

// let loopCount = 1;

// game.beforeBeginGameAgain = function (callback) {
//   if(loopCount-- > 0)
//     return true;
// }

export default {
  name: 'breakout-clone',
  mounted(){
    let loopCount = 1;
    // game.init();
    this.game = createGame();

    this.game.beforeBeginGameAgain = function (callback) {
      if(loopCount-- > 0)
        return true;
    }
  },
  beforeDestroy(){
    this.game.destroy();
  }
}
</script>

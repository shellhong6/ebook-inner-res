<template>
    <div id="game-canvas"></div>

</template>
<script>
import createGame from './game.js';
import eventStore from './eventStore.js';
import Constant from './Constant.js';
// let loopCount = 1;
//
// game.beforeBeginGameAgain = function (callback) {
//   if(loopCount-- > 0)
//     return true;
// }

export default {
  name: 'cutfruit',
  mounted(){
    let game = createGame();

    eventStore.on(eventStore.BEGINGAME, ()=>{
      game.beginGame();
    });

    eventStore.on(eventStore.TIMETOGAMEEND, ()=>{
      game.toOpenState();
    });

    eventStore.on(eventStore.GAMESTATE, (state, actions)=>{
      if(state == 2){
        game.menuState.status = 'gameOver';
        game.setBtnTxt(Constant.menuFrame.gameOver);
        game.setMenuTip();
      }
    });

    this.game = game;
  },
  beforeDestroy(){
    this.game.destroy();

    eventStore.offAll();

  }
}
</script>
<style>

</style>
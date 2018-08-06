import eventEmitter from 'event-emitter';
import offAll from 'event-emitter/all-off.js';

export default eventEmitter({
  RUNSTATEMACHINE: 'runNext',
  GAMEOVER: 'gameOver',
  CHECKTOOPEN: 'CheckToOpen',
  BEGINGAME: 'begingame',
  TIMETOGAMEEND: 'timetogameend',
  GAMESTATE: 'gamestate',
  offAll(){
    offAll(this);
  }
});
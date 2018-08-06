import eventEmitter from 'event-emitter';

export default eventEmitter({
  TOPLAYSTATE: 'toPlayState',
  INITEVENT:'initEventStore',
  init(stateMachine){
    this.stateMachine = stateMachine;

    this.on(this.TOPLAYSTATE,this.toPlayState.bind(this));
    this.emit(this.INITEVENT);
  },
  toPlayState(){
    this.stateMachine.run();
  }

});
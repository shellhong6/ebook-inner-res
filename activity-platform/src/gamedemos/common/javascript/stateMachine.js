/**
 * 简单实现的轻量级状态机
 * @module stateMachine
 */
function stateMachine(){

  return {
    _switchStateListener: function(){},
    RESULT: {
      PENDING: 1, //不执行fn
      CONTINUED: 2 //执行fn
    },
    create(options){
      this.toNextStateFrom('startUp');
      return this;
    },
    onSwitchState(listener){
      if(listener)
        this._switchStateListener = listener;

      return this;
    },
    setStates(states){
      this.STATES = states;

      return this;
    },
    getCurrentState(){
      return this.STATES[this.activedState];
    },
    isState(state){
      return this.activedState == state;
    },
    toNextStateFrom(state){
      this.activedState = state;
      this.run();
    },
    run(){
      if(process.env.NODE_ENV !== 'production'){
        if(this.activedState instanceof Promise){
          console.log('previous state is processing, please wait it to work out');
        }
      }
      if(this.runLock || this.activedState instanceof Promise)
        return;
      var args = Array.prototype.slice.call(arguments,0);
      var state = this.getCurrentState();

      args = [this].concat(args);

      var leave = state.leaveState && state.leaveState.apply(state,args);

      if(leave === this.RESULT.PENDING)
        return;
      else if(leave === this.RESULT.CONTINUED){
        state.fn && state.fn(this);
        return;
      }

      this.fromState = this.activedState;

      this.activedState = new Promise((resolve)=>{
        resolve(state.checkCondition(this));
      });

      this.activedState.then((stateValue)=>{
        this.activedState = stateValue;
        state = this.getCurrentState();
        state.enterState && state.enterState(this);
        state.fn && state.fn(this);
        this._switchStateListener(stateValue);
        if(process.env.NODE_ENV !== 'production'){
          console.log('switch to state : %s', stateValue);
        }
      }).catch((err)=>{
        if(process.env.NODE_ENV !== 'production'){
          console.log(this.activedState,err && err.stack);
        }
      });
    }
  }
}

module.exports = stateMachine;
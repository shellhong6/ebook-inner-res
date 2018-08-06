import utils from 'commonJsDir/utils.js';

let tools = {
  localStates: function(storageName, key, val, defaultVal){
    var states = utils.getStorage(storageName) || defaultVal;

    if(typeof key == 'undefined')
      return states;
    else if(key != null){
      if(typeof val == 'undefined')
        return states[key];
      else if(val === null)
        delete states[key];
      else
        states[key] = val;
    }else
      delete states[key];

    utils.setStorage(storageName,states);
  },
  localBtnState: function(appId, val){
    return this.localStates('_btsst', appId, val, {});
  },
  localAppState: function(appId, val){
    if(Object.prototype.toString.call(appId) === "[object Array]")
      utils.setStorage('_appsst', appId);
    else{
      if(val != null && appId != null){
        let appList = this.localStates('_appsst');

        appList[appId].state = val;

        utils.setStorage('_appsst', appList);
        return;
      }

      return this.localStates('_appsst', appId, val, []);
    }
  }
};

if(typeof Object.assign != 'function'){
  Object.assign = $.extend;
}

module.exports = tools;
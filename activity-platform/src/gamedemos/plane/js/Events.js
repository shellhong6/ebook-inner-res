/**
 * Created by JunSong on 2018/7/9.
 */


var Events = (function(){

    var clientList = {},
        listen,
        trigger,
        remove,
        removeAll,
        once;

    listen = function(key, fn, context){
        if(!clientList[key]){
            clientList[key] = []
        }
        clientList[key].push({fn:fn,context:context||this});
    };

    trigger = function(){
        var key = Array.prototype.shift.call(arguments),
            fns = clientList[key];

        if(!fns || fns.length === 0){
            return false;
        }

        for(var i = 0, fnObj; fnObj=fns[i++];){
            fnObj.fn.call(fnObj.context, [].slice.call(arguments,0));
        }
    };

    remove = function(key,fn){
        var fns = clientList[key];
        if(!fns){
            return false;
        }

        if(!fn){  //remove all
            fns && (fns.length = 0)
        }else{
            for(var l=fns.length-1; l>=0; l--){
                var _fnObj = fns[l];
                if(_fnObj.fn === fn){
                    fns.splice(l,1);
                }
            }
        }
    };

    removeAll = function(key){
        if(key){
          if(clientList[key])
            clientList[key] = null;
        }else{
            clientList = [];
        }
    };

    return {
        on: listen,
        trigger: trigger,
        remove: remove,
        removeAll: removeAll
    }

})();

export default Events;
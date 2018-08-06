var Clipboard = require('clipboard');
var Native = require('./native.js');

/**
 * 提供在网页上复制文本的方法
 * @module tools
 */
var tools = {
  supportCopy: true,
  copyAndGo: function(btn,text,options){
    var clipboard = new Clipboard(btn, {
        text: function(trigger) {
            return text;
        }
    });
    options = options || {};

    clipboard.on('success', function(e) {
      e.clearSelection();
      clipboard.destroy();

      options.sucessCallback && options.sucessCallback();
    })

    clipboard.on('error', function(e) {
      clipboard.destroy();
      options.failCallback && options.failCallback();
    });
    return clipboard;
  }
};

if(Native.isSupportCopy()){
  tools.copyAndGo = function(btn,text,options){
    options = options || {};
    setTimeout(function(){
      $(btn).one('click',function(){
        if(Native.setClipContent(text)){
          options.sucessCallback && options.sucessCallback();
        }else{
          options.failCallback && options.failCallback();
        }
      });
    }, 10);
  };
}

module.exports = tools;
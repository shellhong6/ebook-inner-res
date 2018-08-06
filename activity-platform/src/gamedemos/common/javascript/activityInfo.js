var domUtils = require('./dom.js');

var activityInfo = {
  defaultOptions:{
    names:['我的奖品','活动说明','中奖名单']
  },
  templ:function(settings){
    //模板视图内容
    var names = settings.names;
    var template = '<ul class="rc-activity-desc clearfix"><li class="myaward"><i class="hrline marg-r5"></i>' + names[0] +
        '</li><li class="activeIntro">'+names[1]+'</li><li class="pricebook">'+names[2]+'<i class="hrline marg-l5"></i></li></ul>';

    return domUtils.createHtmlDom(template);
  },
  init:function(options){
//初始化变量
    var _self = this,
        settings = domUtils.assign({},this.defaultOptions,options);
    this.element = this.templ(settings);
    this.afterClick = options.afterClick;
    this.proxyClickCallback = function(event){
      _self.clickCallback(event);
      _self.afterClick && _self.afterClick(event);
    };
    domUtils.bindEvent(this.element,'click',this.proxyClickCallback);
  },
  clickCallback:function(event){
    var target = event.target,
        classNam = target.className;

    if(!!this[classNam]){
      this[classNam].call(this,event);
    }
  },
  render:function(container){
//页面渲染
    var tempContainer;
    if(container){
      tempContainer = document.querySelector(container);
    }
    if(!tempContainer)
      tempContainer = document.body;

    tempContainer.appendChild(this.element);
    this.afterReder();
  },
  clear:function(){
    domUtils.unBindEvent(this.element,'click',this.proxyClickCallback);
    this.element = null;
  },
  afterReder:function(){
//dom挂载到页面后
  },
  myaward:function(event){
    console.log('myaward')
  },
  activeIntro:function(event){
    console.log('activeIntro')
  },
  pricebook:function(event){
    console.log('pricebook')
  },
  then:function(c1,c2,c3){
    if(!!c1)
      this.myaward = this.proxy(c1);
    if(!!c2)
      this.activeIntro = this.proxy(c2);
    if(!!c3)
      this.pricebook = this.proxy(c3);
  },
  proxy:function(callback){
    var params = Array.prototype.slice.call(arguments,1),
        self = this;
    return function(){
      var args = Array.prototype.slice.call(arguments,0),
          tempArgs = [];
      if(params.length > 0){
          tempArgs = tempArgs.concat(params);
      }
      if(args.length > 0)
        tempArgs = tempArgs.concat(args);

      return callback.apply(self,tempArgs);
    };
  }
};

var baseClass = function(){};
baseClass.prototype = activityInfo;

function renderActivityInfo(container,options){
  var newObj = new baseClass;

  newObj.init(options);
  newObj.render(container);

  return newObj;
}

module.exports = renderActivityInfo;

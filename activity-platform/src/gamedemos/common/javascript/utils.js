import Constant from './constant.js';
import domUtils from './dom.js';

var matchProject = location.pathname.match(/src\/([^\/]*)/),
    projectName = '';

if(matchProject && matchProject[1]){
  projectName = matchProject[1];
}

/**
 * 基础工具类
 * @module utils
 */
var utils = {
  ns: projectName + Constant.campaignId + (domUtils.getUrlParam('localVer') || ''),
  setStorage: function (name, val) {
    var key = '_activity_bro',
        data;
    try{
      data = this.getStorage(null,true);
      if(!data){
        data = {};
        data[this.ns] = {};
      }else if(!data[this.ns]){
        data[this.ns] = {};
      }
      if(val == null){
        delete data[this.ns][name];
      }else{
        data[this.ns][name] = val;
      }
      localStorage.setItem(key, JSON.stringify(data));
    }catch (error) {
        console.warn('Unable to save state',error);
    }
  },
 getStorage: function (name,isAll) {
    var key = '_activity_bro',
        data;
    try {
        data = localStorage.getItem(key);
    }catch (error) {
        console.warn('Unable to read state',error);
    }
    if(data){
        try{
            data = JSON.parse(data);
            if(!isAll)
            data= data[this.ns] || {}
            if(name)
            data = data[name];

        }catch (error) {
        // Ignore invalid JSON.
        }
        return data;
    }
  },
  resetStorage: function(){
    var key = '_activity_bro',
        data;

    try{
      data = this.getStorage(null,true) || {};
      data[this.ns]={};
      localStorage.setItem(key, JSON.stringify(data));
    }catch (error) {
        console.warn('Unable to reset state',error);
    }
  },
  timeFormat: function(time,format){
      if(!time)
          return '';

      var date = new Date(time);
      if(date.toString() == "Invalid Date")
          return '';
      format = format || 'yy/mm/dd HH:ii:ss';
      var timeMap = {
          yy: date.getFullYear(),
          mm: date.getMonth() + 1,
          dd: date.getDate(),
          HH: date.getHours(),
          hh: date.getHours(),
          ii: date.getMinutes(),
          ss: date.getSeconds()
      };
      if(timeMap.HH > 11){
          if(timeMap.HH > 12)
              timeMap.hh = timeMap.HH - 12;
          timeMap.ns = 'PM';
      }else{
          timeMap.ns = 'AM';
      }

      return format.replace(/(yy|mm|dd|HH|hh|ii|ss|ns|m|d)/g,function(a){
        var temp = a,
            data;

        if(!timeMap[temp]){
          a += temp;
        }
        data = timeMap[a] + '';
        data = data.length == 1 && temp.length > 1 ? '0'+data : data;
        return data;
      });
  },
  replaceUrlParam: function (url,key,replaceStr,isappend) {
    var reg = new RegExp("(?:^|&)" + key + "=([^&]*)(&|$)", "i");
    var index = url.indexOf('?'),
        oriUrl = url,
        matchs;
    if(index != -1){
      url = url.substr(index + 1);
      if(matchs = url.match(reg)){
        url =  oriUrl.substr(0,index + 1) + url.replace(matchs[1],replaceStr);
      }
    }
    if(isappend && url.indexOf(key) == -1){
      if(index == -1)
          url += '?';
      else
          url += '&';
      url += key + '=' + replaceStr;
    }
    return url;
  },
  scrollTo(y, cb){
    var duration = 500,
        beginTime = Date.now(),
        scoy = window.scrollY,
        diff = y - scoy;
    var _inner = function(){
      var cur = Date.now(),
          passed = cur - beginTime,
          val;

      if(passed > duration){
        cb && cb();
        return;
      }

      val = ease(passed / duration);
      if(val > 1)
        val = 1;

      window.scrollTo(0,scoy + val * diff);

      requestAnimationFrame(_inner);
    }

    requestAnimationFrame(_inner);

    function ease(k){
      return k * (2-k);
    }
  },
  dec2hex: function( num ){
    if( typeof num !== 'undefined' ){
        return Number(num).toString(16);
    }
  },
  __loadedHash: {},
  __loadedQueue: [],
  //0: 加载中 1: 加载成功 2：加载失败
  loadImage(url, cb){
    var loadedHash = this.__loadedHash,
        loadedQueue = this.__loadedQueue;
    var loadRet = loadedHash[url];

    if(!!cb)
      loadedQueue.push([cb,url]);

    if(!!loadRet){
      if(loadRet[0] === 1)
        afterLoad.call(this, true, loadRet[1].width, loadRet[1].height);
      return;
    }

    loadedHash[url] = 0;

    var img = new Image;

    img.src = url;

    img.onload = ()=>{
      loadedHash[url] = [1, {width: img.width, height: img.height}];
      afterLoad.call(this, true, img.width, img.height);
    }
    img.onerror = (e)=>{
      console.error('%s load error', url);
      loadedHash[url] = 2;
      afterLoad.call(this, false, img.width, img.height);
    }
    function afterLoad(isSuccess, width, height){

      this.__loadedQueue = this.__loadedQueue.filter(item=>{
        var isSame = item[1] == url;

        if(isSame)
          item[0](item[1], isSuccess, {
              url: url,
              width: width,
              height: height
            });

        return !isSame;
      });

      if(img){
        img.onload = null;
        img.onerror = null;
      }

    }
  },
  loadImages(urls,cb){
    let len = urls.length,
        temps = {};

    urls.forEach((url)=>{
      this.loadImage(url, (url, isSuccess, datas)=>{
        temps[url] = datas;
        len --;
        if(isSuccess && len <= 0){
          cb(temps);
        }
      });
    });
  }
}
export default utils;

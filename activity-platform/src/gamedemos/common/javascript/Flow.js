import {services, Native, utils, Constant, Track, AwardDialog, stateMachine, eventStore} from './index.js';
import lottery from './lottery.js';
import downloadManage from './downloadManage.js';

var $scope ={};
var noop = function(){};

var _lottery = lottery($scope);

var MainActivity = {
  resolveTmplData(ret){
    var campaignInfo = ret.campaignInfo,
        prizeGroups = campaignInfo.prizeGroups,
        data = campaignInfo.templateParams,
        missionGroups = campaignInfo.caseGroups[0] || {},
        missions = missionGroups.campaignMissionUnits || [],
        $sepcialScenic = $('.special-scenic'),
        prizesList = {},
        range = data.range,
        hipriorityId = data.hipriorityId || '',
        hipriorityIndex,
        tempHipriorityIds = [];

    hipriorityId = hipriorityId.split('|');

    prizeGroups.forEach(function(item,idx){

      if(item.type == 'lose'){
        $scope.loseAward = item;
      }else{
        prizesList[item.id] = item;
        if(~(hipriorityIndex=hipriorityId.indexOf(item.id+''))){
          tempHipriorityIds.push(item.id);
        }
      }
    });

    if(checkBroVer(range) && $sepcialScenic.length){
      missions.forEach(function(item){
        $sepcialScenic.append('<li><a href="'+ item.redirectUrl +'" target="_blank" ' + 'title="' + item.title + '" ><img src="' + item.imgUrl+ '"  /><div class="adver-title">' + item.title +'</div></a></li>');
      });
    }else{
      $('.extra-welfare-tle').hide();
      $('.special-scenic').hide();
    }

    $.extend($scope,{
      qryTmplRet: data,
      illustration: data.illustration,
      prizesList: prizesList,
      lastRedirectUrl: data.lastRedirectUrl,
      openBeforeLotteryUrl: data.openBeforeLotteryUrl,
      hipriorityId: tempHipriorityIds,
      beforeDownloadTimeout: data.beforeDownloadTimeout*1,
      downloadingTimeout: data.downloadingTimeout*1
    });

    return $scope;

    function checkBroVer(range){
      //非浏览器打开则默认显示图片
      if(Constant.TURN_TO != 'b' ){
          return true;
      }
      var nowBroVer = Native.getVersionCode();
      var vers;
      if(!range)
        return true;
      if(!nowBroVer)
        return false;
      vers = range.split(',');

      if(nowBroVer <= vers[i]*1)
        return false;

      return true;
    }
  }
}


function Flow(){
    var flowPromise = new Promise(
        function(resolve,reject){
            services.getCampaignInfo(function(data){
                resolve(data);
            });
        });

    var flowManager = new _Flow(
          flowPromise.then((data)=>{
            MainActivity.resolveTmplData(data);
            return $scope;
          })
        );

    $(window).one('load',function(){
      $('.opacity-hide').removeClass('opacity-hide').addClass('opacity-show');
      if(process.env.NODE_ENV !== 'production'){
        console.log('on load event');
      }
    });

    return flowManager.use('start').use('end').regist('downloadManage', downloadManage)
              .set('downloadNotify',noop, 'downloadManage').set('startDownload',noop, 'downloadManage');
}

class _Flow{

  constructor(flowPromise){
    this.flowPromise = flowPromise;
    this.registModules = {};
  }
//在getTmpl数据成功返回后才执行的方法
  use(name, fn){
    this[name] = (cb)=>{
      this.flowPromise = this.flowPromise.then((data)=>{

        this.innerCall(name,data);

        cb && cb.call(this,data);

        fn && fn(data);

        return data;
      });

      return this;
    };

    return this;
  }

  innerCall(name,data){
    var innerFn = `_${name}`;

    if(this[innerFn])
      this[innerFn](data);
  }

  set(name, fn = noop, mod){
    if(!mod)
      this[name] = bindFn;
    else
      this.registModules[mod][name] = bindFn;

    return this;

    function bindFn(){
      fn.apply(this,[$scope].concat([].slice.call(arguments,0)));
    }
  }

  regist(name,mod){
    this.registModules[name] = mod;
    return this;
  }

  init(cbs){
    var localDate = utils.getStorage('lde'),
        curTime = Date.now();

    if(Constant.TURN_TO == 't'){
      $('body').addClass('custheme');
    }

    //大于当前日期则清空localstorage
    if(this.compareDate(curTime, localDate)){
      utils.resetStorage();
    }

    //存储当前的日期
    utils.setStorage('lde', curTime);

    if(({}).toString.call(cbs) == "[object Array]"){
      cbs.forEach(cb=>{
        cb.call(this);
      })
    }else
      cbs && cbs.call(this);

    return this;
  }

  _start(){
    $scope.hasLottery = _lottery.beforeLottery();
    downloadManage.init({
      beforeLottery: _lottery.beforeLottery.bind(_lottery),
      lottery: this.lottery.bind(this),
      $scope: $scope,
      mainActivity: this
    });

    var busStates = this.businessStates(downloadManage,this, $scope);

    this.stateMachine = stateMachine()
                          .setStates(busStates.STATES)
                          .onSwitchState(busStates.onSwitchState)
                          .create();

    eventStore.init(this.stateMachine);

    $(".special-scenic").click(this.clickWelfare.bind(this));
    $(".desc-container-sub").click(this.toDispatchEvent.bind(this));
  }

  _end(){
    if($('.special-scenic li').length)
      Track.exposeWelfare('.special-scenic li');
  }

  beforeLottery(){
    return _lottery.beforeLottery();
  }

  lottery(afterdrawFn,callback){
    var awardId;

    if($scope.hipriorityId.length){
      awardId = $scope.hipriorityId[Math.floor(Math.random()*$scope.hipriorityId.length)];
    }

    if(!awardId)
      awardId = this.getAwardId();

    if(!this.beforeLottery()){
      _lottery.lottery(awardId,afterdrawFn,callback, Constant.isInstall);
    }else{
      window.alertDlg('感谢参与，抽奖机会已用完', '', callback);
      afterdrawFn && afterdrawFn();
    }
  }

  business(businessStates){
    this.businessStates = businessStates;
    return this;
  }

  compareDate(date1,date2){
    var formatD1 = utils.timeFormat(date1,'yymmdd') * 1,
        formatD2 = utils.timeFormat(date2,'yymmdd') * 1;

    if(formatD1 > formatD2)
      return true;
  }

  clickWelfare(event){
    var target = event.target;

    if(target.nodeName.toLocaleLowerCase() != 'img'){
      target = $(target).find('img')[0];
    }

    if(target){
      this.openExAppPage(()=>{
        Track.exClick();
      },()=>{
        Track.exClickCommit();
      }, ()=>{
        Track.exClickCancel();
      }, ()=>{
        Native.goTo(target.parentNode.href);
      });

      Track.clickArticle(target.parentNode.href,target.parentNode.title);
      event.preventDefault();
    }
  }

  openExAppPage(noInstallFn,okcallback,cancelFn,doAction){
    if(!Native.isAppInstalled(Native.PKG_NAME,Native.VERSION,true, Native.APP_ID)){
      var state = downloadManage.state;
      if(state != 'downloading' && state != 'download' && state != 'installing'){
        noInstallFn && noInstallFn();
        confirmDlg({
          title: '',
          clazz: 'center-dlg',
          content: `请先下载安装“${Constant.APP_NAME}” 再打开!`,
          okCallback: ()=>{
            okcallback && okcallback();

            var stateMachine = this.stateMachine,
                activedState = stateMachine.activedState;

            if(activedState == 'reDownload' || activedState == 'initState'){
              eventStore.emit(eventStore.TOPLAYSTATE);
            }else{
              Native.checkNetWork(()=>{
                Native.installApp(Native.PKG_NAME,Native.VERSION,Native.APP_ID);
              });
            }

            scrollToGameArea();
          },
          cancelCallback: function(){
            cancelFn && cancelFn();
          }
        });
      }else{
        alertDlg({
          title: '',
          content: '应用正在下载安装中，请稍后再打开~',
          okCallback:function(){
            scrollToGameArea();
          }
        });
      }
    }else{
      doAction && doAction();
    }

    function scrollToGameArea(){
      var gameArea = $(Constant.gameContainer);
      if(gameArea.length){
        setTimeout(function(){
          utils.scrollTo((gameArea.offset().top * 1 - 40));
        },10);
      }
    }
  }

  toDispatchEvent(e){
    var target = e.target;

    if($(target).closest('.disabled').length)
      return;

    if(target.id == 'award-mine'){
      showLoading();
       Native.getImei(()=>{
          hideLoading();
          AwardDialog.getMyPrize($scope,true);
       });
    }else if(target.id == 'activity-desc'){
      window.alertRule($scope.illustration);
    }
  }
}

module.exports = Flow;
/**
 * Created by JunSong on 2017/5/23.
 */
import android from '@flyme/business-fit/build/index';
var GameData = require('./GameData.js');
var stat = require('./stat.js');
var CommonUI = require('./CommonUI.js');

window.dialogOpened = false;

var carrier = android.util.getUrlParams()['turnTo'];

class Native{
    constructor(game,context){
        this.game = game;
        this.context = context;
        this.checkDownloadTimer=null;
        this.alreadyStartDownload=false;
        this.checkDownloadProgressTimer=null;
        this.currDownloadProgress='0%';
        this.hasInstanced = true;
    }
    turnToAppPage(){
        return android.goTo(GameData.appUrl,undefined,{"turn_to_app_type":3,"package_name":GameData.packageName});
    }
    installApp(){
        var self = this;
        if(self.isAppInstalled()) return;
        self.checkNetWorkStatus(()=>{
            GameData.downloadStartTime = Date.now();
            android.specInstallApp(GameData.packageName,+GameData.appVC,GameData.appId,GameData.appDownloadUrl);
            if(carrier!='a'){
                self.checkDownloadTimer = setTimeout(()=>{
                    if(!self.alreadyStartDownload){
                        if(window.dialogOpened) return;
                        window.dialogOpened = true;
                        dialog.alert('您当前的网络状态不佳,请检查网络连接后重试!','', function(){window.dialogOpened=false})
                    }
                },  self.beforeDownloadTimeout || 1500)
            }

        });
    }
    isAppInstalled(){
        var self = this;
        return android.isAppInstalled(GameData.packageName,+GameData.appVC,true);
    }
    checkDownloadStatus(progress){
        var self = this;
        if(progress == self.currDownloadProgress || progress == "暂停" || progress == "继续"){  //浏览器、主题美化、应用商店
            dialog.alert('好像下载出了问题，请去检查一下','');
        }
        clearTimeout(self.checkDownloadProgressTimer);
    }
    checkNetWorkStatus(fn){
        let self = this;
        if(carrier=='a'){
            return fn&&fn();
        }
        var status = android.getNetworkType();
        switch (status){
            case 0:
                dialog.alert('您的网络好像出了问题，请检查网络连接情况后重试。','');
                break;
            case 1:
                fn&&fn();
                break;
            case 2:
                dialog.confirm({
                    title:'温馨提示',
                    content:'你正在使用移动网络，是否确定继续下载？',
                    okCallback(){
                        fn&&fn();
                    },
                    cancelCallback(){},
                    sureStr:'继续下载',
                    cancelStr:'取消',
                    useBackground:false
                });
                break;
            default:
                fn&&fn();
                break;
        }
    }
    addEventListener4InstallApp(){
        let self = this, game = this.game, context = this.context;
        android.removeListener('notifyProgress');
        android.addListener('','notifyProgress',(el,downloadProgress)=>{
            console.log('notifyProgress',downloadProgress);
            let installType = downloadProgress.type || 1;
            if(downloadProgress.pkg==GameData.packageName){
                switch (downloadProgress.btnStatus) {
                    case 'installCompleteStatus':
                        GameData.downloadEndTime = Date.now();
                        stat.doFlow({action:'install_status_web',status:1,type:installType});
                        stat.doFlow({action:'install_time',ins_time:GameData.downloadEndTime-GameData.downloadStartTime});
                        currDownloadProgress = '已安装';
                        $('#app_progress').text('已安装');
                        //context.iconText2.setText('已安装');
                        if(context.btnText) {
                            context.btnText.frameName = 'turnToLottery.png';
                            context.btn.alpha = 1;
                        }
                        console.log(context.name+' in installComplete');
                        if(!GameData.buttonAddedToFooter){
                            context.setOverStatus.call(context);
                        }
                        break;
                    case 'pauseInstallStatus':  //主题美化
                        currDownloadProgress = '暂停中';
                        $('#app_progress').text('暂停中');
                        //context.iconText2.setText('暂停中');
                        break;
                    case 'downloadingStatus':
                        currDownloadProgress = self.currDownloadProgress = downloadProgress.btnText;
                        self.alreadyStartDownload = true;
                        clearTimeout(self.checkDownloadTimer);
                        $('#app_progress').text('下载中 '+downloadProgress.btnText);
                        //context.iconText2.setText('下载中 '+downloadProgress.btnText);
                        if(self.checkDownloadProgressTimer){
                            clearTimeout(self.checkDownloadProgressTimer);
                            self.checkDownloadProgressTimer = null;
                        }
                        self.checkDownloadProgressTimer = setTimeout(()=>{
                            self.checkDownloadStatus.call(self,downloadProgress.btnText);
                        },self.downloadingTimeout||30000);
                        break;
                    case 'startInstallStatus':
                        if(self.checkDownloadProgressTimer){
                            clearTimeout(self.checkDownloadProgressTimer);
                            self.checkDownloadProgressTimer = null;
                        }
                        currDownloadProgress = '正在安装';
                        console.log(context.name);
                        $('#app_progress').text('正在安装');
                        //context.iconText2.setText('正在安装');
                        break;
                    case 'installFailureStatus':  //失败 TODO
                        currDownloadProgress = '安装失败';
                        //context.iconText2.setText('安装失败');
                        $('#app_progress').text('安装失败');
                        stat.doFlow({action:'install_status_web',status:0,type:installType});
                        break;
                    default:
                        break;
                }
            }
        });
    }
}

function notifyActivityState(activityState){
    console.log(activityState);
}

Native.getInstance = function(game,context){
    if(!Native._instance) Native._instance = new Native(game,context);
    if(game) Native._instance.game = game;
    if(context) Native._instance.context = context;
    return Native._instance;
};

module.exports = Native;
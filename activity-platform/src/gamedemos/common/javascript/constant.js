import domUtils from './dom.js';

export default {
  campaignId: domUtils.getUrlParam('campaignId') || 0,
  TURN_TO: domUtils.getUrlParam('turnTo'),
  pkgSize: domUtils.getUrlParam('pkgSize') + 'MB',
  startBtnStr: '确定',
  gameContainer: '.activity-game', //点击福利下载后需要滚动到的游戏区域
  totalDrawTime: 1
}
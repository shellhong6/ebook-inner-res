
const worldHeight = 994;

module.exports = {
      startBtnStr: '开始夺奖',
      APP_NAME: '土豆视频',
      totalDrawTime: 3, //总抽奖次数
      resourceMain: 'resMain',
      menuMain: 'menuMain',
      readyMain: 'readygo',
      explodeMain: 'explode',
      background: 'background',
      beginScene: 'beginscene',
      baseImgContext: 'static/imgs/cutfruit/',
      worldWidth: 1080,
      worldHeight: worldHeight,
      maxFruitCount: 4, //最大可同时出现的水果数量
      startBombTime: 6,//游戏开始后多少秒之后开始出现炸弹
      emitBombInterval: 2, //间隔多少秒产生一个炸弹
      fruitProps: {
        maxHeight: (worldHeight - 150) * 0.7, //水果升上去的最大距离
        minHeight: (worldHeight - 150) * 0.4, //水果升上去的最小距离
        yAcceleration: 100, //水果垂直方向加速度
        maxXSpeed: 200,//水平方向最大速度
        gravityY: 2000, //水果所受的重力
        juiceColor:['#fdb32b', '#fdb32b'],
        throwBottom: 150 //水果离地面开始上抛距离
      },
      endTime: 20000,//游戏最短结束时间: ms
      btnTop: 698,
      counterLeft: 45,
      counterTop: 11,
      doc:{
        appPromo: '土豆视频-新鲜有趣',
        suspend: '抽奖机会+3',
        startUp:['点击安装土豆视频APP并开始游戏，分数越高中奖概率越高哦！','点击获取游戏机会，分数越高中奖概率越高哦！'],
        playing: '快切那些土豆，小心炸弹哦，分数越高中奖概率越高！',
        openStatus: '点击打开土豆视频APP，返回活动抽奖机会+3次哦~',
        readyFail: '要先点击“开始夺奖”下载土豆视频APP才能切土豆哦~'
      },
      menuFrame:{
        gameOver: 'gooverwd.png',
        beginStatus: 'beginword.png', //菜单状态的按钮文案图片
        openStatus: 'openwd.png',
        seeResultStatus: 'lotterywd.png',
        seeResultAgainStatus: 'againwd.png'
      },
      fruitTypes:[
        {name: 'apple', sliceAngle: 180, scope: 1},
        {name: 'banana', sliceAngle: 180, scope: 1},
        {name: 'basaha', sliceAngle: 180, scope: 1},
        {name: 'bomb', scope: -3}
      ],
      cache: {
        juiceCount: 0
      },
      openStateTips:{
        withScope: function(val){
          return `太棒啦！你成功收获了<span class="spec-count">${val}</span>个土豆~`
        },
        noScope: '分数为0哦，一定是切到了西北风，快去获取抽奖机会吧~'
      },
      isInstall: true
    }

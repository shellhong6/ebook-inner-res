
module.exports = {
      startBtnStr: '开始游戏',
      APP_NAME: '手机京东',
      totalDrawTime: 3, //总抽奖次数
      breakoutMain: 'breakout',
      starfieldMain: 'starfield',
      brickWidth: 41,
      brickHeight: 29,
      worldWidth: 1080,
      worldHeight: 1010,
      ballSpeed: 800,
      ballPosPaddleTopFactor: 43, // 调整球在木板上的top值
      paddleTop: 140,
      wordTop: 110, //砖块在游戏内的top值
      wordSpace: 83,
      specBrickPos:[
        {
          0: {0: 1, 5: 1},
          9: {0: 1, 5: 1}
        },
        {
          1: {0: 1, 1: 1},
          9: {0: 1, 1: 1}
        },
        {
          0: {0: 1, 5: 1},
          9: {0: 1, 5: 1}
        }
      ],
      //bound: 球的有效运动区域
      borderdBound: 90,
      boundTop: 25,
      boundTopBottom: 80,
      btnTop: 578,
      counterLeft: 123,
      counterTop: 11,
      doc:{
        suspend: '抽奖机会+3',
        startUp:[' 点“开始游戏”安装手机京东APP，618打破底价抽大奖！','点“开始游戏”获取游戏机会，618打破底价抽大奖！'],
        playing: '移动接球，打掉砖块越多中奖概率越高哦！',
        playAgain: '已打掉全部砖块，再来一局吧，安装完成即可抽奖！',
        open: '点击打开手机京东APP，返回活动抽奖机会+3哦~',
        gameOver: '不止5折，立抢»'
      }
    }

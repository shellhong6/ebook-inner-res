const demoCoverImg = 'illustrate@2x.png';

export default [
  {
    title: '打砖块',
    img: `/breakout/${demoCoverImg}`,
    name: 'breakout/',
    component: () => import('@/gamedemos/breakout_clone/index')
  },
  {
    title: '切水果',
    img: `/cutfruit/${demoCoverImg}`,
    component: () => import('@/gamedemos/cutfruit/index')
  },
  {
    title: '接东西',
    img: `/receiveSth/${demoCoverImg}`,
    component: () => import('@/gamedemos/receiveSth/index')
  },
  {
    title: '打飞机',
    img: `/plane/${demoCoverImg}`,
    component: () => import('@/gamedemos/plane/index')
  },
  {
    title: '摆姿势',
    img: `/pose/${demoCoverImg}`,
    component: () => import('@/gamedemos/pose/index.vue')
  },
  {
    title: '喂竹子',
    img: `/feedBamboo/${demoCoverImg}`,
    component: () => import('@/gamedemos/feedBamboo/index.vue')
  }
]
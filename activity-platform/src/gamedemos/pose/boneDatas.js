const T = ''
export default {
  boneNames: [
    ['larm', 'lhand'],
    ['rarm', 'rhand'],
    ['lleg', 'lfoot'],
    ['rleg', 'rfoot']
  ],
  man: [{
    bodyUrl: T + "cloth.png",
    bodyPosition: {
      x: 88,
      y: 162
    },
    bodyImgPosition: {
      x: 0,
      y: 0
    },
    headUrl: T + "head.png",
    headPosition: {
      x: 10,
      y: -150
    },
    facingTo: 0,
    part: [
      [T + "left_arm.png", T + "left_hand.png"],
      [T + "right_arm.png", T + "right_hand.png"],
      [T + "left_leg.png", T + "left_foot.png"],
      [T + "right_leg.png", T + "right_foot.png"]
    ],
    globalPosition: {
      x: 420,
      y: 250
    },
    bones: [{
      bone1: {
        name: 'larm',
        position: {
          x: 47,
          y: 256
        },
        pivot: {
          x: 68,
          y: 20
        },
        rotation: 0
      },
      bone2: {
        name: 'lhand',
        position: {
          x: -42,
          y: 116
        },
        pivot: {
          x: 68,
          y: 21
        },
        rotation: 0
      },
      end: {
        position: {
          x: 27,
          y: 120
        }
      }
    }, {
      bone1: {
        name: 'rarm',
        position: {
          x: 241,
          y: 256
        },
        pivot: {
          x: 22,
          y: 21
        },
        rotation: 0
      },
      bone2: {
        name: 'rhand',
        position: {
          x: 40,
          y: 116
        },
        pivot: {
          x: 25,
          y: 21
        },
        rotation: 0
      },
      end: {
        position: {
          x: 50,
          y: 111
        }
      }
    }, {
      bone1: {
        name: 'lleg',
        position: {
          x: 96,
          y: 490
        },
        pivot: {
          x: 43,
          y: 38
        },
        rotation: 0
      },
      bone2: {
        name: 'lfoot',
        position: {
          x: -3,
          y: 188
        },
        pivot: {
          x: 48,
          y: 37
        },
        rotation: 0
      },
      end: {
        position: {
          x: 45,
          y: 297
        }
      }
    }, {
      bone1: {
        name: 'rleg',
        position: {
          x: 199,
          y: 490
        },
        pivot: {
          x: 40,
          y: 39
        },
        rotation: 0
      },
      bone2: {
        name: 'rfoot',
        position: {
          x: -10,
          y: 188
        },
        pivot: {
          x: 48,
          y: 37
        },
        rotation: 0
      },
      end: {
        position: {
          x: 45,
          y: 297
        }
      }
    }]
  }, {
    bodyUrl: T + "body.png",
    bodyPosition: {
      x: 202,
      y: 136
    },
    bodyImgPosition: {
      x: 0,
      y: 0
    },
    headUrl: T + "head.png",
    headPosition: {
      x: -38,
      y: -132
    },
    facingTo: 2,
    part: [
      [T + "after_arm.png", T + "after_hand.png", 'right-after_hand.png'],
      [T + "before_arm.png", T + "before_hand.png"],
      [T + "after_leg.png", T + "after_foot.png"],
      [T + "before_leg.png", T + "before_foot.png"]
    ],
    globalPosition: {
      x: 220,
      y: 250
    },
    bones: [{
      bone1: {
        name: 'larm',
        position: {
          x: 127,
          y: 231
        },
        pivot: {
          x: 145,
          y: 20
        },
        rotation: 0
      },
      bone2: {
        name: 'lhand',
        position: {
          x: -127,
          y: 63
        },
        pivot: {
          x: 153,
          y: 24
        },
        rotation: 0
      },
      end: {
        position: {
          x: 49,
          y: 88
        }
      }
    }, {
      bone1: {
        name: 'rarm',
        position: {
          x: 251,
          y: 231
        },
        pivot: {
          x: 20,
          y: 20
        },
        rotation: 0
      },
      bone2: {
        name: 'rhand',
        position: {
          x: 109,
          y: 71
        },
        pivot: {
          x: 22,
          y: 22
        },
        rotation: 0
      },
      end: {
        position: {
          x: 121,
          y: 86
        }
      }
    }, {
      bone1: {
        name: 'lleg',
        position: {
          x: 235,
          y: 462
        },
        pivot: {
          x: 52,
          y: 47
        },
        rotation: 0
      },
      bone2: {
        name: 'lfoot',
        position: {
          x: 42,
          y: 189
        },
        pivot: {
          x: 36,
          y: 37
        },
        rotation: 0
      },
      end: {
        position: {
          x: 73,
          y: 304
        }
      }
    }, {
      bone1: {
        name: 'rleg',
        position: {
          x: 183,
          y: 462
        },
        pivot: {
          x: 104,
          y: 47
        },
        rotation: 0
      },
      bone2: {
        name: 'rfoot',
        position: {
          x: -134,
          y: 178
        },
        pivot: {
          x: 171,
          y: 37
        },
        rotation: 0
      },
      end: {
        position: {
          x: 65,
          y: 288
        }
      }
    }]
  }, {}, {
    bodyUrl: T + "body.png",
    bodyPosition: {
      x: 90,
      y: 157
    },
    bodyImgPosition: {
      x: 0,
      y: 0
    },
    headUrl: T + "head.png",
    headPosition: {
      x: 0,
      y: -150
    },
    facingTo: 0,
    part: [
      [T + "left_arm.png", T + "left_hand.png"],
      [T + "right_arm.png", T + "right_hand.png"],
      [T + "left_leg.png", T + "left_foot.png"],
      [T + "right_leg.png", T + "right_foot.png"]
    ],
    globalPosition: {
      x: 420,
      y: 250
    },
    bones: [{
      bone1: {
        name: 'larm',
        position: {
          x: 44,
          y: 250
        },
        pivot: {
          x: 67,
          y: 25
        },
        rotation: 1
      },
      bone2: {
        name: 'lhand',
        position: {
          x: -44,
          y: 119
        },
        pivot: {
          x: 68,
          y: 24
        },
        rotation: 0
      },
      end: {
        position: {
          x: 27,
          y: 120
        }
      }
    }, {
      bone1: {
        name: 'rarm',
        position: {
          x: 238,
          y: 250
        },
        pivot: {
          x: 25,
          y: 25
        },
        rotation: -1
      },
      bone2: {
        name: 'rhand',
        position: {
          x: 43,
          y: 119
        },
        pivot: {
          x: 24,
          y: 23
        },
        rotation: 0
      },
      end: {
        position: {
          x: 50,
          y: 111
        }
      }
    }, {
      bone1: {
        name: 'lleg',
        position: {
          x: 94,
          y: 484
        },
        pivot: {
          x: 42,
          y: 42
        },
        rotation: 0
      },
      bone2: {
        name: 'lfoot',
        position: {
          x: -2,
          y: 197
        },
        pivot: {
          x: 49,
          y: 34
        },
        rotation: 0
      },
      end: {
        position: {
          x: 45,
          y: 297
        }
      }
    }, {
      bone1: {
        name: 'rleg',
        position: {
          x: 196,
          y: 484
        },
        pivot: {
          x: 42,
          y: 42
        },
        rotation: 0
      },
      bone2: {
        name: 'rfoot',
        position: {
          x: -10,
          y: 197
        },
        pivot: {
          x: 47,
          y: 33
        },
        rotation: 0
      },
      end: {
        position: {
          x: 45,
          y: 297
        }
      }
    }]
  }],
  girl: [{
      bodyUrl: T + "body.png",
      bodyPosition: {
        x: 83,
        y: 167
      },
      bodyImgPosition: {
        x: 0,
        y: 0
      },
      headUrl: T + "head.png",
      headPosition: {
        x: 23,
        y: -114
      },
      facingTo: 0,
      part: [
        [T + "left_arm.png", T + "left_hand.png"],
        [T + "right_arm.png", T + "right_hand.png"],
        [T + "left_leg.png", T + "left_foot.png"],
        [T + "right_leg.png", T + "right_foot.png"]
      ],
      globalPosition: {
        x: 220,
        y: 250
      },
      bones: [{
        bone1: {
          name: 'larm',
          position: {
            x: 42,
            y: 261
          },
          pivot: {
            x: 65,
            y: 19
          },
          rotation: 0
        },
        bone2: {
          name: 'lhand',
          position: {
            x: -40,
            y: 113
          },
          pivot: {
            x: 65,
            y: 20
          },
          rotation: 0
        },
        end: {
          position: {
            x: 20,
            y: 120
          }
        }
      }, {
        bone1: {
          name: 'rarm',
          position: {
            x: 229,
            y: 260
          },
          pivot: {
            x: 21,
            y: 19
          },
          rotation: 0
        },
        bone2: {
          name: 'rhand',
          position: {
            x: 40,
            y: 113
          },
          pivot: {
            x: 23,
            y: 18
          },
          rotation: 0
        },
        end: {
          position: {
            x: 50,
            y: 111
          }
        }
      }, {
        bone1: {
          name: 'lleg',
          position: {
            x: 90,
            y: 482
          },
          pivot: {
            x: 40,
            y: 36
          },
          rotation: 0
        },
        bone2: {
          name: 'lfoot',
          position: {
            x: -2,
            y: 180
          },
          pivot: {
            x: 46,
            y: 35
          },
          rotation: 0
        },
        end: {
          position: {
            x: 45,
            y: 297
          }
        }
      }, {
        bone1: {
          name: 'rleg',
          position: {
            x: 187,
            y: 482
          },
          pivot: {
            x: 40,
            y: 36
          },
          rotation: 0
        },
        bone2: {
          name: 'rfoot',
          position: {
            x: -10,
            y: 180
          },
          pivot: {
            x: 46,
            y: 35
          },
          rotation: 0
        },
        end: {
          position: {
            x: 45,
            y: 297
          }
        }
      }]
    }, {
      bodyUrl: T + "body.png",
      bodyPosition: {
        x: 170,
        y: 132
      },
      bodyImgPosition: {
        x: 0,
        y: 0
      },
      headUrl: T + "head.png",
      headPosition: {
        x: -7,
        y: -132
      },
      facingTo: 2,
      part: [
        [T + "after_arm.png", T + "after_hand.png", 'right-after_hand.png'],
        [T + "before_arm.png", T + "before_hand.png"],
        [T + "after_leg.png", T + "after_foot.png"],
        [T + "before_leg.png", T + "before_foot.png"]
      ],
      globalPosition: {
        x: 220,
        y: 250
      },
      bones: [{
        bone1: {
          name: 'larm',
          position: {
            x: 130,
            y: 220
          },
          pivot: {
            x: 134,
            y: 21
          },
          rotation: 0
        },
        bone2: {
          name: 'lhand',
          position: {
            x: -124,
            y: 61
          },
          pivot: {
            x: 148,
            y: 22
          },
          rotation: 0
        },
        end: {
          position: {
            x: 46,
            y: 86
          }
        }
      }, {
        bone1: {
          name: 'rarm',
          position: {
            x: 242,
            y: 220
          },
          pivot: {
            x: 22,
            y: 21
          },
          rotation: 0
        },
        bone2: {
          name: 'rhand',
          position: {
            x: 108,
            y: 70
          },
          pivot: {
            x: 21,
            y: 21
          },
          rotation: 0
        },
        end: {
          position: {
            x: 113,
            y: 81
          }
        }
      }, {
        bone1: {
          name: 'lleg',
          position: {
            x: 228,
            y: 442
          },
          pivot: {
            x: 50,
            y: 45
          },
          rotation: 0
        },
        bone2: {
          name: 'lfoot',
          position: {
            x: 40,
            y: 180
          },
          pivot: {
            x: 35,
            y: 35
          },
          rotation: 0
        },
        end: {
          position: {
            x: 68,
            y: 291
          }
        }
      }, {
        bone1: {
          name: 'rleg',
          position: {
            x: 179,
            y: 442
          },
          pivot: {
            x: 99,
            y: 45
          },
          rotation: 0
        },
        bone2: {
          name: 'rfoot',
          position: {
            x: -127,
            y: 170
          },
          pivot: {
            x: 162,
            y: 35
          },
          rotation: 0
        },
        end: {
          position: {
            x: 61,
            y: 274
          }
        }
      }]
    }, {},
    {
      bodyUrl: T + "body.png",
      bodyPosition: {
        x: 87,
        y: 121
      },
      bodyImgPosition: {
        x: 0,
        y: 0
      },
      headUrl: T + "head.png",
      headPosition: {
        x: 23,
        y: -114
      },
      facingTo: 0,
      part: [
        [T + "left_arm.png", T + "left_hand.png"],
        [T + "right_arm.png", T + "right_hand.png"],
        [T + "left_leg.png", T + "left_foot.png"],
        [T + "right_leg.png", T + "right_foot.png"]
      ],
      globalPosition: {
        x: 220,
        y: 250
      },
      bones: [{
        bone1: {
          name: 'larm',
          position: {
            x: 43,
            y: 210
          },
          pivot: {
            x: 63,
            y: 23
          },
          rotation: 1
        },
        bone2: {
          name: 'lhand',
          position: {
            x: -43,
            y: 113
          },
          pivot: {
            x: 65,
            y: 24
          },
          rotation: 0
        },
        end: {
          position: {
            x: 20,
            y: 120
          }
        }
      }, {
        bone1: {
          name: 'rarm',
          position: {
            x: 228,
            y: 210
          },
          pivot: {
            x: 24,
            y: 23
          },
          rotation: -1
        },
        bone2: {
          name: 'rhand',
          position: {
            x: 40,
            y: 113
          },
          pivot: {
            x: 24,
            y: 24
          },
          rotation: 0
        },
        end: {
          position: {
            x: 50,
            y: 111
          }
        }
      }, {
        bone1: {
          name: 'lleg',
          position: {
            x: 89,
            y: 432
          },
          pivot: {
            x: 40,
            y: 40
          },
          rotation: 0
        },
        bone2: {
          name: 'lfoot',
          position: {
            x: -2,
            y: 189
          },
          pivot: {
            x: 46,
            y: 31
          },
          rotation: 0
        },
        end: {
          position: {
            x: 45,
            y: 297
          }
        }
      }, {
        bone1: {
          name: 'rleg',
          position: {
            x: 187,
            y: 432
          },
          pivot: {
            x: 41,
            y: 41
          },
          rotation: 0
        },
        bone2: {
          name: 'rfoot',
          position: {
            x: -8,
            y: 189
          },
          pivot: {
            x: 45,
            y: 31
          },
          rotation: 0
        },
        end: {
          position: {
            x: 45,
            y: 297
          }
        }
      }]
    }
  ],
  manCloth: [
    [{
      clothUrl: T + "pants.png",
      clothPosition: {
        x: 0,
        y: 0
      },
      shoeUrls: [{
          url: 'left_shoe.png',
          x: 0,
          y: 265
        },
        {
          url: 'right_shoe.png',
          x: 0,
          y: 265
        }
      ],
      hairNo: 0,
      part: [
        0, 0, [T + "pants-left.png"],
        [T + "pants-right.png"]
      ],
      bones: [0, 0, {
        bone1: {
          position: {
            x: 0,
            y: -1
          }
        },
        bone2: {
          position: {
            x: -2,
            y: -1
          }
        }
      }, {
        bone1: {
          position: {
            x: -2,
            y: -1
          }
        },
        bone2: {
          position: {
            x: -2,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: -73,
        y: 40
      },
      shoeUrls: [{
          url: 'left_shoe.png',
          x: 0,
          y: 246
        },
        {
          url: 'right_shoe.png',
          x: 0,
          y: 246
        }
      ],
      hairNo: 1,
      part: [
        [T + "left_arm.png", T + "left_hand.png"],
        [T + "right_arm.png", T + "right_hand.png"],
        [T + "left_leg.png", T + "left_foot.png"],
        [T + "right_leg.png", T + "right_foot.png"]
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: -1,
            y: -1
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: -1,
            y: 1
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: -90,
        y: 51
      },
      cloak: {
        x: 20,
        y: 470,
        url: 'after-cloth.png'
      },
      shoeUrls: [{
          url: 'left_shoe.png',
          x: 0,
          y: 246
        },
        {
          url: 'right_shoe.png',
          x: 0,
          y: 246
        }
      ],
      hairNo: 6,
      part: [
        [T + "left_arm.png", T + "left_hand.png"],
        [T + "right_arm.png", T + "right_hand.png"],
        [T + "left_leg.png", T + "left_foot.png"],
        [T + "right_leg.png", T + "right_foot.png"]
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: -1,
            y: -1
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 1
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: 0,
        y: 0
      },
      cloak: {
        x: -98,
        y: 240,
        url: 'after-cloth.png'
      },
      shoeUrls: [{
          url: 'left_shoe.png',
          x: 0,
          y: 265
        },
        {
          url: 'right_shoe.png',
          x: 0,
          y: 265
        }
      ],
      hairNo: 2,
      part: [
        [T + "left_arm.png", T + "left_hand.png"],
        [T + "right_arm.png", T + "right_hand.png"],
        [T + "left_leg.png", T + "left_foot.png"],
        [T + "right_leg.png", T + "right_foot.png"]
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: -1,
        y: 58
      },
      shoeUrls: [{
          url: 'left_shoe.png',
          x: 0,
          y: 263
        },
        {
          url: 'right_shoe.png',
          x: 0,
          y: 263
        }
      ],
      hairNo: 3,
      part: [
        [T + "left_arm.png", T + "left_hand.png"],
        [T + "right_arm.png", T + "right_hand.png"],
        [T + "left_leg.png", T + "left_foot.png"],
        [T + "right_leg.png", T + "right_foot.png"]
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: -2,
            y: 0
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: 0,
        y: 0
      },
      shoeUrls: [{
          url: 'left_shoe.png',
          x: 0,
          y: 264
        },
        {
          url: 'right_shoe.png',
          x: 0,
          y: 264
        }
      ],
      hairNo: 0,
      part: [
        [T + "left_arm.png", T + "left_hand.png"],
        [T + "right_arm.png", T + "right_hand.png"],
        [T + "left_leg.png", T + "left_foot.png"],
        [T + "right_leg.png", T + "right_foot.png"]
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: -2,
            y: 1
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: -41,
        y: 63
      },
      shoeUrls: [{
          url: 'left_foot.png',
          x: 0,
          y: 0
        },
        {
          url: 'right_foot.png',
          x: 0,
          y: 0
        }
      ],
      hairNo: 4,
      part: [
        [T + "left_arm.png"],
        [T + "right_arm.png"],
        [T + "left-leg.png"],
        [T + "right-leg.png"]
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: 0,
          y: 5
        },
        shoeUrls: [{
            url: 'left_foot.png',
            x: 0,
            y: 0
          },
          {
            url: 'right_foot.png',
            x: 0,
            y: 0
          }
        ],
        hairNo: 5,
        bones: [0, 0, 0, 0]
    }],
    [{
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: 9,
        y: 293
      },
      shoeUrls: [{
          url: 'after_shoe.png',
          x: 0,
          y: 0
        },
        {
          url: 'before_shoe.png',
          x: 0,
          y: 0
        }
      ],
      hairNo: 0,
      part: [
        [],
        [],
        [T + "after-pants.png", 0],
        [T + "before-pants.png", 0]
      ],
      bones: [0, 0, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: -24,
        y: 56
      },
      mask: {
        url: "cloth.png",
        x: 178,
        y: 192
      },
      shoeUrls: [{
          url: 'after_foot.png',
          x: 0,
          y: 0
        },
        {
          url: 'before_foot.png',
          x: 0,
          y: 0
        }
      ],
      hairNo: 1,
      part: [
        [T + "after_arm.png", 'after_hand.png'],
        [T + "before_arm.png", 'before_hand.png'],
        ['after_leg.png', 'after_foot.png'],
        ['before_leg.png', 'before_foot.png']
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: -24,
        y: 45
      },
      shoeUrls: [{
          url: 'after_foot.png',
          x: 0,
          y: 0
        },
        {
          url: 'before_foot.png',
          x: 0,
          y: 0
        }
      ],
      mask: {
        url: "cloth.png",
        x: 178,
        y: 181
      },
      hairNo: 6,
      part: [
        [T + "after_arm.png", 'after_hand.png'],
        [T + "before_arm.png", 'before_hand.png'],
        ['after_leg.png'],
        ['before_leg.png']
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: 0,
        y: 54
      },
      shoeUrls: [{
          url: 'after_foot.png',
          x: 0,
          y: 0
        },
        {
          url: 'before_foot.png',
          x: 0,
          y: 0
        }
      ],
      hairNo: 2,
      part: [
        [T + "after_arm.png", 'after_hand.png'],
        [T + "before_arm.png", 'before_hand.png'],
        ['after_leg.png'],
        ['before_leg.png']
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: -23,
        y: 48
      },
      shoeUrls: [{
          url: 'after_foot.png',
          x: 0,
          y: 0
        },
        {
          url: 'before_foot.png',
          x: 0,
          y: 0
        }
      ],
      hairNo: 3,
      part: [
        [T + "after_arm.png", 'after_hand.png'],
        [T + "before_arm.png", 'before_hand.png'],
        ['after_leg.png'],
        ['before_leg.png']
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: -3,
        y: 48
      },
      shoeUrls: [{
          url: 'after_foot.png',
          x: 0,
          y: 0
        },
        {
          url: 'before_foot.png',
          x: 0,
          y: 0
        }
      ],
      hairNo: 0,
      part: [
        [T + "after_arm.png", 'after_hand.png'],
        [T + "before_arm.png", 'before_hand.png'],
        ['after_leg.png'],
        ['before_leg.png']
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: -43,
        y: 60
      },
      shoeUrls: [{
          url: 'after_foot.png',
          x: 0,
          y: 0
        },
        {
          url: 'before_foot.png',
          x: 0,
          y: 0
        }
      ],
      hairNo: 4,
      part: [
        [T + "after_arm.png"],
        [T + "before_arm.png"],
        [],
        ['before_leg.png']
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {

      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: 0,
          y: 5
        },
        shoeUrls: [{
            url: 'after_foot.png',
            x: 0,
            y: 0
          },
          {
            url: 'before_foot.png',
            x: 0,
            y: 0
          }
        ],
        hairNo: 5,
        part: [
          [],
          [],
          [],
          ['before_leg.png']
        ],
        bones: [0,0,0,{
          bone1: {
            position: {
              x: 19,
              y: 0
            }
          }
        }]
    }],
    [],
    [{
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: 0,
        y: 0
      },
      shoeUrls: [{
          url: 'left_shoe.png',
          x: 0,
          y: 272
        },
        {
          url: 'right_shoe.png',
          x: 0,
          y: 272
        }
      ],
      hairNo: 0,
      part: [
        [],
        [],
        [T + "pants-left.png", 0],
        [T + "pants-right.png", 0]
      ],
      bones: [0, 0, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: -76,
        y: 34
      },
      shoeUrls: [{
          url: 'left_shoe.png',
          x: 0,
          y: 246
        },
        {
          url: 'right_shoe.png',
          x: 0,
          y: 246
        }
      ],
      hairNo: 1,
      part: [
        [T + "left_arm.png", T + "left_hand.png"],
        [T + "right_arm.png", T + "right_hand.png"],
        [T + "left_leg.png", T + "left_foot.png"],
        [T + "right_leg.png", T + "right_foot.png"]
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: -90,
        y: 47
      },
      shoeUrls: [{
          url: 'left_shoe.png',
          x: 0,
          y: 236
        },
        {
          url: 'right_shoe.png',
          x: 0,
          y: 236
        }
      ],
      hairNo: 6,
      part: [
        [T + "left_arm.png", T + "left_hand.png"],
        [T + "right_arm.png", T + "right_hand.png"],
        [T + "left_leg.png", T + "left_foot.png"],
        [T + "right_leg.png", T + "right_foot.png"]
      ],
      bones: [{
        bone1: {
          position: {
            x: -1,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 1
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: -190,
        y: 68
      },
      shoeUrls: [{
          url: 'left_shoe.png',
          x: 0,
          y: 272
        },
        {
          url: 'right_shoe.png',
          x: 0,
          y: 272
        }
      ],
      hairNo: 2,
      part: [
        [T + "left_arm.png", T + "left_hand.png"],
        [T + "right_arm.png", T + "right_hand.png"],
        [T + "left_leg.png", T + "left_foot.png"],
        [T + "right_leg.png", T + "right_foot.png"]
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 1,
            y: 1
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 1,
            y: 1
          }
        },
        bone2: {
          position: {
            x: 13,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 1,
            y: 1
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: -1,
        y: 58
      },
      shoeUrls: [{
          url: 'left_shoe.png',
          x: 0,
          y: 277
        },
        {
          url: 'right_shoe.png',
          x: 0,
          y: 277
        }
      ],
      hairNo: 3,
      part: [
        [T + "left_arm.png", T + "left_hand.png"],
        [T + "right_arm.png", T + "right_hand.png"],
        [T + "left_leg.png", T + "left_foot.png"],
        [T + "right_leg.png", T + "right_foot.png"]
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: -2,
        y: 58
      },
      shoeUrls: [{
          url: 'left_shoe.png',
          x: 0,
          y: 270
        },
        {
          url: 'right_shoe.png',
          x: 0,
          y: 270
        }
      ],
      hairNo: 0,
      part: [
        [T + "left_arm.png", T + "left_hand.png"],
        [T + "right_arm.png", T + "right_hand.png"],
        [T + "left_leg.png", T + "left_foot.png"],
        [T + "right_leg.png", T + "right_foot.png"]
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: -45,
        y: 67
      },
      shoeUrls: [{
          url: 'left_foot.png',
          x: 0,
          y: 0
        },
        {
          url: 'right_foot.png',
          x: 0,
          y: 0
        }
      ],
      hairNo: 4,
      part: [
        ["left_arm.png"],
        ["right_arm.png"],
        [],
        []
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
      }, {}]
    }, {
        clothUrl: "cloth.png",
        clothPosition: {
          x: 0,
          y: 5
        },
        shoeUrls: [{
            url: 'left_foot.png',
            x: 0,
            y: 0
          },
          {
            url: 'right_foot.png',
            x: 0,
            y: 0
          }
        ],
        hairNo: 5,
        part: [
          [],
          [],
          [],
          []
        ],
        bones: [0,0,0,0]
    }]
  ],
  manHair: [
    [{
        url: 'hair.png',
        x: 10,
        y: -14
      },
      {
        url: 'hair1.png',
        x: 5,
        y: -55
      },
      {
        url: 'hair2.png',
        x: 0,
        y: -15
      },
      {
        url: 'hair3.png',
        x: 9,
        y: -30
      },
      {
        url: 'hair4.png',
        x: 13,
        y: -12,
        other: {
          url: 'after-hair4.png',
          x: 140,
          y: -35
        }
      },
      {
        url: 'hair5.png',
        x: -60,
        y: -20
      },
      {
        url: 'hair.png',
        x: -30,
        y: -57,
        other: {
          url: 'after-hair.png',
          x: 90,
          y: 53
        }
      }
    ],
    [{
        url: 'hair.png',
        x: 12,
        y: -18
      },
      {
        url: 'hair1.png',
        x: 12,
        y: -25
      },
      {
        url: 'hair2.png',
        x: 10,
        y: -20
      },
      {
        url: 'hair3.png',
        x: -27,
        y: -31,
        face2:{
          url: 'hair7.png',
          x: -32,
          y: -50
        }
      },
      {
        url: 'hair4.png',
        x: 10,
        y: -10
      },
      {
        url: 'hair5.png',
        x: 8,
        y: -18
      },
      {
        url: 'hair6.png',
        x: 0,
        y: -37
      }
    ],
    [],
    [{
        url: 'hair.png',
        x: 10,
        y: -10
      },
      {
        url: 'hair1.png',
        x: 11,
        y: -42
      },
      {
        url: 'hair2.png',
        x: 0,
        y: -25
      },
      {
        url: 'hair3.png',
        x: -7,
        y: -33
      },
      {
        url: 'hair4.png',
        x: -6,
        y: -20
      },
      {
        url: 'hair5.png',
        x: -52,
        y: -8
      },
      {
        url: 'hair6.png',
        x: -20,
        y: -55
      }
    ]
  ],
  girlCloth: [
    [{
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: 6,
          y: 69
        },
        shoeUrls: [{
            url: 'left_shoe.png',
            x: 0,
            y: 255
          },
          {
            url: 'right_shoe.png',
            x: 0,
            y: 255
          }
        ],
        hairNo: 0,
        part: [
          [],
          [],
          [T + "cl_left_leg.png", 0],
          [T + "cl_right_leg.png", 0]
        ],
        bones: [0, 0, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          }
        }]
      }, {
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: -40,
          y: 62
        },
        shoeUrls: [{
            url: 'left_foot.png',
            x: 0,
            y: 0
          },
          {
            url: 'right_foot.png',
            x: 0,
            y: 0
          }
        ],
        hairNo: 2,
        part: [
          [T + "left_arm.png"],
          [T + "right_arm.png"],
          ["left_leg.png"],
          ["right_leg.png"]
        ],
        bones: [{
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          }
        }]
      }, {
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: -40,
          y: 62
        },
        cloak: {
          x: -115,
          y: 230,
          url: 'cloak.png'
        },
        // mask: {
        //   x: 44,
        //   y: 420,
        //   url: 'dress.png'
        // },
        shoeUrls: [{
            url: 'left_shoe.png',
            x: 2,
            y: 70
          },
          {
            url: 'right_shoe.png',
            x: 0,
            y: 70
          }
        ],
        hairNo: 5,
        part: [
          ["left_arm.png", "left_hand.png"],
          ["right_arm.png", "right_hand.png"],
          ["left_leg.png"],
          ["right_leg.png"]
        ],
        bones: [{
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: -1,
              y: -2
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          }
        }]
      }, {
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: -2,
          y: 57
        },
        shoeUrls: [{
            url: 'left_shoe.png',
            x: 0,
            y: 254
          },
          {
            url: 'right_shoe.png',
            x: 0,
            y: 254
          }
        ],
        hairNo: 0,
        part: [
          [T + "left_arm.png", T + "left_hand.png"],
          [T + "right_arm.png", T + "right_hand.png"],
          [T + "left_leg.png", T + "left_foot.png"],
          [T + "right_leg.png", T + "right_foot.png"]
        ],
        bones: [{
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 14,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: -1,
              y: -1
            }
          },
          bone2: {
            position: {
              x: -1,
              y: -1
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: -11
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }]
      }, {
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: 0,
          y: 57
        },
        shoeUrls: [{
            url: 'left_shoe.png',
            x: 0,
            y: 254
          },
          {
            url: 'right_shoe.png',
            x: 0,
            y: 254
          }
        ],
        hairNo: 0,
        part: [
          [T + "left_arm.png", T + "left_hand.png"],
          [T + "right_arm.png", T + "right_hand.png"],
          [T + "left_leg.png", T + "left_foot.png"],
          [T + "right_leg.png", T + "right_foot.png"]
        ],
        bones: [{
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: -1,
              y: -1
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 1
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }]
      },
      {
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: 10,
          y: 57
        },
        shoeUrls: [{
            url: 'left_shoe.png',
            x: 0,
            y: 255
          },
          {
            url: 'right_shoe.png',
            x: 0,
            y: 255
          }
        ],
        hairNo: 2,
        bones: [0, 0, 0, 0]
      }, {
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: -85,
          y: 48
        },
        cloak: {
          x: 0,
          y: 440,
          url: 'after-cloth.png'
        },
        shoeUrls: [{
            url: 'left_shoe.png',
            x: 0,
            y: 236
          },
          {
            url: 'right_shoe.png',
            x: 0,
            y: 236
          }
        ],
        hairNo: 6,
        part: [
          [T + "left_arm.png", T + "left_hand.png"],
          [T + "right_arm.png", T + "right_hand.png"],
          [T + "left_leg.png", T + "left_foot.png"],
          [T + "right_leg.png", T + "right_foot.png"]
        ],
        bones: [{
          bone1: {
            position: {
              x: -1,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: -1,
              y: -1
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 1
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }]
      }, {
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: -85,
          y: 40
        },
        shoeUrls: [{
            url: 'left_shoe.png',
            x: 0,
            y: 235
          },
          {
            url: 'right_shoe.png',
            x: 0,
            y: 235
          }
        ],
        hairNo: 4,
        part: [
          [T + "left_arm.png", T + "left_hand.png"],
          [T + "right_arm.png", T + "right_hand.png"],
          [T + "left_leg.png", T + "left_foot.png"],
          [T + "right_leg.png", T + "right_foot.png"]
        ],
        bones: [{
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: -1,
              y: -1
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 1
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }]
      }
    ],
    [{
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: 0,
        y: 0
      },
      shoeUrls: [{
          url: 'after_shoe.png',
          x: 0,
          y: 0
        },
        {
          url: 'before_shoe.png',
          x: 0,
          y: 0
        }
      ],
      hairNo: 0,
      part: [
        [],
        [],
        [T + "after-pants.png", 0],
        [T + "before-pants.png", 0]
      ],
      bones: [0, 0, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "body.png",
      clothPosition: {
        x: -14,
        y: 55
      },
      shoeUrls: [{
          url: 'after_foot.png',
          x: 0,
          y: 0
        },
        {
          url: 'before_foot.png',
          x: 0,
          y: 0
        }
      ],
      hairNo: 2,
      part: [
        [T + "after_arm.png"],
        [T + "before_arm.png"],
        [],
        ['before_leg.png']
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 12,
            y: -1
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }, 0, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "body.png",
      clothPosition: {
        x: -20,
        y: 50
      },
      shoeUrls: [{
          url: 'after_foot.png',
          x: 0,
          y: 0
        },
        {
          url: 'before_foot.png',
          x: 0,
          y: 0
        }
      ],
      hairNo: 5,
      part: [
        [T + "after_arm.png", 'after_hand.png'],
        [T + "before_arm.png", 'before_hand.png'],
        [],
        ['before_leg.png']
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 1
          }
        }
      }, 0, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "body.png",
      clothPosition: {
        x: -1,
        y: 48
      },
      shoeUrls: [{
          url: 'after_foot.png',
          x: 0,
          y: 0
        },
        {
          url: 'before_foot.png',
          x: 0,
          y: 0
        }
      ],
      hairNo: 3,
      part: [
        ["after_arm.png", 'after_hand.png'],
        ["before_arm.png", 'before_hand.png'],
        ['after_leg.png'],
        ['before_leg.png']
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 1
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "body.png",
      clothPosition: {
        x: -2,
        y: 48
      },
      shoeUrls: [{
          url: 'after_foot.png',
          x: 0,
          y: 0
        },
        {
          url: 'before_foot.png',
          x: 0,
          y: 0
        }
      ],
      hairNo: 0,
      part: [
        [T + "after_arm.png", 'after_hand.png'],
        [T + "before_arm.png", 'before_hand.png'],
        ['after_leg.png'],
        ['before_leg.png']
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 1
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "body.png",
      clothPosition: {
        x: 0,
        y: 0
      },
      shoeUrls: [{
          url: 'after_shoe.png',
          x: 0,
          y: 0
        },
        {
          url: 'before_shoe.png',
          x: 0,
          y: 0
        }
      ],
      hairNo: 1,
      part: [
        [],
        [],
        [],
        ['before_leg.png']
      ],
      bones: [0, 0, 0, {
        bone1: {
          position: {
            x: 18,
            y: 0
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: -1,
        y: 48
      },
      mask: {
        url: "cloth.png",
        x: 169,
        y: 180
      },
      shoeUrls: [{
          url: 'after_foot.png',
          x: 0,
          y: 0
        },
        {
          url: 'before_foot.png',
          x: 0,
          y: 0
        }
      ],
      hairNo: 6,
      part: [
        [T + "after_arm.png", 'after_hand.png'],
        [T + "before_arm.png", 'before_hand.png'],
        ['after_leg.png', 'after_foot.png'],
        ['before_leg.png', 'before_foot.png']
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 1
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }]
    }, {
      clothUrl: T + "cloth.png",
      clothPosition: {
        x: -1,
        y: 48
      },
      mask: {
        url: "cloth.png",
        x: 169,
        y: 180
      },
      shoeUrls: [{
          url: 'after_foot.png',
          x: 0,
          y: 0
        },
        {
          url: 'before_foot.png',
          x: 0,
          y: 0
        }
      ],
      hairNo: 4,
      part: [
        [T + "after_arm.png", 'after_hand.png'],
        [T + "before_arm.png", 'before_hand.png'],
        ['after_leg.png', 'after_foot.png'],
        ['before_leg.png', 'before_foot.png']
      ],
      bones: [{
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: 0,
            y: 0
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }, {
        bone1: {
          position: {
            x: 0,
            y: 0
          }
        },
        bone2: {
          position: {
            x: -1,
            y: -2
          }
        }
      }]
    }],
    [],
    [{
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: 0,
          y: 0
        },
        shoeUrls: [{
            url: 'left_shoe.png',
            x: 0,
            y: 257
          },
          {
            url: 'right_shoe.png',
            x: 0,
            y: 257
          }
        ],
        hairNo: 0,
        part: [
          [],
          [],
          [T + "pants-left.png", 0],
          [T + "pants-right.png", 0]
        ],
        bones: [0, 0, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          }
        }]
      }, {
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: -44,
          y: 65
        },
        shoeUrls: [{
            url: 'left_shoe.png',
            x: 0,
            y: 0
          },
          {
            url: 'right_shoe.png',
            x: 0,
            y: 0
          }
        ],
        hairNo: 2,
        part: [
          [T + "left_arm.png"],
          [T + "right_arm.png"],
          [],
          []
        ],
        bones: [{
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, 0, 0]
      }, {
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: -190,
          y: 68
        },
        shoeUrls: [{
            url: 'left_shoe.png',
            x: 0,
            y: 0
          },
          {
            url: 'right_shoe.png',
            x: 0,
            y: 0
          }
        ],
        hairNo: 5,
        part: [
          [T + "left_arm.png", T + "left_hand.png"],
          [T + "right_arm.png", T + "right_hand.png"],
          [],
          []
        ],
        bones: [{
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 1,
              y: 1
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, 0, 0]
      },
      {
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: -6,
          y: 53
        },
        shoeUrls: [{
            url: 'left_shoe.png',
            x: 0,
            y: 262
          },
          {
            url: 'right_shoe.png',
            x: 0,
            y: 262
          }
        ],
        hairNo: 0,
        part: [
          [T + "left_arm.png", T + "left_hand.png"],
          [T + "right_arm.png", T + "right_hand.png"],
          [T + "left_leg.png", T + "left_foot.png"],
          [T + "right_leg.png", T + "right_foot.png"]
        ],
        bones: [{
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }]
      },
      {
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: -2,
          y: 57
        },
        shoeUrls: [{
            url: 'left_shoe.png',
            x: 0,
            y: 258
          },
          {
            url: 'right_shoe.png',
            x: 0,
            y: 258
          }
        ],
        hairNo: 3,
        part: [
          [T + "left_arm.png", T + "left_hand.png"],
          [T + "right_arm.png", T + "right_hand.png"],
          [T + "left_leg.png", T + "left_foot.png"],
          [T + "right_leg.png", T + "right_foot.png"]
        ],
        bones: [{
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }]
      },
      {
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: 0,
          y: 0
        },
        shoeUrls: [{
            url: 'left_shoe.png',
            x: 0,
            y: 295
          },
          {
            url: 'right_shoe.png',
            x: 0,
            y: 295
          }
        ],
        hairNo: 1,
        bones: [0, 0, 0, 0]
      }, {
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: -90,
          y: 48
        },
        shoeUrls: [{
            url: 'left_shoe.png',
            x: 0,
            y: 236
          },
          {
            url: 'right_shoe.png',
            x: 0,
            y: 236
          }
        ],
        hairNo: 6,
        part: [
          [T + "left_arm.png", T + "left_hand.png"],
          [T + "right_arm.png", T + "right_hand.png"],
          [T + "left_leg.png", T + "left_foot.png"],
          [T + "right_leg.png", T + "right_foot.png"]
        ],
        bones: [{
          bone1: {
            position: {
              x: -1,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 1
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }]
      }, {
        clothUrl: T + "cloth.png",
        clothPosition: {
          x: -87,
          y: 34
        },
        shoeUrls: [{
            url: 'left_shoe.png',
            x: 0,
            y: 230
          },
          {
            url: 'right_shoe.png',
            x: 0,
            y: 230
          }
        ],
        hairNo: 4,
        part: [
          [T + "left_arm.png", T + "left_hand.png"],
          [T + "right_arm.png", T + "right_hand.png"],
          [T + "left_leg.png", T + "left_foot.png"],
          [T + "right_leg.png", T + "right_foot.png"]
        ],
        bones: [{
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 1
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }, {
          bone1: {
            position: {
              x: 0,
              y: 0
            }
          },
          bone2: {
            position: {
              x: 0,
              y: 0
            }
          }
        }]
      }
    ]
  ],
  girlHair: [
    [{
        url: 'hair.png',
        x: -54,
        y: -51
      },
      {
        url: 'before-hair1.png',
        x: -40,
        y: -51,
        other: {
          url: 'after-hair1.png',
          x: 25,
          y: 50
        }
      }, {
        url: 'before-hair2.png',
        x: -54,
        y: -45,
        other: {
          url: 'after-hair2.png',
          x: 75,
          y: 53
        }
      },{
        url: 'before-hair0.png',
        x: -32,
        y: -45,
        other: {
          url: 'after-hair0.png',
          x: 45,
          y: -2
        }
      },
      {
        url: 'hair4.png',
        x: -10,
        y: -61
      },
      {
        url: 'before-hair5.png',
        x: -35,
        y: -35,
        other: {
          url: 'after-hair5.png',
          x: 26,
          y: 53
        }
      },
      {
        url: 'before-hair.png',
        x: -48,
        y: -75,
        other: {
          url: 'after-hair.png',
          x: 90,
          y: 53
        }
      }
    ],
    [{
        url: 'hair.png',
        x: 1,
        y: -10
      },
      {
        url: 'hair7.png',
        x: 12,
        y: -15
      },
      {
        url: 'hair6.png',
        x: 6,
        y: -10
      },
      {
        url: 'hair5.png',
        x: -30,
        y: -15
      },
      {
        url: 'hair3.png',
        x: 8,
        y: -32
      },
      {
        url: 'hair1.png',
        x: 10,
        y: -10,
        other: {
          url: 'after-hair1.png',
          x: 230,
          y: -35
        }
      },
      {
        url: 'hair4.png',
        x: 0,
        y: -30
      }
    ],
    [],
    [{
        url: 'hair0.png',
        x: -60,
        y: -40
      },
      {
        url: 'hair2.png',
        x: -80,
        y: -38
      },
      {
        url: 'hair3.png',
        x: -140,
        y: -10
      },
      {
        url: 'hair1.png',
        x: -50,
        y: -40
      },
      {
        url: 'hair4.png',
        x: -10,
        y: -61
      },
      {
        url: 'hair5.png',
        x: -20,
        y: -40
      },
      {
        url: 'hair6.png',
        x: -50,
        y: -84
      }
    ]
  ],
  girlHair1: [
    [{
        url: 'hair.png',
        x: -54,
        y: -51
      }, {
        url: 'before-hair.png',
        x: -40,
        y: -51,
        other: {
          url: 'after-hair.png',
          x: 26,
          y: 53
        }
      },
      {
        url: 'before-hair.png',
        x: -40,
        y: -51,
        other: {
          url: 'after-hair.png',
          x: 26,
          y: 53
        }
      },
      {
        url: 'before-hair.png',
        x: -32,
        y: -45,
        other: {
          url: 'after-hair.png',
          x: 45,
          y: -2
        }
      },
      {
        url: 'hair.png',
        x: -54,
        y: -51
      },
      {
        url: 'before-hair.png',
        x: -40,
        y: -51,
        other: {
          url: 'after-hair.png',
          x: 25,
          y: 50
        }
      },
      {
        url: 'hair.png',
        x: -48,
        y: -75,
        other: {
          url: 'after-hair.png',
          x: 90,
          y: 53
        }
      },
      {
        url: 'hair.png',
        x: -10,
        y: -61
      }
    ],
    [{
        url: 'hair.png',
        x: 1,
        y: -10
      },
      {
        url: 'hair.png',
        x: 4,
        y: -6
      },
      {
        url: 'hair.png',
        x: 4,
        y: -6
      },
      {
        url: 'hair.png',
        x: -30,
        y: -15
      },
      {
        url: 'hair.png',
        x: 4,
        y: -6
      },
      {
        url: 'hair.png',
        x: 4,
        y: -6
      },
      {
        url: 'hair.png',
        x: 0,
        y: -27
      },
      {
        url: 'hair.png',
        x: 8,
        y: -32
      }
    ],
    [{
        url: 'hair.png',
        x: -120,
        y: -11
      },
      {
        url: 'before-hair.png',
        x: -120,
        y: -15
      },
      {
        url: 'before-hair.png',
        x: -20,
        y: -40
      },
      {
        url: 'before-hair.png',
        x: -20,
        y: -40
      },
      {
        url: 'before-hair.png',
        x: -60,
        y: -40
      },
      {
        url: 'hair.png',
        x: -60,
        y: -40
      },
      {
        url: 'cloth.png',
        x: -113,
        y: -84
      },
      {
        url: 'before-hair.png',
        x: -10,
        y: -61
      }
    ]
  ]
}
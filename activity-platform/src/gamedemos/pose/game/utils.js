let Utils = {
  drawOutLine(game, x, y, w, h, closeCallback){
    let group = game.add.group(),
        graphics = game.add.graphics(0,0),
        close = game.add.sprite(w, 0, 'close'),
        rotate = game.add.sprite(0, 0, 'rotate'),
        stepLength = 10;

    graphics.beginFill(0xFFFFFF);
    graphics.lineStyle(2, 0xFFFFFF, 1);

    this.drawDashLine(graphics, 0, 0, 0, h, 0,stepLength);
    this.drawDashLine(graphics, 0, 0, w, 0, stepLength, 0);
    this.drawDashLine(graphics, 0, h, w, 0, stepLength, 0);
    this.drawDashLine(graphics, w, 0, 0, h, 0, stepLength);

    close.anchor.set(0.5);

    rotate.anchor.set(0.5);

    group.addChild(graphics);
    group.addChild(close);
    group.addChild(rotate);

    group.pivot.set(w >> 1, h >> 1);

    group.position.set(x + group.pivot.x, y + group.pivot.y);

    rotate.scale.set(1.3);
    rotate.setScaleMinMax(1, 1.3);
    close.scale.set(1.3);
    close.setScaleMinMax(1, 1.3);

    close.inputEnabled = true;
    close.events.onInputDown.add(()=>{
      group.parent.destroy();
      group = null;
      closeCallback && closeCallback();
    });

    rotate.name = 'rotate';
    rotate.inputEnabled = true;
    return group;
  },
  drawDashLine(graphics, startX, startY, endX, endY, xStep, yStep){
    for(let i=startX,j=startY; (endX>0 && i < endX) || (endY > 0 && j < endY); i += xStep, j += yStep){
      graphics.moveTo(i,j);
      graphics.lineTo(i + xStep/2, j + yStep/2);
    }
    graphics.endFill();
  },
  ANGLE(targetPos, originPos){
    let diffx = targetPos.x - originPos.x,
        diffy = targetPos.y - originPos.y,
        rotation = Utils.toAngle(Math.acos(diffy / Math.sqrt(diffx*diffx + diffy*diffy)));

    return diffx < 0 ? rotation : 2*Math.PI - rotation;
  },
  toAngle(radian){
    return radian;
  },
  DISTANCE(targetPos, originPos){
    var n = Math.sqrt(Math.pow(targetPos.x - originPos.x, 2) + Math.pow(targetPos.y - originPos.y, 2));
    return n
  }
};

export default  Utils;
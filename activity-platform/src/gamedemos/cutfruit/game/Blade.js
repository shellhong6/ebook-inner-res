import Utils from '../tools.js';

class Blade{

  constructor(props){
    let game = props.game;
    $.extend(this, props);

    var graphics = game.add.graphics(this.x || 0, this.y || 0);

    this.graphics = graphics;

    this._points = [];

    this.pointLife = 300;

    this.pointWidthStep = 0.5;

    this.endSharpRatio = 2;

    this.fillStyle = 0xFFFFFF;

    this.borderWidth = 0;

  }
  activate(){
    this.isActivated = true;
    this.game.input.addMoveCallback(this.touchMove, this);
  }
  inactivate(){
    this.isActivated = false;
    this._points = [];
    this.game.input.deleteMoveCallback(this.touchMove, this);
  }
  touchMove(point, x, y, isClick){
    if(this._start && (point.id == 1 || point.id == 0))
      this.pushPoint({x: x, y: y});
  }
  pushPoint(point){
    const len = this._points.length,
          lastPt = this._points[len-1];
    if (len > 0)
    {
      if(lastPt.x >> 0 == point.x >>0 && lastPt.y >> 0 == point.y >>0)
        return;
      point.normal = this.getNormal(lastPt, point);
    }
    point.ts = Date.now();
    this._points.push(point);
    this._dirty = true;
  }
  update(){
    if(!this.isActivated)
      return;

    let game = this.game;
    let activedPoint = Utils.isMobile ? game.input.pointer1 : game.input.mousePointer;
    if(!Utils.isMobile || activedPoint.active){

      if(activedPoint.isDown){
        this._start = true;
      }else if(this._start && activedPoint.isUp){
        this._start = false;
      }
    }

  }
  render(){
    let graphics = this.graphics;

    if(this._dirty)
      graphics.clear();

    if(!this.isActivated || this._points.length < 2){
      this._dirty = false;
      return;
    }

    graphics.beginFill(this.fillStyle);
    graphics.lineStyle(this.borderWidth, 0xffd900);

    let now = Date.now(),
        i = 1,
        flag = 1,
        step = this.pointWidthStep,
        sharp = this.endSharpRatio,
        pw;

    this._points = this._points.filter((pt)=>{
      if(now - pt.ts < this.pointLife)
        return true;
    });

    const points = this._points,
          len = points.length,
          p0 = points[0];

    if(len < 2)
      return;

    //跟随滑动而出现的刀光
    while (i)
    {
      let pt = points[i],
          normal = pt.normal;

      pw = i * step;

      graphics.lineTo(pt.x + flag * normal.y *pw, pt.y - flag * normal.x * pw);

      if(i == len - 1 && flag > 0){
        graphics.lineTo(pt.x + sharp * normal.x *pw, pt.y + sharp * normal.y * pw);
        flag = -1;
      }else{
        i += flag;
      }
    }
    graphics.endFill();
  }

  getNormal(p1, p2){
    let dx = p2.x - p1.x, dy = p2.y - p1.y;
    let length = Math.sqrt(dx * dx + dy * dy);
    return {x:dx / length, y:dy / length};
  }

  getAngle(){
    let points = this._points;
    let start = points[0], end = points[points.length - 1];
    if(start && end && start !== end){
        let dx = end.x - start.x, dy = end.y - start.y;
        let angle = Math.atan2(dy, dx) * 180 / Math.PI >> 0;
        if(angle < 0) angle = angle + 360;
        return angle;
    }
    return 0;
  }
}

export default Blade;
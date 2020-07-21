import makerjs from "makerjs";
import CenteredRoundRectangle from "./CenteredRoundRectangle";
import * as kle from "./KLESerial";

class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}
}

class KeyPosition {
  xSpacing = 19.05; // TODO: move this out
  ySpacing = 19.05; // TODO: move this out

  constructor(
    public x: number,
    public y: number,
    public w: number = 1,
    public h: number = 1,
    public angle: number = 0,
  ) {}

  center(): Point {
    let radians = (Math.PI / 180) * this.angle;
    let cx = this.x + Math.cos(radians) * this.w * this.xSpacing / 2;
    let cy = this.y + Math.sin(radians) * this.h * -this.ySpacing / 2;
    return new Point(cx, cy);
  }
}

class SwitchPlate implements makerjs.IModel {
  public origin: makerjs.IPoint;
  public units = makerjs.unitType.Millimeter;
  public models: makerjs.IModelMap = {};

  constructor(kleData: any) {
    this.origin = [0, 0];
    this.models = {};

    console.log(kleData);
    var keyboard: kle.Keyboard;
    if (typeof kleData === "string") {
      keyboard = kle.parse(kleData);
    } else if (typeof kleData === "object") {
      keyboard = kle.deserialize(kleData);
    } else {
      return;
    }

    console.log(keyboard);
    let i = 1;
    for (let key of keyboard.keys) {
      this.models["switch" + i] = new MXSwitch(key);
      i++;
    }
    console.log(this.origin);
  }
}

class MXSwitch implements makerjs.IModel {
  public origin: makerjs.IPoint;
  public models: makerjs.IModelMap = {};
  public paths: makerjs.IPathMap = {};
  constructor(key: kle.Key) {
    let xSpacing = 19.05;
    let ySpacing = 19.05;
    let x_mm = (key.x + key.width / 2) * xSpacing;
    let y_mm = (key.y + key.height / 2) * -ySpacing;
    let pos = new KeyPosition(
      x_mm,
      y_mm,
      key.width,
      key.height,
      key.rotation_angle,
    );

    this.origin = [pos.x, pos.y];
    let switchModel = new CenteredRoundRectangle(14, 14, 0.5);
    let switchOutlineModel = new CenteredRoundRectangle(
      xSpacing * key.width,
      ySpacing * key.height,
      2,
    );
    //switchOutlineModel.layer = "outline";
    if (key.rotation_angle !== 0) {
      makerjs.model.rotate(switchModel, -key.rotation_angle);
      makerjs.model.rotate(switchOutlineModel, -key.rotation_angle);
      this.origin = rotatePoint(
        pos.x,
        pos.y,
        (key.rotation_x) * xSpacing,
        (key.rotation_y) * -ySpacing,
        key.rotation_angle,
      );
    }

    let centerPath = new makerjs.paths.Circle(0.1);
    this.paths = {
      center: centerPath,
    };

    this.models = {
      switch: switchModel,
      outline: switchOutlineModel,
    };
    console.log(this.origin);
  }
}

function rotatePoint(
  x: number,
  y: number,
  rx: number,
  ry: number,
  angle: number,
): [number, number] {
  let radians = (Math.PI / 180) * angle;
  let cos = Math.cos(radians);
  let sin = Math.sin(radians);
  let new_x = (cos * (x - rx)) + (sin * (y - ry)) + rx;
  let new_y = (cos * (y - ry)) - (sin * (x - rx)) + ry;

  return [new_x, new_y];
}

export default SwitchPlate;

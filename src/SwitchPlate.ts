import makerjs from "makerjs";
import CenteredRoundRectangle from "./CenteredRoundRectangle";
import * as kle from "./KLESerial";

class Point {
  constructor(public x: number, public y: number) {}
}

class SwitchPlate implements makerjs.IModel {
  public origin: makerjs.IPoint;
  public units = makerjs.unitType.Millimeter;
  public models: makerjs.IModelMap = {};

  constructor(kleData: any) {
    this.origin = [0, 0];
    this.models = {};

    var keyboard: kle.Keyboard;
    if (typeof kleData === "string") {
      keyboard = kle.parse(kleData);
    } else if (typeof kleData === "object") {
      keyboard = kle.deserialize(kleData);
    } else {
      return;
    }

    let i = 1;
    for (let key of keyboard.keys) {
      this.models["switch" + i] = new MXSwitch(key);
      i++;
    }
  }
}

class MXSwitch implements makerjs.IModel {
  public origin: makerjs.IPoint;
  public models: makerjs.IModelMap = {};
  public paths: makerjs.IPathMap = {};
  private xSpacing: number = 19.05;
  private ySpacing: number = 19.05;

  constructor(key: kle.Key) {
    this.origin = this.absoluteCenter(key);
    let switchModel = new CenteredRoundRectangle(14, 14, 0.5);
    let switchOutlineModel = new CenteredRoundRectangle(
      this.xSpacing * key.width,
      this.ySpacing * key.height,
      2,
    );
    if (key.rotation_angle !== 0) {
      makerjs.model.rotate(switchModel, -key.rotation_angle);
      makerjs.model.rotate(switchOutlineModel, -key.rotation_angle);
    }

    this.models = {
      switch: switchModel,
      outline: switchOutlineModel,
    };
    // TODO: Add stab and acoustic cutouts here
    console.log(this.origin);
  }

  center(key: kle.Key): Point {
    let centerX = key.x + key.width / 2;
    let centerY = key.y + key.height / 2;
    console.log(`C: ${[centerX, centerY]}`);

    if (key.rotation_angle === 0) {
      return new Point(centerX, centerY);
    }

    let newCenter = makerjs.point.rotate(
      [centerX, centerY],
      key.rotation_angle,
      [key.rotation_x, key.rotation_y],
    );
    return new Point(newCenter[0], newCenter[1]);
  }

  absoluteCenter(key: kle.Key): makerjs.IPoint {
    let center = this.center(key);
    return [center.x * this.xSpacing, center.y * -this.ySpacing];
  }
}

export default SwitchPlate;

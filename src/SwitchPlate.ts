import makerjs from "makerjs";
import * as kle from "./KLESerial";

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
    var i = 1;
    for (var key of keyboard.keys) {
      this.models["switch" + i] = new MXSwitch(key);
      i++;
    }
    console.log(this.origin);
  }
}

class MXSwitch implements makerjs.IModel {
  public origin: makerjs.IPoint;
  public models: makerjs.IModelMap = {};
  constructor(key: kle.Key) {
    let xSpacing = 19.05;
    let ySpacing = 19.05;
    //let x_mm = (key.x + key.width / 2) * xSpacing - xSpacing / 2;
    //let y_mm = (key.y + key.height / 2) * -ySpacing - ySpacing / 2;
    let x_mm = (key.x + key.width / 2) * xSpacing;
    let y_mm = (key.y + key.height / 2) * -ySpacing;

    this.origin = [x_mm, y_mm];
    let switchModel = new makerjs.models.RoundRectangle(14, 14, 0.5);
    if (key.rotation_angle != 0) {
      makerjs.model.rotate(
        switchModel,
        -key.rotation_angle,
        //[xSpacing * (key.rotation_x + 0.5), ySpacing * (key.rotation_y + 0.5)],
      );
      this.origin = rotatePoint(
        this.origin[0],
        this.origin[1],
        key.rotation_x * xSpacing,
        key.rotation_y * -ySpacing,
        key.rotation_angle,
      );
    }
    this.models = {
      switch: switchModel,
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

import makerjs from "makerjs";
import * as kle from "@ijprest/kle-serial";

class SwitchPlate implements makerjs.IModel {

  public origin: makerjs.IPoint;
  public units = makerjs.unitType.Millimeter;
  public models: makerjs.IModelMap = {};

  constructor(kleData: any) {
    let keyboard = kle.Serial.deserialize(kleData);

    console.log(keyboard);

    this.origin = [0, 0];
    this.models = {};
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
  constructor(key: any) {

    let hSpacing = 19.05;
    let wSpacing = 19.05;
    let x_mm = (key.x + key.width / 2) * wSpacing - wSpacing / 2;
    let y_mm = (key.y + key.height / 2) * -hSpacing - hSpacing / 2;

    this.origin = [x_mm, y_mm];
    this.models = {
      switch: new makerjs.models.RoundRectangle(14, 14, 0.5),
    };
    console.log(this.origin);
  }
}

export default SwitchPlate;
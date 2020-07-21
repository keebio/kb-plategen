import makerjs from "makerjs";
import * as kle from "./KLESerial";
import Switch from "./Switch";

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
      this.models["switch" + i] = new Switch(key);
      i++;
    }
  }
}

export default SwitchPlate;

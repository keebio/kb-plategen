import makerjs from "makerjs";
import * as kle from "../KLESerial";
import KeyCutouts from "./KeyCutouts";
import PlateParameters from "../PlateParameters";

class SwitchPlate implements makerjs.IModel {
  public origin: makerjs.IPoint;
  public units = makerjs.unitType.Millimeter;
  public models: makerjs.IModelMap = {};

  constructor(kleData: any, plateParameters: PlateParameters) {
    this.origin = [0, 0];
    let models: makerjs.IModelMap = {};

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
      models["switch" + i] = new KeyCutouts(key, plateParameters);
      i++;
    }

    if (plateParameters.combineOverlaps) {
      let combinedModel = makerjs.cloneObject(models["switch1"]);
      for (let i = 2; i <= keyboard.keys.length; i++) {
        console.log(`Combining models: Switch ${i}`);
        combinedModel = makerjs.model.combineUnion(
          combinedModel,
          models["switch" + i],
        );
      }
      this.models = {
        plate: combinedModel,
      };
    } else {
      this.models = models;
    }
  }
}

export default SwitchPlate;

import makerjs from "makerjs";
import CenteredRoundRectangleWithKerf from "./CenteredRoundRectangleWithKerf";

class CutoutParameters {
  constructor(
    public width: number,
    public height: number,
  ) { }
}

export enum AcousticCutoutType {
  None = "None",
  Typical = "Typical",
  Extreme = "Extreme",
}

class AcousticCutout implements makerjs.IModel {
  public models: makerjs.IModelMap = {};
  public units = makerjs.unitType.Millimeter;

  constructor(
    keyWidth: number,
    style: AcousticCutoutType = AcousticCutoutType.None,
    radius: number = 0.5,
    kerf: number = 0.0
  ) {
    let params = new CutoutParameters(2, 14);

    let offsets = [0, 0];
    if (keyWidth >= 3) {
    } else if (Math.abs(keyWidth - 1.5) < 0.01) {
      offsets = [-11.6, 11.6];
    } else if (Math.abs(keyWidth - 2) < 0.01) {
      offsets = [-18.25, 18.25];
    }

    let leftCutout: makerjs.IModel;
    leftCutout = this.cutout(params, radius, kerf);
    let rightCutout = makerjs.model.clone(leftCutout);
    makerjs.model.moveRelative(leftCutout, [offsets[0], 0]);
    makerjs.model.moveRelative(rightCutout, [offsets[1], 0]);

    this.models = {
      acousticLeft: leftCutout,
      acousticRight: rightCutout
    }
  }

  cutout(params: CutoutParameters, radius: number, kerf: number): makerjs.IModel {
    return new CenteredRoundRectangleWithKerf(params.width, params.height, radius, kerf);
  }
}

export default AcousticCutout;

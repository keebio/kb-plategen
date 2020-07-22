import makerjs from "makerjs";
import CenteredRoundRectangle from "./CenteredRoundRectangle";

class StabilzerCutout implements makerjs.IModel {
  public models: makerjs.IModelMap = {};

  constructor(stabilzerWidth: number, radius: number = 0.5) {
    let cutoutWidth = 6.75;
    let cutoutHeight = 14;

    let offsets = [0, 0];
    if (stabilzerWidth >= 8) {
      offsets = [-66.675, 66.675];
    } else if (stabilzerWidth >= 7) {
      offsets = [-57.15, 57.15];
    } else if (stabilzerWidth === 6.25) {
      offsets = [-50, 50];
    } else if (stabilzerWidth === 6) {
      offsets = [-57.15, 38.1];
    } else if (stabilzerWidth >= 3) {
      offsets = [-19.05, 19.05];
    } else if (stabilzerWidth >= 2) {
      offsets = [-11.938, 11.938];
    }

    let leftStab = new CenteredRoundRectangle(
      cutoutWidth,
      cutoutHeight,
      radius,
    );
    makerjs.model.moveRelative(leftStab, [offsets[0], -1]);
    let rightStab = new CenteredRoundRectangle(
      cutoutWidth,
      cutoutHeight,
      radius,
    );
    makerjs.model.moveRelative(rightStab, [offsets[1], -1]);
    this.models = {
      stabilzerLeft: leftStab,
      stabilzerRight: rightStab,
    };
  }
}

export default StabilzerCutout;

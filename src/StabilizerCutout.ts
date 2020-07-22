import makerjs from "makerjs";
import CenteredRoundRectangle from "./CenteredRoundRectangle";

class CutoutParameters {
  constructor(
    public width: number,
    public height: number,
    public heightOffset: number,
  ) {}
}

class StabilizerCutout implements makerjs.IModel {
  public models: makerjs.IModelMap = {};

  constructor(
    stabilzerWidth: number,
    style: string = "normal",
    radius: number = 0.5,
  ) {
    let params = this.loadStyle(style);

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
      params.width,
      params.height,
      radius,
    );
    makerjs.model.moveRelative(leftStab, [offsets[0], params.heightOffset]);
    let rightStab = new CenteredRoundRectangle(
      params.width,
      params.height,
      radius,
    );
    makerjs.model.moveRelative(rightStab, [offsets[1], params.heightOffset]);
    this.models = {
      stabilzerLeft: leftStab,
      stabilzerRight: rightStab,
    };

    // TODO: Add wire cutout for thicker plates
  }

  loadStyle(style: string): CutoutParameters {
    switch (style) {
      case "large":
        return new CutoutParameters(7, 15, -0.5);
      case "normal":
      default:
        return new CutoutParameters(6.75, 14, -1);
    }
  }
}

declare namespace StabilizerCutout {
  export enum Style {
    Normal = 1,
    Large,
  }
}
export default StabilizerCutout;

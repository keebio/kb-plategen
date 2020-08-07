import makerjs from "makerjs";
import CenteredRoundRectangle from "./CenteredRoundRectangle";
import * as makerTools from "./makerTools";

class CutoutParameters {
  constructor(
    public width: number,
    public height: number,
    public heightOffset: number,
  ) { }
}

export enum StabilizerCutoutType {
  Normal,
  Large,
  Choc,
  ThickPlate3mm,
  ThickPlate5mm,
}

class StabilizerCutout implements makerjs.IModel {
  public models: makerjs.IModelMap = {};
  public units = makerjs.unitType.Millimeter;

  constructor(
    stabilzerWidth: number,
    style: StabilizerCutoutType = StabilizerCutoutType.Normal,
    reversed: boolean = false,
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
    } else if (stabilzerWidth === 5.5 && style === StabilizerCutoutType.Choc) {
      offsets = [-38, 38];
    } else if (stabilzerWidth >= 3) {
      offsets = [-19.05, 19.05];
    } else if (stabilzerWidth >= 2) {
      if (style === StabilizerCutoutType.Choc) {
        offsets = [-12, 12];
      } else {
        offsets = [-11.938, 11.938];
      }
    }

    let leftStab: makerjs.IModel;
    if (style === StabilizerCutoutType.Choc) {
      leftStab = this.cutoutChoc(radius);
    } else {
      leftStab = this.cutoutMX(params, radius);
    }
    let rightStab = makerjs.model.clone(leftStab);
    makerjs.model.moveRelative(leftStab, [offsets[0], params.heightOffset]);
    makerjs.model.moveRelative(rightStab, [offsets[1], params.heightOffset]);

    if (style === StabilizerCutoutType.ThickPlate5mm) {
      // Add cutout for stabilizer wire
      let wire = this.cutoutMXWire(offsets[1] - offsets[0], radius);
      let models = {
        stabilzerLeft: leftStab,
        stabilzerRight: rightStab,
        wire: wire,
      };
      this.models = {
        stabilizer: makerTools.combineModels(models),
      };
    } else {
      this.models = {
        stabilzerLeft: leftStab,
        stabilzerRight: rightStab,
      };
    }

    if (reversed) {
      makerTools.rotateModels(this.models, 180);
    }
  }

  loadStyle(style: StabilizerCutoutType): CutoutParameters {
    switch (style) {
      case StabilizerCutoutType.Large:
        return new CutoutParameters(7, 15, -0.5);
      case StabilizerCutoutType.ThickPlate3mm:
        return new CutoutParameters(7, 16, -1);
      case StabilizerCutoutType.ThickPlate5mm:
        return new CutoutParameters(7, 19, -0.9);
      case StabilizerCutoutType.Normal:
      default:
        return new CutoutParameters(6.75, 14, -1);
    }
  }

  cutoutMX(params: CutoutParameters, radius: number): makerjs.IModel {
    return new CenteredRoundRectangle(params.width, params.height, radius);
  }

  cutoutMXWire(wireLength: number, radius: number): makerjs.IModel {
    let wire = new CenteredRoundRectangle(wireLength, 3.6, radius);
    makerjs.model.moveRelative(wire, [0, -8.6]);
    return wire;
  }

  cutoutChoc(radius: number): makerjs.IModel {
    let part1 = new CenteredRoundRectangle(6.3, 6.85, radius);
    makerjs.model.moveRelative(part1, [0, 0.375]);
    let part2 = new CenteredRoundRectangle(3.6, 8.45, radius);
    makerjs.model.moveRelative(part2, [0, 4.225]);
    return makerjs.model.combineUnion(part1, part2);
  }
}

export default StabilizerCutout;

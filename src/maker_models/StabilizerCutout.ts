import makerjs from "makerjs";
import CenteredRoundRectangleWithKerf from "./CenteredRoundRectangleWithKerf";
import * as makerTools from "./makerTools";

class CutoutParameters {
  constructor(
    public width: number,
    public height: number,
    public heightOffset: number,
  ) { }
}

export enum StabilizerCutoutType {
  Normal = "Normal",
  Large = "Large",
  Choc = "Choc V1",
  ThickPlate3mm = "3mm Plate",
  ThickPlate3mmScrewIn = "3mm Plate for Screw-ins",
  ThickPlate5mm = "5mm Plate",
  GateronLP = "Gateron LP",
  ChocV2 = "Choc V2",
  CustomRectangles = "Custom Rectangles",
  SingleRectangle = "Single Rectangle",
}

class StabilizerCutout implements makerjs.IModel {
  public models: makerjs.IModelMap = {};
  public units = makerjs.unitType.Millimeter;

  constructor(
    stabilzerWidth: number,
    style: StabilizerCutoutType = StabilizerCutoutType.Normal,
    reversed: boolean = false,
    radius: number = 0.5,
    kerf: number = 0.0,
    customWidth: number = 7.0,
    customHeight: number = 15.0,
    customVerticalOffset: number = -0.5,
  ) {
    let params = this.loadStyle(style);

    // For custom rectangles or single rectangle, use the provided dimensions and offset
    if (style === StabilizerCutoutType.CustomRectangles || style === StabilizerCutoutType.SingleRectangle) {
      params = new CutoutParameters(customWidth, customHeight, customVerticalOffset);
    }

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
      if (style === StabilizerCutoutType.Choc || style === StabilizerCutoutType.ChocV2) {
        offsets = [-12, 12];
      } else {
        offsets = [-11.938, 11.938];
      }
    }

    if (style === StabilizerCutoutType.SingleRectangle) {
      // For single rectangle, create just one centered rectangle
      const singleRect = this.cutoutMX(params, radius, kerf);
      makerjs.model.moveRelative(singleRect, [0, params.heightOffset]);
      this.models = {
        stabilizer: singleRect
      };
      return;
    }

    // For other styles, create left and right stabilizers
    let leftStab: makerjs.IModel;
    if (style === StabilizerCutoutType.Choc) {
      leftStab = this.cutoutChoc(radius, kerf);
    } else if (style === StabilizerCutoutType.ChocV2) {
      leftStab = this.cutoutChocV2(radius, kerf);
    } else {
      leftStab = this.cutoutMX(params, radius, kerf);
    }
    let rightStab = makerjs.model.clone(leftStab);
    makerjs.model.moveRelative(leftStab, [offsets[0], params.heightOffset]);
    makerjs.model.moveRelative(rightStab, [offsets[1], params.heightOffset]);

    if (style === StabilizerCutoutType.ThickPlate5mm) {
      // Add cutout for stabilizer wire
      let wire = this.cutoutMXWire(offsets[1] - offsets[0], radius, kerf);
      let models = {
        stabilzerLeft: leftStab,
        stabilzerRight: rightStab,
        wire: wire,
      };
      this.models = {
        stabilizer: makerTools.combineModels(models),
      };
    } else if (style === StabilizerCutoutType.GateronLP) {
      // Add cutout for stabilizer wire
      let wire = this.cutoutGateronLPWire(offsets[1] - offsets[0], radius, kerf);
      let models = {
        stabilzerLeft: leftStab,
        stabilzerRight: rightStab,
        wire: wire,
      };
      this.models = {
        stabilizer: makerTools.combineModels(models),
      };
    } else if (style === StabilizerCutoutType.ChocV2) {
      // Add cutout for stabilizer wire
      let wire = this.cutoutChocV2Wire(offsets[1] - offsets[0], radius, kerf);
      let models = {
        stabilzerLeft: leftStab,
        stabilzerRight: rightStab,
        wire: wire,
      };
      this.models = {
        stabilizer: makerTools.combineModels(models),
      };
    }
    else {
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
      case StabilizerCutoutType.ThickPlate3mmScrewIn:
        return new CutoutParameters(7, 19.5, 0.75);
      case StabilizerCutoutType.ThickPlate5mm:
        return new CutoutParameters(7, 20.15, -0.325);
      case StabilizerCutoutType.Choc:
        return new CutoutParameters(0, 0, 0);
      case StabilizerCutoutType.GateronLP:
        return new CutoutParameters(6.0, 12.5, -0.45);
      case StabilizerCutoutType.ChocV2:
        return new CutoutParameters(0, 0, 0); // Not relevant for Choc V2
      case StabilizerCutoutType.Normal:
      default:
        return new CutoutParameters(6.75, 14, -1);
    }
  }

  cutoutMX(params: CutoutParameters, radius: number, kerf: number): makerjs.IModel {
    return new CenteredRoundRectangleWithKerf(params.width, params.height, radius, kerf);
  }

  cutoutMXWire(wireLength: number, radius: number, kerf: number): makerjs.IModel {
    let wire = new CenteredRoundRectangleWithKerf(wireLength, 3.6, radius, kerf);
    makerjs.model.moveRelative(wire, [0, -8.6]);
    return wire;
  }

  cutoutChoc(radius: number, kerf: number): makerjs.IModel {
    let part1 = new CenteredRoundRectangleWithKerf(6.3, 6.85, radius, kerf);
    makerjs.model.moveRelative(part1, [0, 0.375]);
    let part2 = new CenteredRoundRectangleWithKerf(3.6, 8.45, radius, kerf);
    makerjs.model.moveRelative(part2, [0, 4.225]);
    return makerjs.model.combineUnion(part1, part2);
  }

  cutoutChocV2(radius: number, kerf: number): makerjs.IModel {
    let part1 = new CenteredRoundRectangleWithKerf(5.95, 7.95, radius, kerf);
    makerjs.model.moveRelative(part1, [0, -0.3441]);
    let part2 = new CenteredRoundRectangleWithKerf(4.55, 6.25, radius, kerf);
    makerjs.model.moveRelative(part2, [0, -6.7559]);
    return makerjs.model.combineUnion(part1, part2);
  }

  cutoutGateronLPWire(wireLength: number, radius: number, kerf: number): makerjs.IModel {
    let wireHeight = 2.5;
    let wire = new CenteredRoundRectangleWithKerf(wireLength, wireHeight, radius, kerf);
    makerjs.model.moveRelative(wire, [0, -wireHeight / 2]);
    return wire;
  }

  cutoutChocV2Wire(wireLength: number, radius: number, kerf: number): makerjs.IModel {
    let wireHeight = 1.4;
    let wire = new CenteredRoundRectangleWithKerf(wireLength, wireHeight, radius, kerf);
    makerjs.model.moveRelative(wire, [0, -8.2809]);
    return wire;
  }
}

export default StabilizerCutout;

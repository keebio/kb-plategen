import makerjs from "makerjs";
import CenteredRoundRectangle from "./CenteredRoundRectangle";
import * as kle from "./KLESerial";
import StabilizerCutout from "./StabilizerCutout";

class Point {
  constructor(public x: number, public y: number) {}
}

enum SwitchCutoutType {
  MX,
  Alps,
  MX_Alps,
  MX_Opening,
}

class KeyCutouts implements makerjs.IModel {
  public origin: makerjs.IPoint;
  public models: makerjs.IModelMap = {};
  public paths: makerjs.IPathMap = {};
  private xSpacing: number = 19.05;
  private ySpacing: number = 19.05;

  constructor(key: kle.Key) {
    this.origin = this.absoluteCenter(key);
    let models: { [id: string]: makerjs.IModel } = {};

    models["switchCutout"] = this.switchCutout(SwitchCutoutType.MX);
    //models["outline"] = this.switchOutline(key);
    //models["outline"].layer = "gray";

    let stabCutoutStyle = "normal";
    if (key.width >= 2) {
      let stabModel = new StabilizerCutout(
        key.width,
        stabCutoutStyle,
        key.rs || key.nub,
      );
      models["stabilizer"] = stabModel;
    } else if (key.height >= 2) {
      let stabModel = new StabilizerCutout(
        key.height,
        stabCutoutStyle,
        key.rs || key.nub,
      );
      let rotation = key.rotation_angle >= 0 ? -90 : 90;
      makerjs.model.rotate(stabModel, rotation);
      models["stabilizer"] = stabModel;
    }

    // TODO: Add acoustic cutouts here

    if (key.rotation_angle !== 0) {
      Object.keys(models).forEach((k: string) => {
        makerjs.model.rotate(models[k], -key.rotation_angle);
      });
    }

    this.models = models;
  }

  switchCutout(
    cutoutType: SwitchCutoutType,
    radius: number = 0.5,
  ): makerjs.IModel {
    switch (cutoutType) {
      case SwitchCutoutType.MX:
        return new CenteredRoundRectangle(14, 14, radius);
      case SwitchCutoutType.Alps:
        return new CenteredRoundRectangle(15.5, 12.8, radius);
      case SwitchCutoutType.MX_Alps: {
        let cutoutMX = this.switchCutout(SwitchCutoutType.MX, radius);
        let cutoutAlps = this.switchCutout(SwitchCutoutType.Alps, radius);
        return makerjs.model.combineUnion(cutoutMX, cutoutAlps);
      }
      case SwitchCutoutType.MX_Opening: {
        let cutout = this.switchCutout(SwitchCutoutType.MX, radius);
        let cutoutSide1 = new CenteredRoundRectangle(15.6, 3.1, radius);
        let cutoutSide2 = makerjs.model.clone(cutoutSide1);
        makerjs.model.moveRelative(cutoutSide1, [0, 4.45]);
        makerjs.model.moveRelative(cutoutSide2, [0, -4.45]);
        cutout = makerjs.model.combineUnion(cutout, cutoutSide1);
        cutout = makerjs.model.combineUnion(cutout, cutoutSide2);
        return cutout;
      }
      default:
        return new CenteredRoundRectangle(14, 14, radius);
    }
  }

  switchOutline(key: kle.Key): makerjs.IModel {
    return new CenteredRoundRectangle(
      this.xSpacing * key.width,
      this.ySpacing * key.height,
      2,
    );
  }

  center(key: kle.Key): Point {
    let centerX = key.x + key.width / 2;
    let centerY = key.y + key.height / 2;

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

export default KeyCutouts;

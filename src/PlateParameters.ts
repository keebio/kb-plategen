import { SwitchCutoutType } from "./maker_models/KeyCutouts";
import { StabilizerCutoutType } from "./maker_models/StabilizerCutout";

export type PlateKLE = {
  //kleData: string | object;
  kleData: any; // TODO: Fix this since SwitchPlate isn't happy if I use the type above
};

export type KeyCutoutParameters = {
  switchCutoutType: SwitchCutoutType;
  switchCutoutRadius: number;
  stabilizerCutoutType: StabilizerCutoutType;
  stabilizerCutoutRadius: number;
  horizontalKeySpacing: number;
  verticalKeySpacing: number;
  combineOverlaps: boolean;
};

export type PlateParameters = KeyCutoutParameters & PlateKLE;

export default PlateParameters;

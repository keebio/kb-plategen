import { SwitchCutoutType } from "./maker_models/KeyCutouts";
import { StabilizerCutoutType } from "./maker_models/StabilizerCutout";
import { AcousticCutoutType } from "./maker_models/AcousticCutout";

export type PlateKLE = {
  kleData: string;
};

export type KeyCutoutParameters = {
  switchCutoutType: SwitchCutoutType;
  switchCutoutRadius: number;
  stabilizerCutoutType: StabilizerCutoutType;
  stabilizerCutoutRadius: number;
  acousticCutoutType: AcousticCutoutType;
  acousticCutoutRadius: number;
  horizontalKeySpacing: number;
  verticalKeySpacing: number;
  combineOverlaps: boolean;
};

export type PlateParameters = KeyCutoutParameters & PlateKLE;

export default PlateParameters;

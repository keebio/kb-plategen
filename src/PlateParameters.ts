import { SwitchCutoutType } from "./maker_models/KeyCutouts";
import { StabilizerCutoutType } from "./maker_models/StabilizerCutout";

export type PlateParameters = {
  kleData?: string | object;
  switchCutoutType: SwitchCutoutType;
  switchCutoutRadius: number;
  stabilizerCutoutType: StabilizerCutoutType;
  stabilizerCutoutRadius: number;
  horizontalKeySpacing: number;
  verticalKeySpacing: number;
  combineOverlaps: boolean;
};

export default PlateParameters;

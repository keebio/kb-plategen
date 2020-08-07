import React from "react";
import * as keyCutouts from "./KeyCutouts";

export interface PlateConfigurationProps {
  rawKLEData?: string;
  switchCutoutType?: keyCutouts.SwitchCutoutType;
  switchCutoutRadius?: number;
  stabilizerCutoutType?: string;
  stabilizerCutoutRadius?: number;
  horizontalKeySpacing?: number;
  verticalKeySpacing?: number;
}

class PlateConfiguration extends React.Component<PlateConfigurationProps> {
  render() {
    const {
      rawKLEData = "",
      switchCutoutType = keyCutouts.SwitchCutoutType.MX,
      switchCutoutRadius = 0.5,
      stabilizerCutoutType = "large",
      stabilizerCutoutRadius = 0.5,
      horizontalKeySpacing = 19.05,
      verticalKeySpacing = 19.05,
    } = this.props;

    return (
      <div className="plateConfiguration">
        <div className="kleInput">
          KLE input box goes here: {rawKLEData}
        </div>

        <div className="switchCutoutConfig">
          <div className="cutoutType">
            Switch Cutout Type: {switchCutoutType}
          </div>
          <div className="cutoutRadius">
            Switch Cutout Radius: {switchCutoutRadius}
          </div>
        </div>

        <div className="stabilizerCutoutConfig">
          <div className="cutoutType">
            Stabilizer Cutout Type: {stabilizerCutoutType}
          </div>
          <div className="cutoutRadius">
            Stabilizer Cutout Radius: {stabilizerCutoutRadius}
          </div>
        </div>

        <div className="keySpacing">
          <div className="horizontalKeySpacing">
            Horizontal Key Spacing: {horizontalKeySpacing}
          </div>
          <div className="verticalKeySpacing">
            Vertical Key Spacing: {verticalKeySpacing}
          </div>
        </div>
      </div>
    );
  }
}

export default PlateConfiguration;

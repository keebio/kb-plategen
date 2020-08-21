import React from "react";
import { SwitchCutoutType } from "../maker_models/KeyCutouts";
import { StabilizerCutoutType } from "../maker_models/StabilizerCutout";

export interface PlateConfigurationProps {
  rawKLEData?: string;
  switchCutoutType?: SwitchCutoutType;
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
      switchCutoutType = SwitchCutoutType.MX,
      switchCutoutRadius = 0.5,
      stabilizerCutoutType = StabilizerCutoutType.Large,
      stabilizerCutoutRadius = 0.5,
      horizontalKeySpacing = 19.05,
      verticalKeySpacing = 19.05,
    } = this.props;

    return (
      <div className="ui container">
        <div className="ui form">
          <h3 className="ui header">KLE Raw Data</h3>
          <div className="field">
            <textarea>{rawKLEData}</textarea>
          </div>

          <h3 className="ui dividing header">Switch Cutouts</h3>
          <div className="fields">
            <div className="six wide field">
              <label>Cutout Type</label>
              <div className="ui selection dropdown">
                <input
                  type="hidden"
                  name="switchCutoutType"
                  value={switchCutoutType}
                />
                <i className="dropdown icon"></i>
                <div className="menu">
                  <div className="item" data-value="MX">MX</div>
                  <div className="item" data-value="Alps">Alps</div>
                  <div className="item" data-value="MX_Alps">MX/Alps</div>
                  <div className="item" data-value="MX_Opening">MX Opening</div>
                  <div className="item" data-value="MX_Encoder">
                    MX + Encoder
                  </div>
                </div>
              </div>
            </div>
            <div className="three wide field">
              <label>Cutout Fillet Radius</label>
              <div className="ui right labeled input">
                <input
                  type="text"
                  name="switchCutoutRadius"
                  value={switchCutoutRadius}
                />
                <div className="ui basic label">mm</div>
              </div>
            </div>
          </div>

          <h3 className="ui dividing header">Stabilizer Cutouts</h3>
          <div className="fields">
            <div className="six wide field">
              <label>Cutout Type</label>
              <div className="ui selection dropdown">
                <input
                  type="hidden"
                  name="stabilizerCutoutType"
                  value={stabilizerCutoutType}
                />
                <i className="dropdown icon"></i>
                <div className="menu">
                  <div className="item" data-value="MX">MX</div>
                  <div className="item" data-value="Alps">Alps</div>
                  <div className="item" data-value="MX_Alps">MX/Alps</div>
                  <div className="item" data-value="MX_Opening">MX Opening</div>
                  <div className="item" data-value="MX_Encoder">
                    MX + Encoder
                  </div>
                </div>
              </div>
            </div>
            <div className="three wide field">
              <label>Cutout Fillet Radius</label>
              <div className="ui right labeled input">
                <input
                  type="text"
                  name="stabilizerCutoutRadius"
                  value={stabilizerCutoutRadius}
                />
                <div className="ui basic label">mm</div>
              </div>
            </div>
          </div>

          <h3 className="ui dividing header">Keyspacing</h3>
          <div className="fields">
            <div className="three wide field">
              <label>Horizontal</label>
              <div className="ui right labeled left icon input">
                <i className="arrows alternate horizontal icon"></i>
                <input
                  type="text"
                  name="horizontalKeySpacing"
                  value={horizontalKeySpacing}
                />
                <div className="ui basic label">mm</div>
              </div>
            </div>
            <div className="three wide field">
              <label>Vertical</label>
              <div className="ui right labeled left icon input">
                <i className="arrows alternate vertical icon"></i>
                <input
                  type="text"
                  name="verticalKeySpacing"
                  value={verticalKeySpacing}
                />
                <div className="ui basic label">mm</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlateConfiguration;

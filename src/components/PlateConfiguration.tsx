import React from "react";
import { SwitchCutoutType } from "../maker_models/KeyCutouts";
import { StabilizerCutoutType } from "../maker_models/StabilizerCutout";

export interface PlateConfigurationProps {}

export interface PlateConfigurationState {
  rawKLEData?: string;
  switchCutoutType?: SwitchCutoutType;
  switchCutoutRadius?: number;
  stabilizerCutoutType?: string;
  stabilizerCutoutRadius?: number;
  horizontalKeySpacing?: number;
  verticalKeySpacing?: number;
}

class PlateConfiguration
  extends React.Component<PlateConfigurationProps, PlateConfigurationState> {
  constructor(props: PlateConfigurationProps) {
    super(props);
    this.state = {
      rawKLEData: "",
      switchCutoutType: SwitchCutoutType.MX,
      switchCutoutRadius: 0.5,
      stabilizerCutoutType: StabilizerCutoutType.Large,
      stabilizerCutoutRadius: 0.5,
      horizontalKeySpacing: 19.05,
      verticalKeySpacing: 19.05,
    };
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui form">
          <h3 className="ui header">KLE Raw Data</h3>
          <div className="field">
            <textarea>{this.state.rawKLEData}</textarea>
          </div>

          <h3 className="ui dividing header">Switch Cutouts</h3>
          <div className="fields">
            <div className="three wide field">
              <label>Cutout Type</label>
              <select
                name="switchCutoutType"
                value={this.state.switchCutoutType}
              >
                <option className="item" data-value="MX">MX</option>
                <option className="item" data-value="Alps">Alps</option>
                <option className="item" data-value="MX_Alps">MX/Alps</option>
                <option className="item" data-value="MX_Opening">
                  MX Opening
                </option>
                <option className="item" data-value="MX_Encoder">
                  MX + Encoder
                </option>
              </select>
            </div>
            <div className="three wide field">
              <label>Cutout Fillet Radius</label>
              <div className="ui right labeled input">
                <input
                  type="text"
                  name="switchCutoutRadius"
                  value={this.state.switchCutoutRadius}
                />
                <div className="ui basic label">mm</div>
              </div>
            </div>
          </div>

          <h3 className="ui dividing header">Stabilizer Cutouts</h3>
          <div className="fields">
            <div className="three wide field">
              <label>Cutout Type</label>
              <select
                name="stabilizerCutoutType"
                value={this.state.stabilizerCutoutType}
              >
                <i className="dropdown icon"></i>
                <option className="item" data-value="Normal">Normal</option>
                <option className="item" data-value="Large">Large</option>
                <option className="item" data-value="Choc">Choc</option>
                <option className="item" data-value="3mm Plate">
                  3mm Plate
                </option>
                <option className="item" data-value="5mm Plate">
                  5mm Plate
                </option>
              </select>
            </div>
            <div className="three wide field">
              <label>Cutout Fillet Radius</label>
              <div className="ui right labeled input">
                <input
                  type="text"
                  name="stabilizerCutoutRadius"
                  value={this.state.stabilizerCutoutRadius}
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
                  value={this.state.horizontalKeySpacing}
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
                  value={this.state.verticalKeySpacing}
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

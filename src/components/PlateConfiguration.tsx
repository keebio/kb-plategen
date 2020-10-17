import React from "react";
import PlateParameters from "../PlateParameters";

export type PlateConfigurationProps = PlateParameters;

export interface OnChangeProps {
  onConfigChange: (config: PlateConfigurationProps) => void;
}
export type PlateConfigurationInputProps =
  & PlateConfigurationProps
  & OnChangeProps;

class PlateConfiguration extends React.Component<PlateConfigurationInputProps> {
  constructor(props: PlateConfigurationInputProps) {
    super(props);
    this.handleKLEChange = this.handleKLEChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleKLEChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.props.onConfigChange({ ...this.props, kleData: event.target.value });
  }

  handleChange(event: React.ChangeEvent<any>) {
    const value = event.target.type === "checkbox"
      ? event.target.checked
      : event.target.value;
    console.log(`target: ${event.target.name}, value: ${value}`);
    this.props.onConfigChange(
      { ...this.props, [event.target.name]: value },
    );
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui form">
          <h3 className="ui header">
            <i className="keyboard icon" />KLE Raw Data
          </h3>
          <div className="field">
            <textarea
              value={this.props.kleData}
              onChange={this.handleKLEChange}
            />
          </div>

          <h3 className="ui dividing header">
            <i className="cut icon" />Switch Cutouts
          </h3>
          <div className="fields">
            <div className="three wide field">
              <label>Cutout Type</label>
              <select
                name="switchCutoutType"
                value={this.props.switchCutoutType}
                onChange={this.handleChange}
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
                  type="number"
                  step="0.1"
                  name="switchCutoutRadius"
                  value={this.props.switchCutoutRadius}
                  onChange={this.handleChange}
                />
                <div className="ui basic label">mm</div>
              </div>
            </div>
          </div>

          <h3 className="ui dividing header">
            <i className="cut icon" />Stabilizer Cutouts
          </h3>
          <div className="fields">
            <div className="three wide field">
              <label>Cutout Type</label>
              <select
                name="stabilizerCutoutType"
                value={this.props.stabilizerCutoutType}
                onChange={this.handleChange}
              >
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
                  type="number"
                  step="0.1"
                  name="stabilizerCutoutRadius"
                  value={this.props.stabilizerCutoutRadius}
                  onChange={this.handleChange}
                />
                <div className="ui basic label">mm</div>
              </div>
            </div>
          </div>

          <h3 className="ui dividing header">
            <i className="space shuttle icon" />Keyspacing
          </h3>
          <div className="fields">
            <div className="three wide field">
              <label>Horizontal</label>
              <div className="ui right labeled left icon input">
                <i className="arrows alternate horizontal icon" />
                <input
                  type="number"
                  step="0.05"
                  name="horizontalKeySpacing"
                  value={this.props.horizontalKeySpacing}
                  onChange={this.handleChange}
                />
                <div className="ui basic label">mm</div>
              </div>
            </div>
            <div className="three wide field">
              <label>Vertical</label>
              <div className="ui right labeled left icon input">
                <i className="arrows alternate vertical icon" />
                <input
                  type="number"
                  step="0.05"
                  name="verticalKeySpacing"
                  value={this.props.verticalKeySpacing}
                  onChange={this.handleChange}
                />
                <div className="ui basic label">mm</div>
              </div>
            </div>
          </div>

          <h3 className="ui dividing header">
            <i className="settings icon" />Miscellaneous Options
          </h3>
          <div className="field">
            <div className="ui checkbox">
              <input
                type="checkbox"
                name="combineOverlaps"
                checked={this.props.combineOverlaps}
                onChange={this.handleChange}
              />
              <label>
                Combine Overlapping Layouts (Note: This makes rendering slow)
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlateConfiguration;

import React from 'react';
import PlateParameters from '../PlateParameters';
import { SwitchCutoutType } from '../maker_models/KeyCutouts';
import { StabilizerCutoutType } from '../maker_models/StabilizerCutout';
import KLEInputBox from './KLEInputBox'; // Import the new KLEInputBox component

export type PlateConfigurationProps = PlateParameters;

export interface OnChangeProps {
  onConfigChange: (config: PlateConfigurationProps) => void;
}
export type PlateConfigurationInputProps = PlateConfigurationProps & OnChangeProps;

const PlateConfiguration = (props: PlateConfigurationInputProps) => {
  const {
    combineOverlaps,
    kleData,
    horizontalKeySpacing,
    onConfigChange,
    stabilizerCutoutRadius,
    stabilizerCutoutType,
    acousticCutoutRadius,
    acousticCutoutType,
    switchCutoutRadius,
    switchCutoutType,
    switchCutoutWidth,
    switchCutoutHeight,
    verticalKeySpacing,
    kerf,
  } = props;
  const handleKLEChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onConfigChange({ ...props, kleData: event.target.value });
  };

  const handleChange = ({ target: { checked, name, type, value } }: React.ChangeEvent<any>) => {
    let derivedValue: any = type === 'checkbox' ? checked : value;
    if (type === 'number') {
      // Convert empty string to undefined, otherwise parse as float
      // Make sure to handle '0' as a valid number
      derivedValue = value === '' ? undefined : 
                   (value === '0' ? 0 : parseFloat(value));
    }
    onConfigChange({ ...props, [name]: derivedValue });
  };

  return (
    <div className="ui container">
      <div className="ui form">
        <KLEInputBox kleData={kleData} onKLEChange={handleKLEChange} />
        <h3 className="ui dividing header">
          <i className="cut icon" />
          Switch Cutouts
        </h3>
        <div className="fields">
          <div className="three wide field">
            <label>Cutout Type</label>
            <select name="switchCutoutType" value={switchCutoutType} onChange={handleChange}>
              <option className="item" data-value="MX">
                MX
              </option>
              <option className="item" data-value="Alps">
                Alps
              </option>
              <option className="item" data-value="MX_Alps">
                MX/Alps
              </option>
              <option className="item" data-value="MX_Opening">
                MX Opening
              </option>
              <option className="item" data-value="MX_Encoder">
                MX + Encoder
              </option>
              <option className="item" data-value="Support_Plate">
                Support Plate
              </option>
              <option className="item" data-value="Keycap_Outline">
                Keycap Outline
              </option>
              <option className="item" data-value="Custom_Rectangle">
                Custom Rectangle
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
                value={switchCutoutRadius}
                onChange={handleChange}
              />
              <div className="ui basic label">mm</div>
            </div>
          </div>
          {switchCutoutType === SwitchCutoutType.Custom_Rectangle && (
            <>
              <div className="three wide field">
                <label>Width</label>
                <div className="ui right labeled left icon input">
                  <i className="arrows alternate horizontal icon" />
                  <input
                    type="number"
                    step="0.1"
                    name="switchCutoutWidth"
                    value={switchCutoutWidth ?? 14.0}
                    onChange={handleChange}
                  />
                  <div className="ui basic label">mm</div>
                </div>
              </div>
              <div className="three wide field">
                <label>Height</label>
                <div className="ui right labeled left icon input">
                  <i className="arrows alternate vertical icon" />
                  <input
                    type="number"
                    step="0.1"
                    name="switchCutoutHeight"
                    value={switchCutoutHeight ?? 14.0}
                    onChange={handleChange}
                  />
                  <div className="ui basic label">mm</div>
                </div>
              </div>
            </>
          )}
        </div>
        <h3 className="ui dividing header">
          <i className="cut icon" />
          Stabilizer Cutouts
        </h3>
        <div className="fields">
          <div className="three wide field">
            <label>Cutout Type</label>
            <select
              name="stabilizerCutoutType"
              value={stabilizerCutoutType}
              onChange={handleChange}
            >
              <option className="item" data-value="Normal">
                Normal
              </option>
              <option className="item" data-value="Large">
                Large
              </option>
              <option className="item" data-value="Choc">
                Choc
              </option>
              <option className="item" data-value="3mm Plate">
                3mm Plate
              </option>
              <option className="item" data-value="3mm Plate for Screw-ins">
                3mm Plate for Screw-ins
              </option>
              <option className="item" data-value="5mm Plate">
                5mm Plate
              </option>
              <option className="item" data-value="Gateron LP">
                Gateron LP
              </option>
              <option className="item" data-value="Custom Rectangles">
                Custom Rectangles
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
                value={stabilizerCutoutRadius}
                onChange={handleChange}
              />
              <div className="ui basic label">mm</div>
            </div>
          </div>
          {stabilizerCutoutType === StabilizerCutoutType.CustomRectangles && (
            <>
              <div className="three wide field">
                <label>Width</label>
                <div className="ui right labeled left icon input">
                  <i className="arrows alternate horizontal icon" />
                  <input
                    type="number"
                    step="0.1"
                    name="stabilizerCutoutWidth"
                    value={props.stabilizerCutoutWidth ?? 7.0}
                    onChange={handleChange}
                  />
                  <div className="ui basic label">mm</div>
                </div>
              </div>
              <div className="three wide field">
                <label>Height</label>
                <div className="ui right labeled left icon input">
                  <i className="arrows alternate vertical icon" />
                  <input
                    type="number"
                    step="0.1"
                    name="stabilizerCutoutHeight"
                    value={props.stabilizerCutoutHeight ?? 15.0}
                    onChange={handleChange}
                  />
                  <div className="ui basic label">mm</div>
                </div>
              </div>
              <div className="three wide field">
                <label>Vertical Offset</label>
                <div className="ui right labeled left icon input">
                  <i className="arrows alternate vertical icon" />
                  <input
                    type="number"
                    step="0.1"
                    name="stabilizerCutoutVerticalOffset"
                    value={props.stabilizerCutoutVerticalOffset ?? -0.5}
                    onChange={handleChange}
                  />
                  <div className="ui basic label">mm</div>
                </div>
              </div>
            </>
          )}
        </div>
        <h3 className="ui dividing header">
          <i className="cut icon" />
          Acoustic Cutouts
        </h3>
        <div className="fields">
          <div className="three wide field">
            <label>Cutout Type</label>
            <select name="acousticCutoutType" value={acousticCutoutType} onChange={handleChange}>
              <option className="item" data-value="None">
                None
              </option>
              <option className="item" data-value="Typical">
                Typical
              </option>
              <option className="item" data-value="Extreme">
                Extreme
              </option>
            </select>
          </div>
          <div className="three wide field">
            <label>Cutout Fillet Radius</label>
            <div className="ui right labeled input">
              <input
                type="number"
                step="0.1"
                name="acousticCutoutRadius"
                value={acousticCutoutRadius}
                onChange={handleChange}
              />
              <div className="ui basic label">mm</div>
            </div>
          </div>
        </div>
        <h3 className="ui dividing header">
          <i className="space shuttle icon" />
          Keyspacing
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
                value={horizontalKeySpacing}
                onChange={handleChange}
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
                value={verticalKeySpacing}
                onChange={handleChange}
              />
              <div className="ui basic label">mm</div>
            </div>
          </div>
        </div>
        <h3 className="ui dividing header">
          <i className="settings icon" />
          Miscellaneous Options
        </h3>
        <div className="three wide field">
          <label>Kerf</label>
          <div className="ui right labeled left icon input">
            <i className="pencil alternate icon" />
            <input
              type="number"
              step="0.01"
              name="kerf"
              value={kerf}
              onChange={handleChange}
            />
            <div className="ui basic label">mm</div>
          </div>
        </div>
        <div className="field">
          <div className="ui checkbox">
            <input
              type="checkbox"
              name="combineOverlaps"
              checked={combineOverlaps}
              onChange={handleChange}
            />
            <label>
              Combine Overlapping Layouts (Note: This makes rendering slow, so use this when you're
              done tinkering with other settings to generate your final plate design)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlateConfiguration;

import React, { useEffect } from 'react';
import PlateParameters from '../PlateParameters';
import { SwitchCutoutType } from '../maker_models/KeyCutouts';
import { StabilizerCutoutType } from '../maker_models/StabilizerCutout';
import { AcousticCutoutType } from '../maker_models/AcousticCutout';
import KLEInputBox from './KLEInputBox';

export type PlateConfigurationProps = PlateParameters;

export interface OnChangeProps {
  onConfigChange: (config: PlateConfigurationProps) => void;
}
export interface OnResetProps {
  onResetToDefaults?: () => void;
}
export type PlateConfigurationInputProps = PlateConfigurationProps & OnChangeProps & OnResetProps;

const PlateConfiguration: React.FC<PlateConfigurationInputProps> = (props) => {
  const {
    kleData,
    switchCutoutType,
    switchCutoutRadius,
    switchCutoutWidth,
    switchCutoutHeight,
    stabilizerCutoutType,
    stabilizerCutoutRadius,
    stabilizerCutoutWidth,
    stabilizerCutoutHeight,
    stabilizerCutoutVerticalOffset,
    acousticCutoutType,
    acousticCutoutRadius,
    horizontalKeySpacing,
    verticalKeySpacing,
    kerf,
    combineOverlaps,
    onConfigChange,
    onResetToDefaults,
  } = props;

  // Initialize Semantic UI tooltips
  useEffect(() => {
    // Initialize tooltips after component mounts
    const timer = setTimeout(() => {
      const icons = document.querySelectorAll('.info-tooltip');
      icons.forEach((icon) => {
        // @ts-ignore - Semantic UI jQuery plugin
        if (window.$ && window.$.fn.popup) {
          // @ts-ignore - Semantic UI jQuery plugin
          window.$(icon).popup();
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    onConfigChange({ ...props, [name]: newValue });
  };

  const handleKLEChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onConfigChange({ ...props, kleData: event.target.value });
  };

  // Helper function to create section headers with info tooltips
  const createSectionHeader = (icon: string, title: string, tooltip: string) => (
    <h3 className="ui dividing header" style={{ display: 'flex', alignItems: 'center' }}>
      <i className={`${icon} icon`} />
      <span style={{ marginRight: '10px', marginLeft: '8px' }}>{title}</span>
      <span
        className="info-tooltip"
        data-tooltip={tooltip}
        style={{
          display: 'inline-block',
          fontSize: '0.7em',
          color: '#999',
          cursor: 'pointer',
          border: '1px solid #999',
          borderRadius: '50%',
          width: '16px',
          height: '16px',
          textAlign: 'center',
          lineHeight: '16px'
        }}
      >
        ?
      </span>
    </h3>
  );

  return (
    <div className="ui container">
      <div className="ui form">
        <KLEInputBox kleData={kleData} onKLEChange={handleKLEChange} />
        {onResetToDefaults && (
          <div style={{ marginTop: '1em' }}>
            <button className="ui button" onClick={onResetToDefaults}>
              Reset Configuration to Defaults
            </button>
          </div>
        )}
        {createSectionHeader(
          'cut',
          'Switch Cutouts',
          'Choose the type of switch cutout for your keyboard:\n• MX - Most common standard\n• MX/Alps - Supports both switch types\n• Support plates - Additional stability'
        )}
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
              <option className="item" data-value="Choc_V2">
                Choc V2
              </option>
              <option className="item" data-value="Choc_V2_Support_Plate">
                Choc V2 Support Plate
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
        {createSectionHeader(
          'cut',
          'Stabilizer Cutouts',
          'Stabilizers prevent larger keys from wobbling:\n• Large - Common for spacebars\n• Choc - For low-profile keyboards\n• Choose based on your stabilizer type'
        )}
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
              <option className="item" data-value="Choc V1">
                Choc V1
              </option>
              <option className="item" data-value="Choc V2">
                Choc V2
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
              <option className="item" data-value="Single Rectangle">
                Single Rectangle
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
          {(stabilizerCutoutType === StabilizerCutoutType.CustomRectangles || stabilizerCutoutType === StabilizerCutoutType.SingleRectangle) && (
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
        {createSectionHeader(
          'cut',
          'Acoustic Cutouts',
          'Acoustic cutouts improve keyboard sound:\n• Typical - Small holes for basic improvement\n• Extreme - Larger openings for more modification\n• Allows air to flow through the plate'
        )}
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
        {createSectionHeader(
          'space shuttle',
          'Keyspacing',
          'Distance between key centers:\n• Standard: 19.05mm (3/4 inch)\n• Adjust for non-standard layouts\n• Use for ergonomic designs'
        )}
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
        {createSectionHeader(
          'settings',
          'Miscellaneous Options',
          'Advanced options for plate generation:\n• Kerf - Compensates for laser cutter width\n• Combine Overlaps - Merges overlapping shapes\n• Both improve final file quality'
        )}
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
    </div >
  );
};

export default PlateConfiguration;

import React from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import SwitchPlate from "./maker_models/SwitchPlate";
import PlateViewer, { PlateProps } from "./components/PlateViewer";
import { SwitchCutoutType } from "./maker_models/KeyCutouts";
import { StabilizerCutoutType } from "./maker_models/StabilizerCutout";
import PlateConfiguration, {
  PlateConfigurationProps,
} from "./components/PlateConfiguration";
import PlateParameters from "./PlateParameters";

type AppState = PlateConfigurationProps & PlateProps;

const defaultState: PlateConfigurationProps = {
  kleData: require("./sample/quefrency-rev2.json"),
  switchCutoutType: SwitchCutoutType.MX,
  switchCutoutRadius: 0.5,
  stabilizerCutoutType: StabilizerCutoutType.Large,
  stabilizerCutoutRadius: 0.5,
  horizontalKeySpacing: 19.05,
  verticalKeySpacing: 19.05,
};

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.handleConfigurationChange = this.handleConfigurationChange.bind(this);
    const switchPlate = new SwitchPlate(defaultState.kleData, defaultState);
    this.state = { ...defaultState, switchPlate: switchPlate };
  }

  makeSwitchPlate = AwesomeDebouncePromise(
    (kleData: string | object | undefined, params: PlateParameters) => {
      return new SwitchPlate(this.state.kleData, this.state);
    },
    500,
  );

  async handleConfigurationChange(config: PlateConfigurationProps) {
    this.setState(config, () => console.log(this.state));
    const switchPlate = await this.makeSwitchPlate(config.kleData, config);
    this.setState({ switchPlate: switchPlate });
  }

  render() {
    return (
      <div>
        <PlateViewer switchPlate={this.state.switchPlate} />
        <div>
          <PlateConfiguration
            {...this.state}
            onConfigChange={this.handleConfigurationChange}
          />
          <p />
          <div className="ui container">
            This is currently a work in progress, and here's the list of initial
            basic functionalities that need to be added in:
            <h4>TODO List:</h4>
            <ul>
              <li>
                SVG/DXF export options (like precision, line color, line width)
              </li>
              <li>KLE data import</li>
              <li>Various switch and stabilizer cutouts</li>
              <li>Cutout configuration</li>
              <li>Save configuration</li>
            </ul>
            <p>
              <a href="https://trello.com/b/Kfx0hbyo/plate-generator">
                Project status board
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

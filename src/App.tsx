import React from "react";
import makerjs from "makerjs";
import SwitchPlate from "./maker_models/SwitchPlate";
import PlateViewer from "./components/PlateViewer";
import { SwitchCutoutType } from "./maker_models/KeyCutouts";
import { StabilizerCutoutType } from "./maker_models/StabilizerCutout";
import PlateConfiguration, {
  PlateConfigurationProps,
} from "./components/PlateConfiguration";

type AppState = PlateConfigurationProps;

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
  private switchPlate: makerjs.IModel = new SwitchPlate(
    defaultState.kleData,
    defaultState,
  );
  constructor(props: {}) {
    super(props);
    this.handleConfigurationChange = this.handleConfigurationChange.bind(this);
    this.state = defaultState;
  }

  componentDidMount() {
    this.switchPlate = new SwitchPlate(this.state.kleData, this.state);
  }

  handleConfigurationChange(config: PlateConfigurationProps) {
    this.setState(config, () => {
      this.switchPlate = new SwitchPlate(this.state.kleData, this.state);
      console.log(this.state);
    });
  }

  render() {
    const stateWithHandler = {
      ...this.state,
      onConfigChange: this.handleConfigurationChange,
    };
    return (
      <div>
        <PlateViewer switchPlate={this.switchPlate} />
        <div>
          {/* TODO: Add onConfigurationChange prop/callback */}
          <PlateConfiguration {...stateWithHandler} />
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

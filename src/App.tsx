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
  combineOverlaps: false,
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
          &nbsp;
          <p />

          <div className="ui container">
            <h3 className="ui dividing header">
              <i className="info circle icon" />General Information
            </h3>
            <h4>About</h4>
            This is a keyboard switch plate generator that takes in output
            from&nbsp;
            <a href="http://www.keyboard-layout-editor.com/">
              Keyboard Layout Editor
            </a>&nbsp;and generates a switch plate based on the parameters you
            specify.

            <h4>Development & Contributing</h4>
            This is currently a work in progress, and here’s the list of initial
            basic functionalities that need to be added in:
            <p />
            Partial Todo List:
            <ul>
              <li>
                SVG/DXF export options (like precision, line color, line width)
              </li>
              <li>KLE data import from file</li>
              <li>Save configuration</li>
              <li>Layout presets</li>
              <li>Dark mode</li>
              <li>And more...(See Trello board)</li>
            </ul>

            If you’d like to contribute code to this project, the GitHub
            repository will be opened to the public shortly after some code
            cleanup.
            <p />
            <a href="https://github.com/keebio/kb-plategen">
              <button className="ui github button">
                <i className="github icon" />GitHub
              </button>
            </a>
            <p />

            If you’d like to support this project monetarily, you can become a
            sponsor! Any amount is appreciated.
            <p />
            <a href="https://github.com/sponsors/nooges">
              <button className="ui purple button">
                <i className="heart icon" />Sponsor project
              </button>
            </a>

            <h4>Project Status & Future Features</h4>
            <ul>
              <li>
                <a href="https://trello.com/b/Kfx0hbyo/plate-generator">
                  Project status board
                </a>
              </li>
              <li>GitHub Issue Tracker</li>
            </ul>

            <p />
            &nbsp;
          </div>
        </div>
      </div>
    );
  }
}

export default App;

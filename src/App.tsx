import React, { useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import SwitchPlate from "./maker_models/SwitchPlate";
import PlateViewer, { PlateProps } from "./components/PlateViewer";
import { SwitchCutoutType } from "./maker_models/KeyCutouts";
import { StabilizerCutoutType } from "./maker_models/StabilizerCutout";
import PlateConfiguration, {
  PlateConfigurationProps,
} from "./components/PlateConfiguration";
import PlateParameters from "./PlateParameters";
import AppInfo from "./components/AppInfo";

type AppState = PlateConfigurationProps & PlateProps;

const defaultState: PlateConfigurationProps = {
  kleData: require("./sample/quefrency-rev2.json"),
  //kleData: '[""]',
  switchCutoutType: SwitchCutoutType.MX,
  switchCutoutRadius: 0.5,
  stabilizerCutoutType: StabilizerCutoutType.Large,
  stabilizerCutoutRadius: 0.5,
  horizontalKeySpacing: 19.05,
  verticalKeySpacing: 19.05,
  combineOverlaps: false,
};

function App() {
  const [state, setState] = useState(defaultState);
  const [switchPlate, setSwitchPlate] = useState(
    new SwitchPlate(defaultState.kleData, defaultState),
  );

  const makeSwitchPlate = AwesomeDebouncePromise(
    (kleData: string | object | undefined, params: PlateParameters) => {
      return new SwitchPlate(params.kleData, params);
    },
    500,
  );

  const handleConfigurationChange = async (config: PlateConfigurationProps) => {
    setState(config);
    const newSwitchPlate = await makeSwitchPlate(config.kleData, config);
    setSwitchPlate(newSwitchPlate);
  };

  return (
    <div>
      <PlateViewer switchPlate={switchPlate} />
      <div>
        <PlateConfiguration
          {...state}
          onConfigChange={handleConfigurationChange}
        />
        &nbsp;
        <p />
        <AppInfo />
      </div>
    </div>
  );
}

export default App;

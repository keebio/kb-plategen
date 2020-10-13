import React, { useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import SwitchPlate from "./maker_models/SwitchPlate";
import PlateViewer from "./components/PlateViewer";
import { SwitchCutoutType } from "./maker_models/KeyCutouts";
import { StabilizerCutoutType } from "./maker_models/StabilizerCutout";
import PlateConfiguration, {
  PlateConfigurationProps,
} from "./components/PlateConfiguration";
import PlateParameters from "./PlateParameters";
import AppInfo from "./components/AppInfo";
import useConstant from "use-constant";

var kleData = JSON.stringify(require("./sample/quefrency-rev2.json"));
kleData = kleData.substring(1, kleData.length - 1);

const defaultConfig: PlateConfigurationProps = {
  kleData: kleData,
  switchCutoutType: SwitchCutoutType.MX,
  switchCutoutRadius: 0.5,
  stabilizerCutoutType: StabilizerCutoutType.Large,
  stabilizerCutoutRadius: 0.5,
  horizontalKeySpacing: 19.05,
  verticalKeySpacing: 19.05,
  combineOverlaps: false,
};
const initialSwitchPlate = new SwitchPlate(defaultConfig);

function App() {
  const [state, setState] = useState({
    config: defaultConfig,
    switchPlate: initialSwitchPlate,
  });

  const debouncedMakeSwitchPlate = useConstant(() => AwesomeDebouncePromise((params: PlateParameters) => {
    return new SwitchPlate(params);
  }, 500));

  const handleConfigurationChange = async (config: PlateConfigurationProps) => {
    setState({ config: config, switchPlate: state.switchPlate });
    const newSwitchPlate = await debouncedMakeSwitchPlate(config);
    setState({ config: config, switchPlate: newSwitchPlate });
  };

  return (
    <div>
      <PlateViewer switchPlate={state.switchPlate} />
      <div>
        <PlateConfiguration
          {...state.config}
          onConfigChange={(config) => handleConfigurationChange(config)}
        />
        &nbsp;
        <p />
        <AppInfo />
      </div>
    </div>
  );
}

export default App;

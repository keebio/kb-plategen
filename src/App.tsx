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

const defaultConfig: PlateConfigurationProps = {
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
  const [plateConfig, setPlateConfig] = useState(defaultConfig);
  const [switchPlate, setSwitchPlate] = useState(
    new SwitchPlate(defaultConfig),
  );

  const makeSwitchPlate = AwesomeDebouncePromise((params: PlateParameters) => {
    return new SwitchPlate(params);
  }, 500);

  const handleConfigurationChange = async (config: PlateConfigurationProps) => {
    setPlateConfig(config);
    const newSwitchPlate = await makeSwitchPlate(config);
    setSwitchPlate(newSwitchPlate);
  };

  return (
    <div>
      <PlateViewer switchPlate={switchPlate} />
      <div>
        <PlateConfiguration
          {...plateConfig}
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

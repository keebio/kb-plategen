import React, { useState } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import SwitchPlate from './maker_models/SwitchPlate';
import PlateViewer from './components/PlateViewer';
import { SwitchCutoutType } from './maker_models/KeyCutouts';
import { StabilizerCutoutType } from './maker_models/StabilizerCutout';
import { AcousticCutoutType } from './maker_models/AcousticCutout';
import PlateConfiguration, { PlateConfigurationProps } from './components/PlateConfiguration';
import PlateParameters from './PlateParameters';
import AppInfo from './components/AppInfo';
import useConstant from 'use-constant';

let kleData = JSON.stringify(require('./sample/quefrency-rev2.json'));
kleData = kleData.substring(1, kleData.length - 1);

const defaultConfig: PlateConfigurationProps = {
  kleData,
  switchCutoutType: SwitchCutoutType.MX,
  switchCutoutRadius: 0.5,
  stabilizerCutoutType: StabilizerCutoutType.Large,
  stabilizerCutoutRadius: 0.5,
  acousticCutoutType: AcousticCutoutType.None,
  acousticCutoutRadius: 0.5,
  horizontalKeySpacing: 19.05,
  verticalKeySpacing: 19.05,
  kerf: 0.0,
  combineOverlaps: false,
};
const initialSwitchPlate = new SwitchPlate(defaultConfig);

function App() {
  const [config, setConfig] = useState(defaultConfig);
  const [switchPlate, setSwitchPlate] = useState(initialSwitchPlate);

  const debouncedMakeSwitchPlate = useConstant(() =>
    AwesomeDebouncePromise((params: PlateParameters) => new SwitchPlate(params), 500)
  );

  const handleConfigurationChange = async (newConfig: PlateConfigurationProps) => {
    setConfig(newConfig);
    setSwitchPlate(switchPlate);
    const newSwitchPlate = await debouncedMakeSwitchPlate(newConfig);
    setConfig(newConfig);
    setSwitchPlate(newSwitchPlate);
  };

  return (
    <>
      <PlateViewer switchPlate={switchPlate} />
      <div>
        <PlateConfiguration {...config} onConfigChange={handleConfigurationChange} />
        &nbsp;
        <p />
        <AppInfo />
      </div>
    </>
  );
}

export default App;

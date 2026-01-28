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
import { useTheme } from './contexts/ThemeContext';

let kleData = JSON.stringify(require('./sample/quefrency-rev2.json'));
kleData = kleData.substring(1, kleData.length - 1);

const defaultConfig: PlateConfigurationProps = {
  kleData,
  switchCutoutType: SwitchCutoutType.MX,
  switchCutoutRadius: 0.0,
  switchCutoutWidth: 14.0,
  switchCutoutHeight: 14.0,
  stabilizerCutoutType: StabilizerCutoutType.Large,
  stabilizerCutoutWidth: 7.0,
  stabilizerCutoutHeight: 15.0,
  stabilizerCutoutVerticalOffset: -0.5,
  stabilizerCutoutRadius: 0.0,
  acousticCutoutType: AcousticCutoutType.None,
  acousticCutoutRadius: 0.0,
  horizontalKeySpacing: 19.05,
  verticalKeySpacing: 19.05,
  kerf: 0.0,
  combineOverlaps: false,
};

const CONFIG_STORAGE_KEY = 'kb-plategen.config';

const loadStoredConfig = (): PlateConfigurationProps => {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!raw) return defaultConfig;
    const parsed = JSON.parse(raw) as Partial<PlateConfigurationProps>;
    return { ...defaultConfig, ...parsed };
  } catch {
    return defaultConfig;
  }
};

function App() {
  const { theme, toggleTheme } = useTheme();
  const initialConfig = useConstant(() => loadStoredConfig());
  const [config, setConfig] = useState(initialConfig);
  const [switchPlate, setSwitchPlate] = useState(() => new SwitchPlate(initialConfig));

  const debouncedMakeSwitchPlate = useConstant(() =>
    AwesomeDebouncePromise((params: PlateParameters) => new SwitchPlate(params), 500)
  );

  const handleConfigurationChange = async (newConfig: PlateConfigurationProps) => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
    } catch {
      // ignore
    }
    setConfig(newConfig);
    const newSwitchPlate = await debouncedMakeSwitchPlate(newConfig);
    setSwitchPlate(newSwitchPlate);
  };

  const handleResetToDefaults = () => {
    try {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
    } catch {
      // ignore
    }
    setConfig(defaultConfig);
    setSwitchPlate(new SwitchPlate(defaultConfig));
  };

  return (
    <>
      <div className="theme-toggle-container" onClick={toggleTheme}>
        <span className="theme-toggle-label">Light</span>
        <div className={`theme-toggle-switch ${theme === 'dark' ? 'dark' : ''}`}>
          <div className="theme-toggle-circle">
            <span className="theme-toggle-icon">
              {theme === 'light' ? '☀️' : '🌙'}
            </span>
          </div>
        </div>
        <span className="theme-toggle-label">Dark</span>
      </div>
      <PlateViewer switchPlate={switchPlate} />
      <div>
        <PlateConfiguration
          {...config}
          onConfigChange={handleConfigurationChange}
          onResetToDefaults={handleResetToDefaults}
        />
        &nbsp;
        <p />
        <AppInfo />
      </div>
    </>
  );
}

export default App;

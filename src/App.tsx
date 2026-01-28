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

const CONFIG_FIELDS = [
  { key: 'switchCutoutType', param: 'switch', type: 'string' as const },
  { key: 'switchCutoutRadius', param: 'switchRadius', type: 'number' as const },
  { key: 'switchCutoutWidth', param: 'switchWidth', type: 'number' as const },
  { key: 'switchCutoutHeight', param: 'switchHeight', type: 'number' as const },
  { key: 'stabilizerCutoutType', param: 'stab', type: 'string' as const },
  { key: 'stabilizerCutoutRadius', param: 'stabRadius', type: 'number' as const },
  { key: 'stabilizerCutoutWidth', param: 'stabWidth', type: 'number' as const },
  { key: 'stabilizerCutoutHeight', param: 'stabHeight', type: 'number' as const },
  { key: 'stabilizerCutoutVerticalOffset', param: 'stabOffset', type: 'number' as const },
  { key: 'acousticCutoutType', param: 'acoustic', type: 'string' as const },
  { key: 'acousticCutoutRadius', param: 'acousticRadius', type: 'number' as const },
  { key: 'horizontalKeySpacing', param: 'hSpacing', type: 'number' as const },
  { key: 'verticalKeySpacing', param: 'vSpacing', type: 'number' as const },
  { key: 'kerf', param: 'kerf', type: 'number' as const },
  { key: 'combineOverlaps', param: 'combine', type: 'boolean' as const },
];

const loadStoredConfig = (): PlateConfigurationProps => {
  try {
    // Try URL params first, then localStorage
    const params = new URLSearchParams(window.location.search);
    const config: Partial<PlateConfigurationProps> = {};

    // Parse human-readable query params using CONFIG_FIELDS
    CONFIG_FIELDS.forEach(({ key, param, type }) => {
      if (params.has(param)) {
        const value = params.get(param)!;
        if (type === 'boolean') {
          (config as any)[key] = value === 'true';
        } else if (type === 'number') {
          (config as any)[key] = parseFloat(value);
        } else {
          (config as any)[key] = value;
        }
      }
    });

    // If we have URL params, use them
    if (Object.keys(config).length > 0) {
      return { ...defaultConfig, ...config };
    }

    // Otherwise try localStorage
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!raw) return defaultConfig;
    const parsed = JSON.parse(raw) as Partial<PlateConfigurationProps>;
    return { ...defaultConfig, ...parsed };
  } catch {
    return defaultConfig;
  }
};

const configToQueryParams = (config: PlateConfigurationProps): string => {
  const params = new URLSearchParams();

  CONFIG_FIELDS.forEach(({ key, param, type }) => {
    const value = config[key as keyof PlateConfigurationProps];
    const defaultValue = defaultConfig[key as keyof PlateConfigurationProps];

    if (value !== defaultValue && value !== undefined) {
      if (type === 'boolean') {
        params.set(param, value.toString());
      } else if (type === 'number') {
        params.set(param, (value as number).toString());
      } else {
        params.set(param, value as string);
      }
    }
  });

  return params.toString();
};

const updateURL = (config: PlateConfigurationProps) => {
  const url = new URL(window.location.href);
  const queryString = configToQueryParams(config);
  if (queryString) {
    url.search = `?${queryString}`;
  } else {
    url.search = '';
  }
  window.history.replaceState({}, '', url.toString());
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
    updateURL(newConfig);
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
    updateURL(defaultConfig);
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

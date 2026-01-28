import React, { useEffect } from 'react';

// Import all examples at build time
import quefrency from '../sample/quefrency-rev2.json';
import ansi104 from '../sample/ansi104.json';
import ansi60 from '../sample/ansi60.json';
import iso60 from '../sample/iso60.json';
import atreus from '../sample/atreus.json';
import ergodox from '../sample/ergodox.json';
import sinc from '../sample/sinc-rev1.json';
import iris from '../sample/iris.json';

interface KLEInputBoxProps {
  kleData: string;
  onKLEChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const EXAMPLES = [
  { name: 'Quefrency', file: 'quefrency-rev2.json', data: quefrency },
  { name: 'Iris', file: 'iris.json', data: iris },
  { name: 'Sinc', file: 'sinc-rev1.json', data: sinc },
  { name: 'ANSI 104', file: 'ansi104.json', data: ansi104 },
  { name: 'ANSI 60', file: 'ansi60.json', data: ansi60 },
  { name: 'ISO 60', file: 'iso60.json', data: iso60 },
  { name: 'Atreus', file: 'atreus.json', data: atreus },
  { name: 'Ergodox', file: 'ergodox.json', data: ergodox },
];

const KLEInputBox: React.FC<KLEInputBoxProps> = ({ kleData, onKLEChange }) => {
  const loadExample = (jsonData: any) => {
    let kleString = JSON.stringify(jsonData);
    // Remove the enclosing {} like the existing code does in App.tsx
    kleString = kleString.substring(1, kleString.length - 1);
    // Create a synthetic event to trigger the existing onChange handler
    const syntheticEvent = {
      target: { value: kleString }
    } as React.ChangeEvent<HTMLTextAreaElement>;
    onKLEChange(syntheticEvent);
  };

  const handleExampleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFile = e.target.value;
    const example = EXAMPLES.find(ex => ex.file === selectedFile);
    if (example) {
      loadExample(example.data);
    }
  };

  // Load default example on mount
  useEffect(() => {
    loadExample(quefrency);
  }, []);

  return (
    <div className="kle-input-box">
      <h3 className="ui header">
        <i className="keyboard icon" />
        KLE Raw Data
      </h3>
      <div className="field">
        <label>Load Example Layout</label>
        <select className="ui dropdown" style={{ width: '200px' }} onChange={handleExampleChange} defaultValue="quefrency-rev2.json">
          <option value="">Select an example...</option>
          {EXAMPLES.map(example => (
            <option key={example.file} value={example.file}>
              {example.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <textarea value={kleData} onChange={onKLEChange} />
      </div>
      <h4>Specifying Flipped/Reversed Stabilizers</h4>
      To specify flipped stabilizers (like for the bottom row), you can do one of two things. The
      first way is to edit the raw data manually to add <code>{'{"rs":true}'}</code> to the key.
      The other option to do it, which is a bit easier, is to mark it as a Homing key in the KLE
      editor.
    </div>
  );
};

export default KLEInputBox;

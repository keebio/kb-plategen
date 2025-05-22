import React from 'react';

interface KLEInputBoxProps {
  kleData: string;
  onKLEChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const KLEInputBox: React.FC<KLEInputBoxProps> = ({ kleData, onKLEChange }) => {
  return (
    <div className="kle-input-box">
      <h3 className="ui header">
        <i className="keyboard icon" />
        KLE Raw Data
      </h3>
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

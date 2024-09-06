import React from "react";

interface HitButtonProps {
  onHit: () => void;
  disabled: boolean;
}

const HitButton: React.FC<HitButtonProps> = ({ onHit, disabled }) => {
  return (
    <button onClick={onHit} disabled={disabled} className="hit-button">
      Hit!
    </button>
  );
};

export default HitButton;

import React from "react";

interface HitButtonProps {
  onHit: () => void;
  disabled: boolean;
}

const HitButton: React.FC<HitButtonProps> = ({ onHit, disabled }) => {
  return (
    <button
      onClick={onHit}
      disabled={disabled}
      style={{
        background: disabled ? "#ccc" : "#ff9800",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      className="hit-button"
    >
      Hit!
    </button>
  );
};

export default HitButton;

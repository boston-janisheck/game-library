import React from "react";

const ActionButtons = ({ handleHit, handleStand }) => {
  return (
    <div className="action-buttons">
      <button onClick={handleHit}>Hit</button>
      <button onClick={handleStand}>Stand</button>
    </div>
  );
};

export default ActionButtons;

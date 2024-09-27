import React from "react";

const ActionButtons = ({ handleHit, handleStand }) => {
  return (
    <div>
      <button className="blackjack-action-button" onClick={handleHit}>
        HIT
      </button>
      <button className="blackjack-action-button" onClick={handleStand}>
        STAND
      </button>
    </div>
  );
};

export default ActionButtons;

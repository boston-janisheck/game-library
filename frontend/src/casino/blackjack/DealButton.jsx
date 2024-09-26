import React from "react";

const DealButton = ({ handleDeal, isDealing, isDisabled }) => {
  return !isDealing ? (
    <button
      className={`action-button ${!isDisabled ? "pulse-animation" : ""}`}
      onClick={handleDeal}
      disabled={isDisabled}
    >
      DEAL!
    </button>
  ) : null;
};

export default DealButton;

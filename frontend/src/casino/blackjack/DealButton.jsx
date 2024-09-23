import React from "react";

const DealButton = ({ handleDeal, balance, wager, disabled }) => {
  return (
    <button onClick={handleDeal} disabled={disabled || balance < wager}>
      Deal
    </button>
  );
};

export default DealButton;

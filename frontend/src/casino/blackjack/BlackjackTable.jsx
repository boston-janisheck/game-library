import React from "react";
import Hand from "./Hand";

const BlackjackTable = ({
  playerHand,
  dealerHand,
  playerTotal,
  dealerTotal,
  isPlayerTurn,
}) => {
  return (
    <div className="blackjack-table">
      <div className="blackjack-section">
        <div className="blackjack-total">{dealerTotal}</div>
        <Hand cards={dealerHand} hideSecondCard={isPlayerTurn} />
      </div>
      <div className="dealer-label">Dealer draws to 16, stands on 17</div>
      <div className="blackjack-section">
        <div className="blackjack-total">{playerTotal}</div>
        <Hand cards={playerHand} />
      </div>
    </div>
  );
};

export default BlackjackTable;

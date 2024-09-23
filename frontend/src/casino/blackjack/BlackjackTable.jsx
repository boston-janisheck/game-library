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
      <div className="dealer-section">
        <div className="dealer-total">{dealerTotal}</div>
        <Hand cards={dealerHand} hideSecondCard={isPlayerTurn} />
        <div className="dealer-label">Dealer draws to 16, stands on 17</div>
      </div>
      <div className="player-section">
        <div className="player-total">{playerTotal}</div>
        <Hand cards={playerHand} />
      </div>
    </div>
  );
};

export default BlackjackTable;

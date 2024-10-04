import React from "react";
import Card from "../shared/Card";

const DrawPokerHand = ({ cards, onClickCard, heldCards }) => {
  return (
    <div className="hand">
      {cards.map((card, index) =>
        card && card.value ? (
          <div
            key={index}
            className={`card-wrapper ${
              heldCards.includes(index) ? "held" : ""
            }`}
            onClick={() => onClickCard(index)}
          >
            <Card value={card.value} suit={card.suit} />
            {heldCards.includes(index) && (
              <span className="held-label">Held</span>
            )}
          </div>
        ) : (
          <div key={index} className="card error">
            Error: Invalid Card
          </div>
        )
      )}
    </div>
  );
};

export default DrawPokerHand;

import React from "react";
import Card from "../shared/Card";

const DrawPokerHand = ({ cards, onClickCard, heldCards }) => {
  return (
    <div className="draw-poker-hand">
      {cards.map((card, index) =>
        card && card.value ? (
          <div
            key={index}
            className={`card-wrapper ${
              heldCards.includes(index) ? "held" : ""
            }`}
            onClick={() => onClickCard(index)}
          >
            {heldCards.includes(index) && (
              <span className="held-label">HELD</span>
            )}
            <Card value={card.value} suit={card.suit} />
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
